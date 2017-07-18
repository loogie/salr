import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

// ----------------------------------------------------
const loginMessageStyle = {
	color: "red"
}

class LoginContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {redirect: false, loginMessage: ""};
  }

	_onLoginSubmit(event) {
		event.preventDefault()
		let username = this.refs["username"].value;
		let password = this.refs["password"].value;

		let payload = {username, password};

		try{
			fetch('/login', {method:"POST", credentials: 'include', body:JSON.stringify(payload), headers: {"Content-Type": "application/json"}})
	      .then((response)=>{
	        if (response.status >= 400){
	          console.log("ERROR");
	          console.log(response);
	          this.props.dispatch({type:"ERROR", error: response});
	        }
	        return response.json();
	      })
	      .then((json)=>{
	        if (json.success){
						let state = this.state;
						state.user = json.user;
						state.redirect = true;

						this.setState(state);
						this.props.dispatch({type:"USER_LOGIN", user: json.user});
	        }
	        else {
	          this.props.dispatch({type:"ERROR", error: json});
	        }
	      });
		}
		catch(ex){
			this.props.dispatch({type:"ERROR", error: ex});
		}
	}

	render() {

		let redirect = null;
		if (this.state.redirect){
			console.log("REDIRECT");
			redirect = <Redirect to={"/profile/" + this.state.user.local.name} />
		}

		return(
			<div>
				{redirect}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
