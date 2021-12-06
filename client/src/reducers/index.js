import { combineReducers } from "redux";

import songs from "./songs";
import auth from "./auth";

export const reducers = combineReducers({ songs, auth });
