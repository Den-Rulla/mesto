import {
  initialCards,
  validationConfigConst,
  popupEditProfileForm,
  popupAddCardForm,
  profileEditBtn,
  cardAddBtn,
  nameInput,
  jobInput

} from '../utils/const.js';

import {
  Card
} from '../components/Card.js';

import {
  FormValidator
} from '../components/FormValidator.js';

import {
  PopupWithForm
} from '../components/PopupWithForm.js';

import {
  PopupWithImage
} from '../components/PopupWithImage.js';

import {
  Section
} from '../components/Section.js';

import {
  UserInfo
} from '../components/UserInfo.js';

const validationEditProfileForm = new FormValidator(validationConfigConst, popupEditProfileForm);
const validationAddCardForm = new FormValidator(validationConfigConst, popupAddCardForm);

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle'
})

const handleProfileEditFormSubmit = (formValues) => {
  userInfo.setUserInfo(formValues.name, formValues.job);
}

const popupProfile = new PopupWithForm('.popup_type_edit', handleProfileEditFormSubmit);

function openPopupProfile() {
  validationEditProfileForm.resetValidationErrors();

  const {
    name,
    job
  } = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = job;

  popupProfile.open();
}

popupProfile.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_img-scale');

function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

popupWithImage.setEventListeners();

const cardsList = new Section({
    items: initialCards,
    renderer: createCard,
  },
  '.cards-list'
);

cardsList.renderItems();

function createCard(item) {
  const card = new Card(item, '.card-template', handleCardClick);
  return card.generateCard();
}

const handleAddCardFormSubmit = (item) => {
  cardsList.addItem(createCard(item));
}

const popupAddCard = new PopupWithForm('.popup_type_add', handleAddCardFormSubmit);

popupAddCard.setEventListeners();

function openPopupAddCard() {
  validationAddCardForm.resetValidationErrors();
  popupAddCard.open()
}

validationEditProfileForm.enableValidation();
validationAddCardForm.enableValidation();

profileEditBtn.addEventListener('click', openPopupProfile);
cardAddBtn.addEventListener('click', openPopupAddCard);
