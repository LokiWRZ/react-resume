import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Landing extends Component {
  //render page
  componentDidMount() {
    //if auth, jump to control page
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  My Front-end
                </h1>
                <p className="lead">Focus on study, be serious! </p>
                <hr/>
                <Link to="/register" className="btn btn-lg btn-info mr-2">Register</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// Get the property value of initalState which have defined in actions in reduce
const mapStateToProps = (state) => ({
  auth: state.auth,
})
// dispatch function
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing);