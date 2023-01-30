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
  }
];

const editPopup = document.querySelector('.popup_type_edit');
const editForm = document.querySelector('.popup__form_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-btn');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const addPopup = document.querySelector('.popup_type_add');

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  editPopup.classList.add('popup_opened');
}

function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeEditPopup();
}

closeButton.addEventListener('click', closeEditPopup);

editButton.addEventListener('click', openEditPopup);

editForm.addEventListener('submit', handleFormSubmit);

//---------------------------------------------------------------



const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardsList = document.querySelector('.cards-list');
const addBtn = document.querySelector('.profile__add-button');
const likeBtn = document.querySelector('.card__like');
const closeAddPopupBtn = document.querySelector('.popup__close-btn_type_add');
const cardTitleInput = document.querySelector('.popup__input_type_card-title');
const cardImageInput = document.querySelector('.popup__input_type_card-img-link');
const createBtn = document.querySelector('.popup__submit-btn_type_create');
const imgPopup = document.querySelector('.popup_type_img-scale');
const closeImgPopupBtn = document.querySelector('.popup__close-btn_type_image');


function createCard(item) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.card__title').textContent = item.name;
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__image').alt = item.name;

  card.querySelector('.card__delete-btn').addEventListener('click', () => {
    card.remove();
  });
  card.querySelector('.card__like').addEventListener('click', (event) => {
    event.target.classList.toggle('card__like_active');
  });

  card.querySelector('.card__image').addEventListener('click', openImgPopup);

  return card;
}

function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  });
  cardsList.append(...cards);
}

renderCards(initialCards);

createBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const cardTitle = cardTitleInput.value;
  const cardImage = cardImageInput.value;

  const card = createCard({
    name: cardTitle,
    link: cardImage
  });

  cardsList.prepend(card);

  closeAddPopup();

});

function openAddPopup() {
  addPopup.classList.add('popup_opened');
  cardTitleInput.value = '';
  cardImageInput.value = '';
}

function closeAddPopup() {
  addPopup.classList.remove('popup_opened');
}

function openImgPopup(event) {
  imgPopup.querySelector('.popup__image').src = event.target.closest('.card__image').src;
  imgPopup.querySelector('.popup__image').alt = event.target.closest('.card').querySelector('.card__title-cover').querySelector('.card__title').textContent;
  imgPopup.querySelector('.popup__caption').textContent = event.target.closest('.card').querySelector('.card__title-cover').querySelector('.card__title').textContent;
  imgPopup.classList.add('popup_opened');
}

function closeImgPopup() {
  imgPopup.classList.remove('popup_opened');
}

addBtn.addEventListener('click', openAddPopup);

closeAddPopupBtn.addEventListener('click', closeAddPopup);

closeImgPopupBtn.addEventListener('click', closeImgPopup);
