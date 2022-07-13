import axios from 'axios'
import React from 'react'
import { ACTION_TYPES } from '../actionType'
import { waitingListUrl } from '../api'

export const GetWaitingData = (param,auth) => dispatch => {
    let filterValue = JSON.stringify(param);
    localStorage.setItem("filter-value",filterValue);

    dispatch({
        type: ACTION_TYPES.DATA_LOADING,
        payload: true
    })

    dispatch({
        type: ACTION_TYPES.HEADER_COLOR,
        payload: [true,false]
    })

    axios.get(waitingListUrl,{params: param, headers: {
        'Authorization': auth, 
      }}).then(
        res => {
            dispatch({
                type: ACTION_TYPES.FETCH_WAITING_DATA,
                payload: res.data,
            });
            localStorage.setItem("first_code", res.data.Pagination.firstCode);
        }
    ).catch((e) => {
        console.log(e);
    }).then(r=>(
        dispatch({
            type: ACTION_TYPES.DATA_LOADING,
            payload: false
        })
    ))
}
