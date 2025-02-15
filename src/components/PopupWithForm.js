import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, defaultSubmitBtnText) {
    super({ popupSelector });
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._modalForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitbutton = this._modalForm.querySelector(".modal__save");
    this._defaultSubmitBtnText = defaultSubmitBtnText;
  }
  close() {
    // this._modalForm.reset;
    // refers to ParentClass
    super.close();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  renderLoading(isLoading) {
    console.log(this._submitbutton);
    if (isLoading) {
      this._submitbutton.textContent = "Saving...";
    } else {
      this._submitbutton.textContent = this._defaultSubmitBtnText;
    }
  }

  setEventListners() {
    this._modalForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListners();
  }
}
export default PopupWithForm;
// index.js

// const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
// newCardPopup.open();

// newCardPopup.close();
