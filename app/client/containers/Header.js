import React from "react";
import {connect} from "react-redux";
import UserTab from "../components/usertab";

class Header extends React.Component{

  render(){
    let userTab = null;
    if (this.props.user.id){
      userTab = <UserTab user={this.props.user} />
    }
    return (
      <div className="flex-row">
        <div style={{"flex":"100%"}}><h3>Salr</h3></div>
        {userTab}
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
