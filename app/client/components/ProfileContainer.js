import React from 'react';
import {connect} from 'react-redux';

// ----------------------------------------------------
const loginMessageStyle = {
	color: "red"
}

class ProfileContainer extends React.Component{
  constructor(props){
    super(props);
  }

	render() {
		return(
      <div>
				<h2>{this.props.match.params.username}</h2>
				<p>You're seeing this page because you logged in successfully! Try logging out, clicking the MyProfile link and then completing the login. You wil notice that it redirects you to MyProfile page :)</p>
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

export default connect()(ProfileContainer);
