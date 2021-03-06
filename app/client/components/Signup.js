import React from "react";
import {connect} from "react-redux";
import {Redirect, Link} from "react-router-dom";

// Home page component
class Signup extends React.Component {
  constructor(props){
    super(props);

    this.state = {username:"", pass: ""};
  }

  onChange(prop, value) {
    let state = this.state;
    state[prop] = value;

    this.setState(state);
  }

  onSubmit(){
    this.props.dispatch({type:"USER_SIGNUP", user: this.state});
  }

  // render
  render() {
    let userRedirect = null;
    if (this.props.user.id){
      userRedirect = (<Redirect to="/" />)
    }

    return (
      <div className="center-pg pg-limit-lg flex-col">
        <h4>Create New User</h4>
        {userRedirect}
        <div className="mdl-textfield mdl-js-textfield fill">
          <input className="mdl-textfield__input" type="text" id="txtName" onChange={(e)=>this.onChange('username', e.target.value)} value={this.state.username} />
          <label className="mdl-textfield__label" htmlFor="txtName">Username...</label>
        </div>
        <div className="mdl-textfield mdl-js-textfield fill">
          <input className="mdl-textfield__input" type="password" id="txtPass" onChange={(e)=>this.onChange('pass', e.target.value)} value={this.state.pass} />
          <label className="mdl-textfield__label" htmlFor="txtPass">Password...</label>
        </div>
        <div className="flex-row-rev">
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" onClick={()=>this.onSubmit()}>
            Submit
          </button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
