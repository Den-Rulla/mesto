import "./index.css";

import {
  validationConfigConst,
  popupEditProfileForm,
  popupAddCardForm,
  profileEditBtn,
  cardAddBtn,
  nameInput,
  jobInput,
  popupEditAvatarForm,
  avatarEditBtn,
  avatarLinkInput
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

import {
  Api
} from "../components/Api.js";

import {
  PopupWithDelConfirm
} from "../components/PopupWithDelConfirm.js";

const validationEditProfileForm = new FormValidator(validationConfigConst, popupEditProfileForm);
const validationAddCardForm = new FormValidator(validationConfigConst, popupAddCardForm);
const validationEditAvatarForm = new FormValidator(validationConfigConst, popupEditAvatarForm);
let userId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '47a33f16-b049-421d-8238-92cceee13b2c',
    'Content-Type': 'application/json',
  },
});

const cardsList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  '.cards-list'
);

function createCard(data) {
  const newCard = new Card({
    data: data,
    userId: userId,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    },
    handleLikeClick: (cardId) => {
      newCard.checkLikeAccess() ?
        api
        .deleteLike(cardId)
        .then((res) => {
          newCard.setLikes(res.likes)
        })
        .catch((err) => console.log(err)) :
        api
        .addLike(cardId)
        .then((res) => {
          newCard.setLikes(res.likes);
        })
        .catch((err) => console.log(err))
    },
    handleDeleteCard: (cardId, card) => {
      popupWithDelConfirm.open(cardId, card);
      popupWithDelConfirm.setClickAction((cardId) => {
        popupWithDelConfirm.setBtnState(true, "Удаление...");
        api
          .deleteCard(cardId)
          .then(() => {
            popupWithDelConfirm.close();
            newCard.deleteCard();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            popupWithDelConfirm.setBtnState(false, "Да");
          })
      });
    },
  }, '.card-template');
  return newCard.generateCard();
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, initialCards]) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    userId = user._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err)
  })

const handleAddCardFormSubmit = (data) => {
  popupAddCard.setBtnState(true, "Сохранение...");
  api
    .addCard(data)
    .then((res) => {
      const cardElement = createCard(res);
      cardsList.addItemPrepend(cardElement);
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.setBtnState(false, "Создать");
    })
}

const popupWithDelConfirm = new PopupWithDelConfirm('.popup_type_delete-card');

popupWithDelConfirm.setEventListeners();

const handleProfileEditFormSubmit = (formValues) => {
  popupProfile.setBtnState(true, "Сохранение...");
  api
    .editUserInfo(formValues.name, formValues.job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about)
      popupProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfile.setBtnState(false, "Сохранить")
    })
}

const handleEditAvatarFormSubmit = () => {
  popupEditAvatar.setBtnState(true, "Сохранение...");
  api
    .editUserAvatar(avatarLinkInput.value)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatar.setBtnState(false, "Сохранить")
    })
}

const popupEditAvatar = new PopupWithForm('.popup_type_avatar', handleEditAvatarFormSubmit);

popupEditAvatar.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_edit', handleProfileEditFormSubmit);

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar-image',
})

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

popupWithImage.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add', handleAddCardFormSubmit);

popupAddCard.setEventListeners();

function openPopupAddCard() {
  validationAddCardForm.resetValidationErrors();
  popupAddCard.open();
}

function openPopupEditAvatar() {
  validationEditAvatarForm.resetValidationErrors();
  popupEditAvatar.open();
}

validationEditProfileForm.enableValidation();
validationAddCardForm.enableValidation();
validationEditAvatarForm.enableValidation();

profileEditBtn.addEventListener('click', openPopupProfile);
cardAddBtn.addEventListener('click', openPopupAddCard);
avatarEditBtn.addEventListener('click', openPopupEditAvatar);
