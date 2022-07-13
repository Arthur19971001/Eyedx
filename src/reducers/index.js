import { combineReducers } from "redux";
import {LangReducer} from "./lang_reducers";
import {LoginReducer} from "./login_reducer";
import {WaitingDataReducer} from "./waiting_data_reducer";
import {InterpretationDataReducer} from "./interpretation_data_reducer";
import {LoaderReducer} from "./loader_reducer";
import {HeaderColorDataReducer} from "./header_color_reducer";

export const reducers = combineReducers({
    LangReducer,
    LoginReducer,
    WaitingDataReducer,
    InterpretationDataReducer,
    LoaderReducer,
    HeaderColorDataReducer,
});