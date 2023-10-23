// файл не используется

// фун-ции перенесены в utils/api
// const BASE_URL = 'https://api-mesto.nomoredomainsrocks.ru';
const BASE_URL = 'http://localhost:3000';
const checkResponse = (res) => (res.ok ? res.json() : Promise.reject());

export const register = (data) => 
fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(checkResponse);

export const login = (data) => 
fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(checkResponse);

export const logout = () =>
  fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);

// дубль api.getUserInfo
export const checkToken = () =>
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
