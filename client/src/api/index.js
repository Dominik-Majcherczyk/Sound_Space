import axios from "axios";

const url = "http://localhost:5000/songs";

export const fetchSongs = () => axios.get(url);
export const addSong = (song) =>  axios.post(url, song);
