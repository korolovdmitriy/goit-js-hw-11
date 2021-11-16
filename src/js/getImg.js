import axios from "axios";
export function getImg(name) {
    const url = `https://pixabay.com/api/?image_type=backgrounds&orientation=horizontal&q=${name}&per_page=20&key=24332241-c798d1feff33a91af8e5caf46`;
    return axios.get(url)
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
}