let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-btn');
let saveButton = document.querySelector('.popup__save-btn');
let nameInput = document.querySelector('.popup__name-input');
let jobInput = document.querySelector('.popup__job-input');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
};

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

formElement.addEventListener('submit', handleFormSubmit);

saveButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});
