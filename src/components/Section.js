export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._cardList = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._cardList.prepend(item);
  }
}
