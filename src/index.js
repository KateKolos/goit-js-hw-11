import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { searchForm, gallery, loadMoreBtn, endCollectionText } = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  endCollectionText: document.querySelector('.end-collection-text'),
};

function renderImageCard(arr) {
  const markup = arr.map(item => createCardMarkup(item)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
