import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

// Home page component
class Home extends React.Component {

  constructor(props){
    super(props);

    let sessionUser = document.getElementById("sessionUser");
    if (sessionUser)
    {
      this.props.dispatch({type:"USER_SESSION", userid: sessionUser.value});
    }
  }

  logout(){
    this.props.dispatch({type:"USER_CLEAR"});
    //this.props.dispatch({type:"USER_LOGOUT"});
  }

  //<a href="" onClick={()=>this.logout()}>Sign&nbsp;Out</a>

  // render
  render() {

    let userDiv = null;
    if (this.props.user.id){
      userDiv = (
        <div className="flex-row" style={{"alignItems": "stretch", "justifyContent":"center"}}>
          <Link to="/profile">{this.props.user.displayName}</Link>&nbsp;|&nbsp;
          <Link to="/logout" onClick={()=>this.logout()}>Sign&nbsp;Out</Link>
        </div>
      )
    }
    else {
      userDiv = (
        <div className="flex-row" style={{"alignItems": "stretch", "justifyContent":"center"}}>
          <Link to="/login">Login</Link>&nbsp;|&nbsp;
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
