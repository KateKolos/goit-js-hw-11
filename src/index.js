import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PhotoApiService from './js/fetchPhotos';
import { createMarkup, appendToGallery, clearGallery } from './js/markup';
import LoadMoreBtn from './js/loadMoreBtn';

const formEL = document.querySelector('.search-form');
const apiService = new PhotoApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

formEL.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchData);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  apiService.query = value;
  clearGallery();
  apiService.resetPage();

  loadMoreBtn.show();

  fetchData().finally(() => form.reset());
}

function fetchData() {
  loadMoreBtn.disable();
  let currentHits = apiService.currentHits();

  return apiService
    .fetchPhotos()
    .then(({ hits, totalHits }) => {
      if (!hits.length) {
        loadMoreBtn.hide();
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      createMarkup(hits);

      if (currentHits >= totalHits) {
        loadMoreBtn.hide();
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return '';
      }

      loadMoreBtn.enable();
    })

    .catch(console.log);
}
