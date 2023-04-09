export class Card {
  constructor({
    data,
    userId,
    handleCardClick,
    handleLikeClick,
    handleDeleteCard
  }, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._buttonLike = this._element.querySelector('.card__like');
    this._buttonDeleteCard = this._element.querySelector('.card__delete-btn');
    this._likesCounter = this._element.querySelector('.card__likes-counter');
    this._likesCounter.textContent = this._likes.length;
    if (this._ownerId !== this._userId) {
      this._buttonDeleteCard.style.display = 'none';
    }

    this.setLikes(this._likes);

    this._setEventListeners();

    return this._element;
  }

  checkLikeAccess() {
    return this._likes.find((like) => {
      return like._id === this._userId;
    });
  }

  toggleLike() {
    if (this.checkLikeAccess()) {
      this._addLike();
    } else {
      this._deleteLike();
    }
  }

  setLikes(likesList) {
    this._likes = likesList;
    this._likesCounter.textContent = this._likes.length;
    this.toggleLike();
  }

  _addLike() {
    this._buttonLike.classList.add('card__like_active');
  }

  _deleteLike() {
    this._buttonLike.classList.remove('card__like_active');
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick(this._cardId);
      this.toggleLike();
    });

    this._buttonDeleteCard.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId, this._element);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
