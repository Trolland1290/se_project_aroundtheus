import Popup from "./Popup";

class PopupWithConfirm extends Popup {
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });

    super.setEventListners();
  }
}

export default PopupWithConfirm;
