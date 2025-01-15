import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._paragraghElement = this._popupElement.querySelector(
      ".modal__preview-footer"
    );
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;
    this._paragraghElement.textContent = data.name;
    // set the image's src and alt
    // set the caption's textContent
    super.open();
  }
}
export default PopupWithImage;
