import './sass/main.scss';

import { Notify } from 'notiflix';

import { getRefs } from './js/getRefs';
import { getImg } from './js/getImg';
import { isEndOfImg } from './js/isEndOfImg';
import { markup } from './js/markup';

const refs = getRefs();
let page = 1;
let searchQuery = '';
let totalHits;

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
    getImg(searchQuery, page).then(rev => {
        const imgArray = rev.data.hits;
        if (imgArray.length === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        totalHits = rev.data.totalHits;
        Notify.success(`Hooray! We found ${totalHits} images.`);
        markup(rev);
    });
    refs.loadMoreBtn.classList.remove('is-hidden');
    isEndOfImg(page, totalHits);
    page += 1;
    // scrol();
};

function onMoreLoadBtnClick() {
    getImg(searchQuery, page).then(markup);
    isEndOfImg(page, totalHits);
    page += 1;
    // scrol();
}

// const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
// console.log(document.querySelector('.gallery').firstElementChild);

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });