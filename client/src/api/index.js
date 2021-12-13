import axios from "axios";

const API = axios.create({baseUrl: 'http://localhost:5000'})

//interceptors - akcja będzie wykonana przy każdym requescie
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchSongs = () => API.get('/songs');
export const addSong = (newSong) =>  {API.post('/songs', newSong)};
export const fetchSongsBySearch = (searchQuery) => API.get(`/songs/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const updateSong = (id, updateSong) =>  API.patch(`/songs/${id}`, updateSong);
export const deleteSong = (id) =>  API.delete(`/songs/${id}`);
export const likeSong = (id) =>  API.patch(`/songs/${id}/likeSong`);
export const sendFile = (file) => API.post('/songs/s3', file);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

