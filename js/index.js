const initialCards = [{
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

const popup = document.querySelectorAll('.popup');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imgPopup = document.querySelector('.popup_type_img-scale');

const closeEditPopupBtn = editPopup.querySelector('.popup__close-btn');
const closeAddPopupBtn = addPopup.querySelector('.popup__close-btn');
const closeImgPopupBtn = imgPopup.querySelector('.popup__close-btn');

const editForm = document.querySelector('.popup__form_type_edit');
const addForm = document.querySelector('.popup__form_type_add');

const editButton = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const likeBtn = document.querySelector('.card__like');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const cardTitleInput = document.querySelector('.popup__input_type_card-title');
const cardImageInput = document.querySelector('.popup__input_type_card-img-link');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardsList = document.querySelector('.cards-list');

function createCard(item) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.card__title').textContent = item.name;
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__image').alt = item.name;

  card.querySelector('.card__delete-btn').addEventListener('click', removeCard);
  card.querySelector('.card__like').addEventListener('click', cardLikeToggler);
  card.querySelector('.card__image').addEventListener('click', openImgPopup);

  return card;
}

function removeCard(event) {
  event.target.closest('.card').remove();
}

function cardLikeToggler(event) {
  event.target.closest('.card__like').classList.toggle('card__like_active');
}

function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  });
  cardsList.append(...cards);
}

renderCards(initialCards);

function popupOpen(popupType) {
  popupType.classList.add('popup_opened');
}

function popupClose(popupType) {
  popupType.classList.remove('popup_opened');
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpen(editPopup);
}

function openAddPopup() {
  cardTitleInput.value = '';
  cardImageInput.value = '';
  popupOpen(addPopup);
}

function openImgPopup(event) {
  imgPopup.querySelector('.popup__image').src = event.target.closest('.card__image').src;
  imgPopup.querySelector('.popup__image').alt = event.target.closest('.card').querySelector('.card__title-cover').querySelector('.card__title').textContent;
  imgPopup.querySelector('.popup__caption').textContent = event.target.closest('.card').querySelector('.card__title-cover').querySelector('.card__title').textContent;
  popupOpen(imgPopup);
}

function handleEditFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupClose(editPopup);
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const cardTitle = cardTitleInput.value;
  const cardImage = cardImageInput.value;

  const card = createCard({
    name: cardTitle,
    link: cardImage
  });

  cardsList.prepend(card);

  popupClose(addPopup);
}

editButton.addEventListener('click', openEditPopup);
addBtn.addEventListener('click', openAddPopup);

editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

closeEditPopupBtn.addEventListener('click', () => {
  popupClose(editPopup);
});

closeAddPopupBtn.addEventListener('click', () => {
  popupClose(addPopup);
});

closeImgPopupBtn.addEventListener('click', () => {
  popupClose(imgPopup);
});

popup.forEach((item) => {
  item.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      popupClose(item);
    }
  });
});
