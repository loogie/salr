import React from "react";
import fetch from "isomorphic-fetch";
import { Link } from "react-router-dom"

export default class UserTab extends React.Component{
  constructor(props){
    super(props);
  }

  logout(){
    try{
			fetch('/logout', {method:"POST", credentials: 'include'})
	      .then((response)=>{
	        if (response.status >= 400){
	          console.log("ERROR");
	          console.log(response);
	          this.props.dispatch({type:"ERROR", error: response});
	        }
	        return response.json();
	      })
	      .then((json)=>{
	        this.props.dispatch({type:"ERROR", error: json});
	      });
		}
		catch(ex){
			this.props.dispatch({type:"ERROR", error: ex});
		}
  }

  render(){
    return (
      <div className="flex-row">
        <Link to={"/profile" + this.props.user.local.name}>{this.props.user.displayName}</Link>&nbsp;|&nbsp;
        <a href="/logout" onClick={()=>this.logout()}>Logout</a>
      </div>
    )
  }
}
