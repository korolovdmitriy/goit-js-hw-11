import './sass/main.scss';
import { getRefs } from './js/getRefs';
import { getSearch } from './js/getSearch';
// import { getImg } from './js/getImg';
import { Notify } from 'notiflix';
import axios from "axios";

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.searchQuery.value;
    console.log(searchQuery);
    event.target.reset();
    getImg(searchQuery).then(markup);   
};

function getImg(name) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${name}&safesearch=true&per_page=20&key=24332241-c798d1feff33a91af8e5caf46`;
    return axios.get(url);
}


function markup(images) {
    const imgArray = images.data.hits;
    if (imgArray.length === 0) { return Notify.failure('Sorry, there are no images matching your search query. Please try again.') }
    
    const galleryMarkup = imgArray.map(item => 
  `<div class="photo-card">
  <a class="gallery__item" href="${item.largeImageURL}"><img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${item.downloads}</b>
    </p>
  </div>
</div>`
    ).join('');
    
    
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'botton',
});

    console.log(imgArray);
}