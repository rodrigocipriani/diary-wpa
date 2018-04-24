import { combineReducers } from "redux";
// import { persistentReducer } from "redux-pouchdb";
import { persistentReducer } from "redux-pouchdb-plus";
import habitReducer from "./Habit/habitReducer";

export default combineReducers({
  // habitReducer: persistentReducer(habitReducer, "habitReducer")
  habitReducer: persistentReducer(habitReducer, { name: "habitReducer" })
});
