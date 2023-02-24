import { refs } from './refs';

export function createMarkup(photo) {
  const markup = photo
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
   <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="400px" height="270px" />
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: </b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views: </b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments: </b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  appendToGallery(markup);
}

export function appendToGallery(markup) {
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  refs.galleryEl.innerHTML = '';
}
