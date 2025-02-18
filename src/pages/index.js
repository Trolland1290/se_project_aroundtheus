import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/section.js";
import Api from "../components/Api.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import "./index.css";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

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

const editAvatarForm = document.querySelector("#avatar-form");

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
const profileImage = document.querySelector(".profile__image");
const profileImageButton = document.querySelector(".profile__image-button");
const cardsConfig = {
  containerSelector: ".cards__list",
  cardTemplateSelector: "#card-template",
};

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e034513c-b5b1-4a1c-ac01-f061b5be9916",
    "Content-Type": "application/json",
  },
});

const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);

addCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(
  validationSettings,
  editAvatarForm
);

editAvatarFormValidator.enableValidation();

const addNewCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleCardSubmit,
  "Create"
);
addNewCardPopup.setEventListners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  "Save"
);
editProfilePopup.setEventListners();

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imagePreviewPopup.setEventListners();

const confirmDelete = new PopupWithConfirm({
  popupSelector: "#confirm-delete-modal",
  // handler shoould be here
  handler: (cardId) => {},
});

const avatarModal = new PopupWithForm(
  "#avatar-modal",
  handleUpdateAvatar,
  "Save"
);
avatarModal.setEventListners();

confirmDelete.setEventListners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescription: ".profile__description",
  userAvatar: ".profile__image",
});

function handleImageClick(data) {
  imagePreviewPopup.open(data);
}

function handleUpdateAvatar({ link }) {
  avatarModal.renderLoading(true);
  api
    .changeProfilePic({ avatar: link })
    .then((data) => {
      avatarModal.close();
      userInfo.setUserInfo(data.name, data.about, data.avatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarModal.renderLoading(false);
    });
}

function createCard(data) {
  const card = new Card(
    data,
    cardSelector,
    handleImageClick,
    (card) => {
      confirmDelete.open();
      confirmDelete.setSubmitAction(() => {
        return api
          .deleteCard(card.getId())
          .then(() => {
            card.handleDeleteCard();
            confirmDelete.close();
          })
          .catch((err) => {
            alert("No Card Available", err);
          });
      });
    },
    (card) => {
      api
        .changeLikeCardStatus(card.getId(), !card.isLiked())
        .then(() => {
          card.handleLikeIcon();
        })
        .catch((err) => {});
    }
  );

  return card.getView();
}

function handleProfileEditSubmit(inputValues) {
  editProfilePopup.renderLoading(true);
  api
    .setUserInfo({ name: inputValues.title, about: inputValues.description })
    .then((data) => {
      userInfo.setUserInfo(
        inputValues.title,
        inputValues.description,
        data.avatar
      );
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      //update button text to say save
      editProfilePopup.renderLoading(false);
    });
}

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.userName;
  profileDescriptionInput.value = userData.userDescription;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

profileImageButton.addEventListener("click", () => {
  avatarModal.open();
});

addNewCardButton.addEventListener("click", () => {
  addNewCardPopup.open();
});

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  cardsConfig.containerSelector
);

api
  .getCardList()
  .then((data) => [cardList.renderItems(data)])
  .catch((err) => {});

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
    console.log(data.avatar);
  })
  .catch((err) => {});

function handleCardSubmit(cardData) {
  addNewCardPopup.renderLoading(true);
  api
    .createCard(cardData)
    .then((data) => {
      cardList.addItem(createCard(data));
      cardTitleInput.value = "";
      cardLinkInput.value = "";
      addCardFormValidator.disableButton();
      addNewCardPopup.close();
    })
    .catch((err) => {
      alert("No Card Available");
    })
    .finally(() => {
      addNewCardPopup.renderLoading(false);
    });
}
