import {AUTH, FETCH_USER} from '../constans/actionTypes.js'
import * as api from "../api/index.js";

//action Creators

export const fetchUser = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchUser(id);
            
        dispatch({type: FETCH_USER, payload: data})
     

    } catch (error) {
        console.log(error);
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData);

        dispatch({type: AUTH, data})

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}




export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);

        dispatch({type: AUTH, data})

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}