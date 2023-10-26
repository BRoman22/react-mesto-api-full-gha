const url = 'https://api.mesto.nomoredomainsrocks.ru';
// const url = 'http://localhost:3000'; //dev
const checkResponse = (res) => (res.ok ? res.json() : Promise.reject());

const request = (path, method, data) =>
  fetch(`${url}/${path}`, {
    method: method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);

export const getUserInfo = () => request('users/me');

export const setUserInfo = (data) => request('users/me', 'PATCH', data);

export const setAvatar = (data) => request('users/me/avatar', 'PATCH', data);

export const getCardList = () => request('cards');

export const toggleLike = (card, isLiked) =>
  request(`cards/${card}/likes`, isLiked ? 'DELETE' : 'PUT');

export const addNewCard = (data) => request('cards', 'POST', data);

export const deleteCard = (id) => request(`cards/${id}`, 'DELETE');

export const getError = (err) => alert(err);
// auth
export const register = (data) => request('signup', 'POST', data);

export const login = (data) => request('signin', 'POST', data);

export const logout = () => request('signout', 'POST');
