import { combineReducers } from "redux";
import user  from "./user/reducer"
import groupReducer from "./groups/reducer"

export default combineReducers({
    user,
    groupReducer,
})