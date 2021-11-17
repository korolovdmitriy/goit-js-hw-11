import { getRefs } from "../js/getRefs";
import { Notify } from "notiflix";

const refs = getRefs();
export function isEndOfImg(page, totalHits) {
    if (page*40 > totalHits) {
        refs.loadMoreBtn.classList.add('is-hidden');   
        Notify.success("We're sorry, but you've reached the end of search results.");         
    }
}