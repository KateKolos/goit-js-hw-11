import axios from 'axios';

const BASIC_URL = 'https://pixabay.com/api/';
const KEY = '33793722-2c477fdbe1dd0bab1af99cdbb';

export default class PhotoApiService {
  constructor() {
    this.image_type = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.query = '';
    this.page = 1;
    this.per_page = 40;
    this.displayAmount = this.perPage;
    this.myTotalHits = 0;
  }

  async fetchPhotos() {
    const URL = `${BASIC_URL}?key=${KEY}&q=${this.query}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`;
    try {
      const response = await axios.get(URL);
      this.nextPage();

      return response.data;
    } catch (err) {
      console.error(err.message);
    }
  }
  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  currentHits() {
    return this.page * this.per_page;
  }

  get getQuery() {
    return this.query;
  }

  set setQuery(newQuery) {
    this.query = newQuery;
  }
}
