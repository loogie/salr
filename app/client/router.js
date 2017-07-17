import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { history } from "./store.js";
import App from "./components/App";
import Default from "./components/Default";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";
import ProfileContainer from "./components/ProfileContainer";
//import Home from "./components/Home";
//import Login from "./components/Login";
//import Signup from "./components/Signup";
//import Profiles from "./components/Profiles";
//import NotFound from "./components/NotFound";

const requireAuth = (nextState, replace, callback) => {
  const { user: { authenticated } } = store.getState()
  if (!authenticated) {
    // Takes a Location object
    // https://github.com/mjackson/history/blob/master/docs/Location.md
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname }
    })
  }
  callback()
}

// build the router
const router = (

  <Router history={history}>
    <App>
      <Route path="/" component={Default} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignupContainer} />
			<Route path="/profile/:username" component={ProfileContainer} onEnter={requireAuth} />
    </App>
  </Router>
);

// export
export { router };
