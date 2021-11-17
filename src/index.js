import './sass/main.scss';
import { getRefs } from './js/getRefs';
import { getSearch } from './js/getSearch';
import { Notify } from 'notiflix';
import axios from "axios";
import { getImg } from './js/getImg';
import { isEndOfImg } from './js/isEndOfImg';

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();
let page = 1;
let searchQuery = '';
let totalHits = 0;

refs.searchForm.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onMoreLoadBtnClick);

refs.loadMoreBtn.classList.add('is-hidden');

function onSubmitClick(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value;
    refs.loadMoreBtn.classList.add('is-hidden');    
    refs.gallery.innerHTML = '';
    page = 1;

    if (searchQuery === '') { return Notify.failure('Please enter your search data.') };
    event.target.reset();
    getImg(searchQuery, page).then(markup);
    refs.loadMoreBtn.classList.remove('is-hidden');
    isEndOfImg(page, totalHits);
    page += 1;
    
};

function onMoreLoadBtnClick() {
    getImg(searchQuery, page).then(markup);
    isEndOfImg(page, totalHits);
    page += 1;    
}

function markup({ data }) {
    const imgArray = data.hits;
    totalHits = data.totalHits;
    if (page === 2) { Notify.success(`Hooray! We found ${totalHits} images.`)};
    if (imgArray.length === 0) { return Notify.failure('Sorry, there are no images matching your search query. Please try again.') }
      
    const galleryMarkup = imgArray.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
  `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="354" heigth="200"/></a>
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
}

