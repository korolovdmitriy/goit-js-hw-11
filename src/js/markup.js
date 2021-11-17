import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getRefs } from "./getRefs";

const refs = getRefs();

export function markup(images) {
    const imgArray = images.data.hits;
            
    const galleryMarkup = imgArray.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
  `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="354" height="225"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes </br><span class='text'>${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views  </br><span class='text'>${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments  </br><span class='text'>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads  </br><span class='text'>${downloads}</span></b>
    </p>
  </div>
</div>`
    ).join('');
        
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'botton',
});
  gallery.refresh();
}