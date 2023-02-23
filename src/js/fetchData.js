import axios from 'axios';

const BASIC_URL = 'https://pixabay.com/api/';
const key = '33793722-2c477fdbe1dd0bab1af99cdbb';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
}).toString();

export class PhotoApiService {
  constructor() {
    this.page = 1;
    this.query = '';
    this.per_page = 40;
  }

  async fetchData() {
    const URL = `${BASIC_URL}?key=${key}&q=${this.query}&${searchParams}&page=${this.page}&per_page=${this.per_page}`;
    return await axios
      .get(URL)
      .then(({ data }) => {
        this.nextPage();

        console.log(data);
        return data;
      })
      .catch(console.log);
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
}
