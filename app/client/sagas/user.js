import {call, put, takeEvery} from 'redux-saga/effects';
import fetch from "isomorphic-fetch";
import {store} from "../store";

// main Map saga generators
export default function* userSagas() {
  yield takeEvery("USER_LOGIN", attemptLogin);
  yield takeEvery("USER_SIGNUP", attemptSignup);
  yield takeEvery("USER_LOGOUT", logout);
}

function* attemptSignup(action){
  try{
    yield call(signup, action);
  }
  catch(ex){
    yield put({type: "ERROR", error: ex, from: action.type});
  }
}

function* attemptLogin(action){
  try{
    yield call(login, action);
  }
  catch(ex){
    yield put({type: "ERROR", error: ex, from: action.type});
  }
}

function* logout(action){
  try{
    yield call((action)=>{
      console.log("LOGOUT");
      fetch('/api/logout', {method:"POST"});
      store.dispatch({type:"USER_CLEAR"})
    }, action);
  }
  catch(ex){
    yield put({type: "ERROR", error: ex, from: action.type});
  }
}

function signup(action){
  let payload = JSON.stringify(action.user);
  console.log("POSTING PAYLOAD");
  console.log(payload);

  fetch('/api/signup', {method:"POST", body:payload, headers: {"Content-Type": "application/json"}})
    .then((response)=>{
      if (response.status >= 400){
        console.log("ERROR");
        console.log(response);
        store.dispatch({type:"ERROR", error: response, from: action.type});
      }
      return response.json();
    })
    .then((json)=>{
      if (json.user){
        store.dispatch({type:"USER_CONN", user:json.user});
      }
      else if (json.error){
        store.dispatch({type:"ERROR", error: json.error, from: action.type});
      }
    });
}

function login(action){
  let payload = JSON.stringify(action.user);
  console.log("POSTING PAYLOAD");
  console.log(payload);

  fetch('/api/auth/local', {method:"POST", body:payload, headers: {"Content-Type": "application/json"}})
    .then((response)=>{
      if (response.status >= 400){
        console.log("ERROR");
        console.log(response);
        store.dispatch({type:"ERROR", error: response, from: action.type});
      }
      return response.json();
    })
    .then((json)=>{
      if (json.user){
        store.dispatch({type:"USER_CONN", user:json.user});
      }
      else if (json.error){
        store.dispatch({type:"ERROR", error: json.error, from: action.type});
      }
    });
}
