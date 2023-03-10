export class Card {
  constructor(data, templateSelector, openImgPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImgPopup = openImgPopup;
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

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener("click", (event) => {
      event.target.classList.toggle('card__like_active');
    });

    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._element.remove();
    });

    this._cardImage.addEventListener('click', () => {
      this._openImgPopup(this._name, this._link);
    });
  }
}
