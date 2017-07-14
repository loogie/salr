import React from "react";
import {connect} from "react-redux";
import {Route, Link} from "react-router-dom";
import fetch from "isomorphic-fetch";
import EditProfile from "./EditProfile";

// Home page component
class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {inProgress:false, user:{}}
  }

  componentWillMount(){
    let state = this.state;

    if (!state.inProgress){
      let users = [];

      state.inProgress = true;
      fetch('/api/get/users/displayName/' + this.props.displayName, {method:"POST", credentials: 'include'})
        .then((response)=>{
          if (response.status >= 400){
            console.log("ERROR");
            console.log(response);
            store.dispatch({type:"ERROR", error: response, from: action.type});
          }
          return response.json();
        })
        .then((json)=>{
          if (json.user){
            state.user = json.user;
          }
          else if (json.error){
            console.log(json.error);
          }
          state.inProgress = false;
          this.setState(state);
        });

      this.setState(state);
    }
  }

  // render
  render() {
    let editable = false;
    if (this.props.user.id == this.state.user.id){
      editable = true;
    }

    console.log("EDITABLE " + editable);

    let profile = null;
    if (this.state.user){
      if (!editable){
        profile = (
          <h4>Profile: {this.state.user.displayName}</h4>
        )
      }
      else {
        profile = (<EditProfile user={this.state.user} />);
      }
    }



    return (
      <div className="center-pg pg-limit-lg flex-col">
        {profile}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
