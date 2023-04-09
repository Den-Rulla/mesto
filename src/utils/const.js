export const validationConfigConst = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const popupEditProfileForm = document.querySelector('.popup__form_type_edit');
export const popupAddCardForm = document.querySelector('.popup__form_type_add');
export const popupEditAvatarForm = document.querySelector('.popup__form_type_avatar');

export const profileEditBtn = document.querySelector('.profile__edit-button');
export const cardAddBtn = document.querySelector('.profile__add-button');
export const avatarEditBtn = document.querySelector('.profile__avatar-edit-btn');

export const nameInput = document.querySelector('.popup__input_type_name')
export const jobInput = document.querySelector('.popup__input_type_job')
export const avatarLinkInput = document.querySelector('.popup__input_type_avatar-link')
