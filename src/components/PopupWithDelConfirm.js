import {
  Popup
} from "./Popup.js";

export class PopupWithDelConfirm extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._confirmBtn = this._popup.querySelector('.popup__submit-btn');
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    this._confirmBtn.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId, this._card);
    })
    super.setEventListeners();
  }

  deleteCard() {
    this._card.remove();
  }
}
