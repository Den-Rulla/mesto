export const validationConfigConst = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

export const popups = document.querySelectorAll('.popup');

export const popupProfileSelector = document.querySelector('.popup_type_edit');
export const popupAddCardSelector = document.querySelector('.popup_type_add');
export const imgPopup = document.querySelector('.popup_type_img-scale');

export const imgPopupPicture = imgPopup.querySelector('.popup__image');
export const imgPopupCaption = imgPopup.querySelector('.popup__caption');

export const popupEditProfileForm = document.querySelector('.popup__form_type_edit');
export const popupAddCardForm = document.querySelector('.popup__form_type_add');

export const profileEditBtn = document.querySelector('.profile__edit-button');
export const cardAddBtn = document.querySelector('.profile__add-button');

export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const cardTitleInput = document.querySelector('.popup__input_type_card-title');
export const cardImageInput = document.querySelector('.popup__input_type_card-img-link');

export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');

export const cardsListSelector = document.querySelector('.cards-list');
