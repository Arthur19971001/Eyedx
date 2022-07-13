import { ACTION_TYPES } from "../actions/actionType";

const initialState = {
    waitingData: {},
}

export const WaitingDataReducer = (state = initialState, {type, payload}) => {
    console.log(payload);

    switch (type) {
        case ACTION_TYPES.FETCH_WAITING_DATA:
            return {...state, waitingData:payload}
        default:
            return state        
    }
}