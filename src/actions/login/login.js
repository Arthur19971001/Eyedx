import axios from 'axios'
import React from 'react'
import { ACTION_TYPES } from '../actionType'
import { loginUrl } from '../api'

export const RequestLogin = (data, onSuccessful, onFailure) => dispatch => {
    axios.post(loginUrl,data,{headers: {'content-type' : 'application/x-www-form-urlencoded'}}).then(
         res => {
            dispatch({
                type: ACTION_TYPES.FETCH_LOGIN,
                payload: res.data,
            });
            onSuccessful(res.data);
        }
    ).catch((e) => {
        console.log(e);
        dispatch({
            type: ACTION_TYPES.FETCH_LOGIN,
            payload: e.response.data,
        });
        onFailure(e.response.data.message);
    });
}
