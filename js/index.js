let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-btn');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

closeButton.addEventListener('click', closePopup);

editButton.addEventListener('click', openPopup);

formElement.addEventListener('submit', handleFormSubmit);
