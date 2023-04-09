export class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
      .then((res) => {
        return this._checkResult(res);
      });
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      })
      .then((res) => this._checkResult(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => this._checkResult(res));
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then((res) => this._checkResult(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => this._checkResult(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._checkResult(res))
  }

  editUserInfo(name, job) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: job,
        }),
      })
      .then((res) => this._checkResult(res));
  }

  editUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      })
      .then((res) => this._checkResult(res));
  }
}
