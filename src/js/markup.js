const galleryEL = document.querySelector('.gallery');

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
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250px" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  appendToGallery(markup);
}

export function appendToGallery(markup) {
  galleryEL.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  galleryEL.innerHTML = '';
}
