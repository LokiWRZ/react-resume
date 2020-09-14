import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

export class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    // clear user's info
    this.props.clearCurrentProfile();
    this.props.LogoutUser();
    window.location.href = "/login"
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    // auth status
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Comment
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <span className="nav-link" onClick={this.onLogoutClick}>
            <img style={{ width:'25px', marginRight: '5px' }} className="rounded-circle" src={user.avatar} alt={user.name}/>Exit
          </span>
        </li>
      </ul>
    )
    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            login
          </Link>
        </li>
      </ul>
    )
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              My Front-end
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    Developers
                  </Link>
                </li>
              </ul>

              {isAuthenticated ? authLinks : guestLink}
            </div>
          </div>
        </nav>
      </div> 
    )
  }
}
//// Get the property value of initalState which have defined in actions in reduce
const mapStateToProps = (state) => ({
  auth: state.auth,

})
// dispatch function
const mapDispatchToProps = (dispatch) => {
  return {
    LogoutUser: () => {
      dispatch(logoutUser())
    },
    clearCurrentProfile: () => {
      dispatch(clearCurrentProfile())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);