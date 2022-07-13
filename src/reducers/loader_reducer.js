import { ACTION_TYPES } from "../actions/actionType"

const initialState = {
    isDataLoading: true
}

export const LoaderReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case ACTION_TYPES.DATA_LOADING:
            return { ...state, isDataLoading: payload }

        default:
            return state
        }
}
