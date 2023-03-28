import {
  Popup
} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__caption');
  }

  open(title, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImageCaption.textContent = title;
    this._popupImage.alt = title;
  }
}
