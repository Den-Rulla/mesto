import {
  Popup
} from "./Popup.js";

export class PopupWithDelConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmBtn = this._popup.querySelector('.popup__submit-btn');
  }

  setBtnState(isDisabled, text) {
    this._confirmBtn.textContent = text;
    if (isDisabled) {
      this._confirmBtn.disabled = true;
    } else {
      this._confirmBtn.disabled = false;
    }
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  setClickAction(data) {
    this._handleDeleteCard = data;
  }

  setEventListeners() {
    this._confirmBtn.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId, this._card);
    })
    super.setEventListeners();
  }
}
