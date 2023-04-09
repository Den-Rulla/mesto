import {
  Popup
} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = this._popupForm.querySelectorAll('.popup__input');
    this._popupSaveBtn = this._popupForm.querySelector('.popup__submit-btn');
  }

  setBtnState(isDisabled, text) {
    this._popupSaveBtn.textContent = text;
    if (isDisabled) {
      this._popupSaveBtn.disabled = true;
    } else {
      this._popupSaveBtn.disabled = false;
    }
  }

  _getInputValues() {
    this._formValues = {};

    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close()
    this._popupForm.reset();
  }
}
