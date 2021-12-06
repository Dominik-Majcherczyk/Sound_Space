import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constans/actionTypes.js'

export default (songs = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case DELETE:
      return songs.filter((song) => song._id !== action.payload);
    case CREATE:
      return [...songs, action.payload];
    case UPDATE:
      return songs.map((song) =>
        song._id === action.payload._id ? action.payload : song
      );

    default:
      return songs;
  }
};
