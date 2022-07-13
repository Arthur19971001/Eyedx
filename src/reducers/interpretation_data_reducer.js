import { ACTION_TYPES } from "../actions/actionType";

const initialState = {
    interpretationData: {},
    interpretationRes:{},
    imageQualityRes:{}
}

export const InterpretationDataReducer = (state = initialState, {type, payload}) => {
    console.log(payload);

    switch (type) {
        case ACTION_TYPES.FETCH_INTERPRETATION_DATA:
            return {...state, interpretationData:payload}
        case ACTION_TYPES.SEND_INTERPRETATION_DATA:
            return {...state, interpretationRes:payload}
        case ACTION_TYPES.SEND_IMG_QUALITY_DATA:
            return {...state, imageQualityRes:payload}        
        default:
            return state        
    }
}