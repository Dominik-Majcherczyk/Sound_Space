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
      console.log("git gut")
      dispatch({ type: "CREATE", payload: data });
   } catch (error) {
      console.log(error.message);
   }
};
