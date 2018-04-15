import { combineReducers } from "redux";
import { persistentReducer } from "redux-pouchdb";
import habitReducer from "./Habit/habitReducer";

export default combineReducers({
  habitReducer: persistentReducer(habitReducer, "habitReducer")
});
