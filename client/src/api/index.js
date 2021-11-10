import axios from "axios";

const url = "http://localhost:5000/songs";

export const fetchSongs = () => axios.get(url);
export const addSong = (song) =>  axios.post(url, song);
export const updateSong = (id, updateSong) =>  axios.patch(`${url}/${id}`, updateSong);
export const deleteSong = (id) =>  axios.delete(`${url}/${id}`);
export const likeSong = (id) =>  axios.patch(`${url}/${id}/likeSong`);