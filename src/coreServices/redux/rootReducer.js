import { combineReducers } from "redux";
import loggedInUserReducer from "../../components/Login/services/redux/loggedInUserReducer";

export const rootReducer = combineReducers({
  loggedInUser: loggedInUserReducer,
});
