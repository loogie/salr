import React from "react";
import {Link} from "react-router-dom";

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <h4>Hello world!</h4>
        <Link to="/404">About</Link>
      </div>
    );
  }
}
