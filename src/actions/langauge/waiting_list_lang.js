import axios from 'axios'
import React from 'react'
import { ACTION_TYPES } from '../actionType'
import { waitingListLangUrl } from '../api'

export const GetWaitingListLang = (param) => dispatch => {
    axios.get(waitingListLangUrl,{params: param}).then(
        res => {
            dispatch({
                type: ACTION_TYPES.FETCH_WAITING_LIST_LENG,
                payload: res.data,
            })
        }
    ).catch((e) => {
        console.log(e);
    });
}
