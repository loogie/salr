import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

// Home page component
class Home extends React.Component {
  // render
  render() {
    return (
      <div className="center-pg flex-row" style={{"align-items": "center", "justify-content":"center"}}>
        <h4 style={{"flex": "100%"}}>Welcome to Salr!</h4>
        <Link to="/login">Login</Link>|
        <Link to="/signup">Signup</Link>
      </div>
    );
  }
}

export default connect()(Home);
