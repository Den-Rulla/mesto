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

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imgPopup = document.querySelector('.popup_type_img-scale');

const imgPopupPicture = imgPopup.querySelector('.popup__image');
const imgPopupCaption = imgPopup.querySelector('.popup__caption');

const editForm = document.querySelector('.popup__form_type_edit');
const addForm = document.querySelector('.popup__form_type_add');

const editFormSubmitBtn = editForm.querySelector('.popup__submit-btn');
const addFormSubmitBtn = addForm.querySelector('.popup__submit-btn');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const cardTitleInput = document.querySelector('.popup__input_type_card-title');
const cardImageInput = document.querySelector('.popup__input_type_card-img-link');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const cardsList = document.querySelector('.cards-list');

const validationEditForm = new FormValidator(validationConfigConst, editForm);
const validationAddForm = new FormValidator(validationConfigConst, addForm);

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

function submitButtonState(submitBtn, isDisabled) {
  if (isDisabled) {
    submitBtn.setAttribute('disabled', 'disabled');
    submitBtn.classList.add('popup__submit-btn_disabled');
  } else {
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.remove('popup__submit-btn_disabled');
  }
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validationEditForm.resetValidationErrors();
  submitButtonState(editFormSubmitBtn, false);
  openPopup(editPopup);
}

function openAddPopup() {
  addForm.reset();
  validationAddForm.resetValidationErrors();
  submitButtonState(addFormSubmitBtn, true);
  openPopup(addPopup);
}

function openImgPopup(title, link) {
  imgPopupPicture.src = link;
  imgPopupCaption.textContent = title;
  imgPopupPicture.alt = title;
  openPopup(imgPopup);
}

function handleEditFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
}

function handleAddFormSubmit(event) {
  event.preventDefault();

  submitButtonState(addFormSubmitBtn, true);

  const card = createCard({
    name: cardTitleInput.value,
    link: cardImageInput.value
  });

  cardsList.prepend(card);

  closePopup(addPopup);
}

validationEditForm.enableValidation();
validationAddForm.enableValidation();

editBtn.addEventListener('click', openEditPopup);
addBtn.addEventListener('click', openAddPopup);

editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

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
