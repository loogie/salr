import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store, history } from "./store.js";
import App from "./components/App";
import Default from "./components/Default";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";
import ProfileContainer from "./components/ProfileContainer";

import Header from "./containers/Header";

//import Home from "./components/Home";
//import Login from "./components/Login";
//import Signup from "./components/Signup";
//import Profiles from "./components/Profiles";
//import NotFound from "./components/NotFound";

// build the router
const router = (

  <Router history={history}>
    <App>
      <Route path="/" component={Header} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignupContainer} />
			<Route path="/profile/:username" component={ProfileContainer} />
    </App>
  </Router>
);

// export
export { router };
