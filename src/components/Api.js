class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getCardList() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._handleServerResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      headers: this._headers,

      method: "DELETE",
    }).then(this._handleServerResponse);
  }

  // // {name: todo here"}
  createCard({ name, link }) {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then(this._handleServerResponse);
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      headers: this._headers,
      method: like ? "PUT" : "DELETE",
    }).then(this._handleServerResponse);
  }

  changeProfilePic({ avatar }) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then(this._handleServerResponse);
  }
}

export default Api;
