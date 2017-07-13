import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

// Home page component
class Home extends React.Component {

  logout(){
    this.props.dispatch({type:"USER_LOGOUT"});
  }

  // render
  render() {

    let userDiv = null;
    if (this.props.user.id){
      userDiv = (
        <div className="flex-row" style={{"alignItems": "stretch", "justifyContent":"center"}>
          <Link to="/profile">{this.props.user.displayName}</Link>|
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" onClick={()=>this.logout()}>Logout</button>
        </div>
      )
    }
    else {
      userDiv = (
        <div className="flex-row" style={{"alignItems": "stretch", "justifyContent":"center"}>
          <Link to="/login">Login</Link>|
          <Link to="/signup">Signup</Link>
        </div>
      )
    }

    return (
      <div className="center-pg flex-row" style={{"alignItems": "center", "justifyContent":"center"}}>
        <h4 style={{"flex": "100%"}}>Welcome to Salr!</h4>
        {userDiv}
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
