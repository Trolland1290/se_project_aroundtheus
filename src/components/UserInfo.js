class UserInfo {
  constructor({ userNameSelector, userDescription, userAvatar }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescription);
    this._userAvatar = document.querySelector(userAvatar);

    // console.log(document.querySelector(".profile__description"));
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescription.textContent,
    };
  }

  setUserInfo(name, description, avatar) {
    this._userNameElement.textContent = name;
    this._userDescription.textContent = description;
    this._userAvatar.src = avatar;
  }
}

export default UserInfo;
