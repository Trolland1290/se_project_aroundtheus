class UserInfo {
  constructor({ userNameSelector, userDescription }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescription);
    // console.log(document.querySelector(".profile__description"));
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescription.textContent,
    };
  }

  setUserInfo(name, description) {
    this._userNameElement.textContent = name;
    this._userDescription.textContent = description;
  }
}

export default UserInfo;
