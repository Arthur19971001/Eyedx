import { ACTION_TYPES } from "../actions/actionType";

const initialState = {
    loginRes: {},
}

export const LoginReducer = (state = initialState, {type, payload}) => {
    console.log(payload);

    switch (type) {
        case ACTION_TYPES.FETCH_LOGIN:
            return {...state, loginRes:payload}
        default:
            return state        
    }
}