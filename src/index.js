import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import PhotoApiService from './js/fetchPhotos';
import { createMarkup, appendToGallery, clearGallery } from './js/markup';
import LoadMoreBtn from './js/loadMoreBtn';
import { refs } from './js/refs';

const apiService = new PhotoApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 100,
  captionType: 'alt',
  widthRatio: 0.8,
  heightRatio: 0.9,
});

refs.formEL.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', fetchData);

async function onSubmit(e) {
  e.preventDefault();

  apiService.resetPage();
  clearGallery();
  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  if (!value) {
    Notify.failure('Please provide search data!');
    return;
  }

  apiService.query = value;

  fetchData().finally(() => form.reset());
}

async function fetchData() {
  try {
    const fetchedData = await apiService.fetchPhotos();
    const { hits: cards, totalHits } = fetchedData;

    if (cards.length === 0) {
      loadMoreBtn.hide();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (apiService.displayAmount >= apiService.myTotalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.hide();
      return '';
    }
    apiService.displayAmount += apiService.per_page;

    try {
      const fetchedData = await apiService.fetchPhotos();
      const { hits: cards } = fetchedData;

      appendToGallery(cards);
      lightbox.refresh();
    } catch (error) {
      console.log(error.message);
    }
    createMarkup(cards);

    Notify.success(`Horray! We found ${totalHits} images.`);
    apiService.displayAmount = apiService.per_page;
    apiService.myTotalHits = totalHits;

    lightbox.refresh();
    loadMoreBtn.show();
  } catch (error) {
    console.error(error.message);
  }
}

// async function onLoadMoreBtnClick() {

//   // loadMoreBtn.enable();
// }
