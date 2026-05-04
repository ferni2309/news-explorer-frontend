const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_URL || 'https://nomoreparties.co';
class NewsApi {
constructor() {
this._today = new Date().toISOString();
this._lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 *
1000).toISOString();
}
search(query) {
return fetch(
`${BASE_URL}?q=${query}&from=${this._lastWeek}&to=${this._today}&pageSize=100&ap
iKey=${API_KEY}`
).then((res) => {
if (res.ok) return res.json();
return res.json().then(err => Promise.reject(err));
})
}
}
const newsApi = new NewsApi();
export default newsApi;