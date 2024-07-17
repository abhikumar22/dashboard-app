import app from "./AppReducer";
import application from "./ApplicationReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    appDetailsReducer: app,
    applicationReducer: application,

});
export default allReducers;