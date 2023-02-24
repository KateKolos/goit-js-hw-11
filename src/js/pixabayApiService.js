import axios from 'axios';

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33793722-2c477fdbe1dd0bab1af99cdbb';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchPhotos() {
    const searchParams = new SearchParams({
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: this.searchQuery,
      page: this.page,
      per_page: this.per_page,
    });

    try {
      const { data } = await axios(`${searchParams}`);
      this.incrementPage();

      return data;
    } catch (err) {
      console.error(err.message);
    }
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

export const pixabayApiService = new PixabayApiService();
