import axios from "axios";

export async function getImg(name, page) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${name}&safesearch=true&per_page=40&page=${page}&key=24332241-c798d1feff33a91af8e5caf46`;
    return await axios.get(url);
}