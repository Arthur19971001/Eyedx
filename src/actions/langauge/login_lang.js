import axios from 'axios'
import React from 'react'
import { ACTION_TYPES } from '../actionType'
import { loginLangUrl } from '../api'

export const GetLoginLang = (param) => dispatch => {

    axios.get(loginLangUrl,{params: param}).then(
        res => {
            dispatch({
                type: ACTION_TYPES.FETCH_LOGIN_LENG,
                payload: res.data,
            })
        }
    ).catch(e => {
        console.log(e);
        // if(e.response.status === 401) {
        //     dispatch({
        //         type: "NULL",
        //         status: e.response.status,
        //     })
        // }
    });
}
