import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Default extends React.Component{
  constructor(props){
    super(props);

    this.state = {redirect:false};
  }

  logout(){

    try{
			fetch('/logout', {method:"GET", credentials: 'include'})
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
						this.props.dispatch({type:"USER_LOGOUT"});
	        }
	        else {
	          this.props.dispatch({type:"ERROR", error: json});
	        }
	      });
		}
		catch(ex){
			this.props.dispatch({type:"ERROR", error: ex});
		}

    let state = this.state;
    state.redirect = true;

    this.setState(state);
  }

  render(){
    let redirect = null;
    if (this.state.redirect){
      redirect = <Redirect to="/" />
    }
    return(
			<div>
        {redirect}
				<h2>React-Passport-Redux-Example</h2>
        <button onClick={()=>this.logout()}>Logout</button>
      </div>
		)
  }
}

export default connect()(Default);
