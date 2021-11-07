import * as api from "../api/index.js";
//action Creators
export const getSongs = () => async (dispatch) => {
   try {
      const { data } = await api.fetchSongs();
      dispatch({ type: "FETCH_ALL", payload: data });
   } catch (error) {
      console.log(error.message);
   }
};

export const addSong = (song) => async (dispatch) => {
   try {
      const { data } = await api.addSong(song);
      dispatch({ type: "CREATE", payload: data });
   } catch (error) {
      console.log(error.message);
   }
};

export const updateSong = (id, song) => async (dispatch) => {
   try {
     const {data} = await api.updateSong(id, song);
      dispatch({ type: "UPDATE", payload: data });
   } catch (error) {
      console.log(error.message);
   }
};

export const deleteSong = (id) => async (dispatch) => {
   try {
     await api.deleteSong(id);
      dispatch({ type: "DELETE", payload: id });
   } catch (error) {
      console.log(error.message);
   }
};

