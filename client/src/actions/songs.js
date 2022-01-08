import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  END_LOADING,
  START_LOADING,
  FETCH_SONG,
  COMMENT,
} from "../constans/actionTypes.js";
import * as api from "../api/index.js";
//action Creators

export const getSong = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchSong(id);

    dispatch({ type: FETCH_SONG, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getSongs = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSongs();

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSongsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchSongsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const addSong = (song, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.addSong(song);

    dispatch({ type: CREATE, payload: data });
    navigate(`/songs/${data._id}`)
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSong = (id, song) => async (dispatch) => {
  try {
    const { data } = await api.updateSong(id, song);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSong = (id) => async (dispatch) => {
  try {
    await api.deleteSong(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeSong = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeSong(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const commentSong = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error.message);
  }
};
