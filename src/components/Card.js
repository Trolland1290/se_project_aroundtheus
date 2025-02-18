export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteIconClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._cardId = data._id;
    this._isLiked = data.isLiked;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    // ".card__like-button"

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    // ".card__delete-button"

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _updateLike() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    this._updateLike();

    return this._element;
  }

  getId() {
    return this._cardId;
  }

  isLiked() {
    return this._isLiked;
  }
}
