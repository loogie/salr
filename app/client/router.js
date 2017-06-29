import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <App>
      <Route exact={true} component={Home} />
      <Route path="/404" component={NotFound}/>
    </App>
  </Router>
);

// export
export { router };
