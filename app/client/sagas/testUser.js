import {call, put, takeEvery} from 'redux-saga/effects';
import fetch from "isomorphic-fetch";
import {store} from "../store";

// main Map saga generators
export default function* testSagas() {
  yield takeEvery("USER_ATTEMPT_LOGIN", attemptLogin);
}

function* attemptLogin(action){
  try{
    let payload = action.payload;
    yield call((action)=>{
      fetch('/login', {method:"POST", credentials: 'include', body:payload})
        .then((response)=>{
          if (response.status >= 400){
            console.log("ERROR");
            console.log(response);
            store.dispatch({type:"ERROR", error: response});
          }
          return response.json();
        })
        .then((json)=>{
          if (json.success){
            console.log(json.message);
          }
          else {
            store.dispatch({type:"ERROR", error: json});
          }
        });
    }, action);
  }
  catch(ex){
    yield put({type: "ERROR", error: ex});
  }
}
