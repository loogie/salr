import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Profile from "./Profile";

// Home page component
class Profiles extends React.Component {
  constructor(props){
    super(props);
  }

  // render
  render() {
    let userProfile = null;
    if (this.props.match.params.displayName){
      userProfile = (<Profile displayName={this.props.match.params.displayName} />);
    }

    return (
      <div className="center-pg pg-limit-lg flex-col">
        <h4>Profiles</h4>
        {userProfile}
      </div>
    );
  }
}

export default connect()(Profiles);
