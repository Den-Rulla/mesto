import {
  Popup
} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._popupInputList = this._popupForm.querySelectorAll('.popup__input');
    this._popupSubmitBtn = this._popupForm.querySelector('.popup__submit-btn');
  }

  _getInputValues() {
    this._inputValues = {};

    this._popupInputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close()
    this._popupForm.reset();
  }
}
