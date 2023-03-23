import {
  initialCards,
  validationConfigConst,
  // popups,
  popupProfileSelector,
  popupAddCardSelector,
  imgPopup,
  imgPopupPicture,
  imgPopupCaption,
  popupEditProfileForm,
  popupAddCardForm,
  profileEditBtn,
  cardAddBtn,
  nameInput,
  jobInput,
  cardTitleInput,
  cardImageInput,
  profileName,
  profileJob,
  cardsListSelector
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

function createCard(data) {
  const card = new Card(data, '#card-template', handleCardClick);
  return card.generateCard();
}

const cardsList = new Section({
    items: initialCards,
    renderer: createCard,
  },
  cardsListSelector
);

cardsList.renderItems();

//---------------------------

// function openPopup(popupType) {
//   popupType.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEscBtn);
// }

// function closePopup(popupType) {
//   popupType.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEscBtn);
// }

//---------------------------

// function openPopupProfile() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   validationEditProfileForm.resetValidationErrors();
//   openPopup(popupProfileSelector);
// }

const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileJob
});

const popupProfile = new PopupWithForm(popupProfileSelector, handleProfileEditFormSubmit);

profileEditBtn.addEventListener('click', () => {
  userInfo.getUserInfo();
  validationEditProfileForm.resetValidationErrors();
  popupProfile.setEventListeners();
  popupProfile.open();
});


// function openPopupAddCard() {
//   openPopup(popupAddCardSelector);
// }

function handleCardClick(title, link) {
  imgPopupPicture.src = link;
  imgPopupCaption.textContent = title;
  imgPopupPicture.alt = title;
  openPopup(imgPopup);
}

function handleProfileEditFormSubmit(event) {
  // event.preventDefault();

  // profileName.textContent = nameInput.value;
  // profileJob.textContent = jobInput.value;

  // closePopup(popupProfileSelector);
}

// const handleAddCardFormSubmit = (formData) => {
//   // event.preventDefault();

//   const card = new Card(formData, '#card-template');
//   const cardElement = card.createCard(formData);

//   cardsList.addItem(cardElement);

//   popupAddCard.close();
//   validationAddCardForm.toggleButtonState(); // блокировка многократной отправки формы
//   // popupAddCardForm.reset();

// }

const popupAddCard = new PopupWithForm(popupAddCardSelector, {
  handleAddCardFormSubmit: (data) => {
    const card = new Card(data, '#card-template');
    card = createCard(data);
    card.setItem(card);
  }
});

popupAddCard.setEventListeners();
cardAddBtn.addEventListener('click', () => {
  validationAddCardForm.resetValidationErrors();
  popupAddCard.open()
});

validationEditProfileForm.enableValidation();
validationAddCardForm.enableValidation();






// popupEditProfileForm.addEventListener('submit', handleProfileEditFormSubmit);
// popupAddCardForm.addEventListener('submit', handleAddCardFormSubmit);

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (event) => {
//     if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-btn')) {
//       closePopup(popup);
//     }
//   });
// });

// function closePopupEscBtn(event) {
//   if (event.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   }
// }
