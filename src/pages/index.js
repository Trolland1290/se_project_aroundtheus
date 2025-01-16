import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/section.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import "./index.css";

const modals = document.querySelectorAll(".modal");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");

const profileEditCloseButton = profileEditModal.querySelector(".modal__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");

// select close button
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardButtonClose = addCardModal.querySelector(".modal__close");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardSelector = "#card-template";
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
/* Functions */

const cardTitleInput = addCardModal.querySelector("#card-title-input");

const cardLinkInput = addCardModal.querySelector("#card-url-input");

const previewModal = document.querySelector("#preview-image-modal");
const imageElement = previewModal.querySelector(".modal__preview-image");
const imageCaption = previewModal.querySelector(".modal__preview-footer");
const previewModalCloseButton = previewModal.querySelector(".modal__close");

const modalImage = document.querySelector(".modal__preview-image");
const modalFooter = document.querySelector(".modal__preview-footer");

const cardsConfig = {
  containerSelector: ".cards__list",
  cardTemplateSelector: "#card-template",
};

const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);

addCardFormValidator.enableValidation();

const addNewCardPopup = new PopupWithForm("#add-card-modal", handleCardSubmit);
addNewCardPopup.setEventListners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListners();

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imagePreviewPopup.setEventListners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescription: ".profile__description",
});

function handleImageClick(data) {
  imagePreviewPopup.open(data);
}

function createCard(data) {
  return new Card(data, cardSelector, handleImageClick).getView();
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  // use the close method instead of this line
  // closePopup(profileEditModal);
  editProfilePopup.close();
}

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  console.log(userData);
  profileTitleInput.value = userData.userName;
  profileDescriptionInput.value = userData.userDescription;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addNewCardPopup.open();
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  cardsConfig.containerSelector
);

cardList.renderItems(initialCards);

function handleCardSubmit(data) {
  // evt.preventDefault();
  cardList.addItem(createCard(data));
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  addCardFormValidator.disableButton();
  addNewCardPopup.close();
}
