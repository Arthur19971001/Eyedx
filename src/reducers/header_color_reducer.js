import { ACTION_TYPES } from "../actions/actionType";

const initialState = {
    headerColorData: [],
}

export const HeaderColorDataReducer = (state = initialState, {type, payload}) => {
    console.log(payload);

    switch (type) {
        case ACTION_TYPES.HEADER_COLOR:
            return {...state, headerColorData:payload}
        default:
            return state        
    }
}