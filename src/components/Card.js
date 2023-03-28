export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._buttonDelete = this._element.querySelector('.card__delete-btn');

    this._setEventListeners();

    return this._element;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle('card__like_active');
  }

  _removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._toggleLike();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._removeCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
