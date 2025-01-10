import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
};

/*Elements  */

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

// function openPopup(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keyup", handleEscKey);
// }

// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keyup", handleEscKey);
// }

// function isEscEvent(evt, action) {
//   if (evt.key === "Escape") {
//     const activeModal = document.querySelector(".modal_opened");
//     action(activeModal);
//   }
// }

function handleImageClick(data) {
  imagePreviewPopup.open(data);
}

function createCard(data) {
  return new Card(data, cardSelector, handleImageClick).getView();
}

function renderCard(data, wrap) {
  const card = createCard(data);
  wrap.prepend(card);
}

/* Event Handlers */

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  // use the close method instead of this line
  // closePopup(profileEditModal);
  editProfilePopup.close();
}

// function handleEscKey(evt) {
//   isEscEvent(evt, closePopup);
// }

// Handlers

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

// profileEditCloseButton.addEventListener("click", () => {
//   closePopup(profileEditModal);
// });

// addCardForm.addEventListener("submit", handleAddCardSubmit);

// add listener to add modal close button

// addNewCardButtonClose.addEventListener("click", () => {
//   closePopup(addCardModal);
// });

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
/* add new card button  */

addNewCardButton.addEventListener("click", () => {
  addNewCardPopup.open();
});

// previewModalCloseButton.addEventListener("click", () => {
//   closePopup(previewModal);
// });

// -close forms
// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", (evt) => {
//     if (evt.target === modal) {
//       closePopup(modal);
//     }
//   });
// });

initialCards.forEach((data) => {
  //cardListEl.append(cardElement);
  renderCard(data, cardListEl);
});

// document.addEventListener("keydown", (evt) => {
//   if (evt.key === "Escape") {
//     modals.forEach((modal) => {
//       closePopup(modal);
//     });
//   }
// });

/* select like Buttons */

/* const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
}); */

function handleCardSubmit(data) {
  // evt.preventDefault();
  renderCard(data, cardListEl);
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  addCardFormValidator.disableButton();
  addNewCardPopup.close();
}

//addCardForm.addEventListener("submit", (event) => {
// event.preventDefault();

// closePopup(addCardModal);

// const formData = new FormData(addCardForm);
// const data = {};
// for (let pair of formData.entries()) {
//   data[pair[0]] = pair[1];
// }

// const cardElement = getCardElement(data);
// HERE use the new Card instead, as you used above
//const newCard = new Card(data, cardSelector, handleImageClick);

// const cardElement = createCard.getView();
// cardListEl.prepend(cardElement);
// addCardForm.reset();
//});

// addCardForm.addEventListener("submit", handleCardSubmit);
