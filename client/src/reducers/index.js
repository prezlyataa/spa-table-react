import {  combineReducers } from "redux";
import { reducer as form } from "redux-form";
import employees from "./employees";

const rootReducer = combineReducers({
    form,
    employees,
});

export default rootReducer;