import axios from "axios";

// const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const NEW_BASE_URL = "https://youtube.googleapis.com/youtube/v3";

// const options = {
//   params: {
//     // relatedToVideoId: '7ghhRHRP6t4',
//     // part: 'id,snippet',
//     // type: 'video',
//     maxResults: '50'
//   },
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// };

// const option = {
//   params: {
//     // relatedToVideoId: '7ghhRHRP6t4',
//     // part: 'id,snippet',
//     // type: 'video',
//     // maxResults: '50'
//   },
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// };

// export const fetchFromApi = async (url) => {
//   const { data } = await axios.get(`${BASE_URL}/${url}`, options);
//   return data;
// };

// export const fetchFromChannelDetailsApi = async (url) => {
//   const { data } = await axios.get(`${BASE_URL}/${url}`, option);
//   return data;
// };

export const getPopularVideos = axios.create({
  baseURL: NEW_BASE_URL,
  params: {
    key: process.env.REACT_APP_GOOGLE_YOUTUBE_API_KEY
  }
})
