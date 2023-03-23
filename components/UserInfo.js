export class UserInfo {
  constructor({
    userName,
    userJob
  }) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    this._user = {};
    this._user.name = this._userName.textContent;
    this._user.job = this._userJob.textContent;

    return this._user;
  }

  setUserInfo(nameInput, jobInput) {
    this._userName = nameInput;
    this._userJob = jobInput;
  }
}
