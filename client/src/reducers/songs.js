import {
  FETCH_ALL,
  CREATE,
  FETCH_SONG,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  END_LOADING,
  START_LOADING,
  COMMENT,
} from "../constans/actionTypes.js";

export default (state = { isLoading: true, songs: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return { ...state, songs: action.payload };
    case FETCH_BY_SEARCH:
      return { ...state, songs: action.payload };
    case FETCH_SONG:
      return { ...state, song: action.payload };
    case DELETE:
      return {
        ...state,
        songs: state.songs.filter((song) => song._id !== action.payload),
      };
    case CREATE:
      return { ...state, songs: [...state.songs, action.payload] };
    case UPDATE:
      return {
        ...state,
        songs: state.songs.map((song) =>
          song._id === action.payload._id ? action.payload : song
        ),
      };
    case COMMENT:
      return {
        ...state,
        songs: state.songs.map((song) =>
          song._id === action.payload._id ? action.payload : song
        ),
      };

    default:
      return state;
  }
};
