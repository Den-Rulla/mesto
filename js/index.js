import {
  initialCards,
  validationConfigConst
} from './const.js';
import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';

const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const imgPopup = document.querySelector('.popup_type_img-scale');

const imgPopupPicture = imgPopup.querySelector('.popup__image');
const imgPopupCaption = imgPopup.querySelector('.popup__caption');

const popupEditProfileForm = document.querySelector('.popup__form_type_edit');
const popupAddCardForm = document.querySelector('.popup__form_type_add');

const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const cardTitleInput = document.querySelector('.popup__input_type_card-title');
const cardImageInput = document.querySelector('.popup__input_type_card-img-link');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const cardsList = document.querySelector('.cards-list');

const validationEditProfileForm = new FormValidator(validationConfigConst, popupEditProfileForm);
const validationAddCardForm = new FormValidator(validationConfigConst, popupAddCardForm);

function createCard(data) {
  const card = new Card(data, '#card-template', openImgPopup);
  return card.generateCard();
}

initialCards.forEach((item) => {
  cardsList.append(createCard(item));
});

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscBtn);
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscBtn);
}

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validationEditProfileForm.resetValidationErrors();
  openPopup(popupProfile);
}

function openPopupAddCard() {
  // функции сброса формы и очистки ошибок
  // перенесены в функцию отправки формы
  // для блокировки многократного добавления одной карточки
  // при быстром прокликивании
  openPopup(popupAddCard);
}

function openImgPopup(title, link) {
  imgPopupPicture.src = link;
  imgPopupCaption.textContent = title;
  imgPopupPicture.alt = title;
  openPopup(imgPopup);
}

function handleProfileEditFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupProfile);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const card = createCard({
    name: cardTitleInput.value,
    link: cardImageInput.value
  });

  cardsList.prepend(card);

  closePopup(popupAddCard);

  popupAddCardForm.reset();
  validationAddCardForm.resetValidationErrors();
}

validationEditProfileForm.enableValidation();
validationAddCardForm.enableValidation();

profileEditBtn.addEventListener('click', openPopupProfile);
cardAddBtn.addEventListener('click', openPopupAddCard);

popupEditProfileForm.addEventListener('submit', handleProfileEditFormSubmit);
popupAddCardForm.addEventListener('submit', handleAddCardFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});

function closePopupEscBtn(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
