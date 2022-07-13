import axios from 'axios'
import React from 'react'
import { ACTION_TYPES } from '../actionType'
import { interpreationUrl,info,send,vote } from '../api'
import { withCookies, Cookies } from "react-cookie";

export const GetInterpretationData = (userId,param,auth) => dispatch => {
    dispatch({
        type: ACTION_TYPES.DATA_LOADING,
        payload: true
    })
    dispatch({
        type: ACTION_TYPES.HEADER_COLOR,
        payload: [false,true]
    })

    axios.get(interpreationUrl+userId+info,{params: param,headers: {'Authorization': auth,}}).then(
        res => {
            dispatch({
                type: ACTION_TYPES.FETCH_INTERPRETATION_DATA,
                payload: res.data,
            })
        }
    ).catch((e) => {
        console.log(e);
    }).then(r => (
        dispatch({
            type: ACTION_TYPES.DATA_LOADING,
            payload: false
        })
    ));
}

export const SendInterpretationData = (userId,body,auth,onSuccessful) => dispatch => {
    var filterValue = JSON.parse(localStorage.getItem("filter-value"));
    dispatch({
        type: ACTION_TYPES.DATA_LOADING,
        payload: true
    })

    axios.post(interpreationUrl+userId+send,body,{params: filterValue,headers: {'Authorization': auth,}}).then(
        res => {
            dispatch({
                type: ACTION_TYPES.SEND_INTERPRETATION_DATA,
                payload: res.data,
            })
            onSuccessful(res.data.ID);
        }
    ).catch((e) => {
        console.log(e);
    }).then(r => (
        dispatch({
            type: ACTION_TYPES.DATA_LOADING,
            payload: false
        })
    ))
}

export const SendImageQulityData = (userId,params,auth,nextRequest) => dispatch => {
    dispatch({
        type: ACTION_TYPES.DATA_LOADING,
        payload: true
    })

    axios.get(interpreationUrl+userId+vote,{params: params,headers: {'Authorization': auth,}}).then(
        res => {
            dispatch({
                type: ACTION_TYPES.SEND_INTERPRETATION_DATA,
                payload: res.data,
            })

            nextRequest(res.data.result);
        }
    ).catch((e) => {
        console.log(e);
    }).then(r => (
        dispatch({
            type: ACTION_TYPES.DATA_LOADING,
            payload: false
        })
    ))
}
