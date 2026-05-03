export const BASE_URL = 'http://localhost:3000';
const checkResponse = (res) => {
if (res.ok) return res.json();
return Promise.reject(`Error: ${res.status}`);
};
class MainApi {
constructor() {
this._baseUrl = BASE_URL;
}
getSavedArticles(token) {
return fetch(`${this._baseUrl}/articles`, {
headers: {
Authorization: `Bearer ${token}`,
'Content-Type': 'application/json',
},
}).then(checkResponse);
}
saveArticle(articleData, token) {
return fetch(`${this._baseUrl}/articles`, {
method: 'POST',
headers: {
Authorization: `Bearer ${token}`,
'Content-Type': 'application/json',
},
body: JSON.stringify(articleData),
}).then(checkResponse);
}
deleteArticle(articleId, token) {
return fetch(`${this._baseUrl}/articles/${articleId}`, {
method: 'DELETE',
headers: {
Authorization: `Bearer ${token}`,
'Content-Type': 'application/json',
},
}).then(checkResponse);
}
}
const mainApi = new MainApi();
export default mainApi;