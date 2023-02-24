import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { loadMoreBtn } from './js/loadMoreBtn';
import { pixabayApiService } from './js/pixabayApiService';
import { refs } from './js/refs';
import { appendToGallery, createMarkup } from './js/renderMarkupFunction';

const { formEl, galleryEl, loadMoreBtn } = refs;

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 100,
  captionType: 'alt',
  widthRatio: 0.8,
  heightRatio: 0.9,
});

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(evt) {
  evt.preventDefault();
  loadMoreBtn.hide();

  const inputValue = evt.target.element.searchQuery.value.trim();
  if (inputValue === '') {
    Notify.failure('Please provide search data!');
    return;
  }
  pixabayApiService.searchQuery = inputValue;
  pixabayApiService.resetPage();

  clearGallery();

  formEl.reset();
}

function onLoadMoreBtnClick() {}

function processingReceivedImg() {
  loadMoreBtn.loading();

  try {
    const { hits, totalHits } = pixabayApiService.fetchPhotos();
  } catch (error) {
    console.error(error.message);
  }
}
