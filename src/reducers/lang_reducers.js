import { ACTION_TYPES } from "../actions/actionType";

const initialState = {
    loginLang : {},
    waitingListLang: {},
}

export const LangReducer = (state = initialState, {type, payload}) => {
    console.log(payload);

    switch (type) {
        case ACTION_TYPES.FETCH_LOGIN_LENG:
            return {...state, loginLang:payload}
        case ACTION_TYPES.FETCH_WAITING_LIST_LENG:
            return {...state, waitingListLang:payload}
        default:
            return state        
    }
}