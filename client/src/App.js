import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import router from './router';

// aviod lose data when refresh pages
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  // decode JWToken
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  // Judge whether the token has expired
  // get current time
  const currentTime = Date.now() / 1000
  // Current Time bigger than the expired time
  if(currentTime > decoded.exp) {
    // expire
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } 
}

export class App extends Component {
  render() {
    let { isAuthenticated } = this.props.auth
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            {
              router.map((item, i) => {
                return <Route exact={item.exact} path={item.path} key={i} render={(props) => {
                  // in login status
                  if(isAuthenticated) {
                    return <item.componentName {...props} routes={item.children} />
                  }
                  // unAuth page
                  if(!item.auth) {
                    return <item.componentName {...props} routes={item.children} />
                  }
                  // unlogin && page auth jump to login page
                  return <Redirect to='/login' />
                }} />
              })
            }
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

// get the initalState value frin action in reduce
const mapStateToProps = (state) => ({
  auth: state.auth,
})

// dispatch function
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)