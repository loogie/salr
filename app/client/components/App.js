import React from "react";
import {connect} from "react-redux";
import fetch from "isomorphic-fetch";
import "../stylesheets/main.scss";

// app component
class App extends React.Component {

  componentWillMount(){
    try{
      console.log("CHECKING FOR SESSION USER");
			fetch('/session', {method:"POST", credentials: 'include'})
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
            console.log("SESSION USER FOUND");
						this.props.dispatch({type:"USER_LOGIN", user: json.user});
	        }
          else {
            console.log("SESSION USER NOT FOUND");
          }
	      });
		}
		catch(ex){
			this.props.dispatch({type:"ERROR", error: ex});
		}
  }

  // render
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

export default connect()(App);
