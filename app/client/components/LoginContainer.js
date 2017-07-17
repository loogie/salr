import React from 'react';
import {connect} from 'react-redux';

// ----------------------------------------------------
const loginMessageStyle = {
	color: "red"
}

class LoginContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {loginMessage: ""};
  }

	_onLoginSubmit(event) {
		event.preventDefault()
		let username = this.refs["username"].value;
		let password = this.refs["password"].value;

		let payload = {username, password};

		console.log("FUFFLE");
    this.props.dispatch({type: "USER_ATTEMPT_SIGNUP", payload});
	}

	render() {
		return(
			<div>
				<h2>Log in</h2>
				<form onSubmit={(e)=>this._onLoginSubmit(e)}>
					<input type="text" ref="username" placeholder="Username"/><br/>
					<input ref="password" type="password" placeholder="Password" /><br/>
					<input type="submit" value="Login" /> <span style={loginMessageStyle}>{ this.state.loginMessage }</span>
				</form>
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

export default connect()(LoginContainer);
