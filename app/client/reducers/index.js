import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./user";
import errorReducer from './error';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  user: userReducer,
  error: errorReducer
});
