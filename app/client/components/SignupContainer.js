import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// ----------------------------------------------------
const registerMessageStyle = {
	color: "red"
}

class SignupContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {redirect: false}
  }

	_onRegisterSubmit() {

		let username = this.refs["username"].value;
		let password = this.refs["password"].value;

		let payload = {username, password};

		try{
			fetch('/signup', {method:"POST", credentials: 'include', body:JSON.stringify(payload), headers: {"Content-Type": "application/json"}})
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

						console.log("success?");

						this.setState(state);
						this.props.dispatch({type:"USER_LOGIN", user: json.user});
	        }
	        else {
	          this.props.dispatch({type:"ERROR", error: json});
	        }
	      });
		}
		catch(ex){
			store.dispatch({type:"ERROR", error: ex});
		}
	}

	render() {
		let redirect = null;
		if (this.state.redirect){
			redirect = <Redirect to={"/profile/" + this.state.user.local.name} />
		}

		return(
      <div>
				{redirect}
				<h2>Register</h2>
				<input type="text" ref="username" placeholder="Username"/><br/>
				<input type="password" ref="password" placeholder="Password"/><br/>
				<input type="submit" value="Signup" onClick={()=>this._onRegisterSubmit()} /> <span style={registerMessageStyle}>{ this.state.registerMessage }</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
