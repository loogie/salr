import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";

// build the router
const router = (
  <Router history={history}>
    <App>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </App>
  </Router>
);

// export
export { router };
