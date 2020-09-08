import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux'
import PrivateRoute from './common/PrivateRoute'
import store from './store';
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { setCurrentUser, logoutUser } from './actions/authActions'
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
// 防止页面刷新数据丢失
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  // 解析token
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  // 判断token是否过期
  // 获取当前时间
  const currentTime = Date.now() / 1000
  // 当前时间大于过期时间
  if (currentTime > decoded.exp) {
    // 过期
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }

}
export class App extends Component {
  render () {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
          <Footer />
        </Router>
      </div >
    );
  }
}
// 获取reduce中在actions定义的initalStaten属性值
const mapStateToProps = (state) => ({
  auth: state.auth,
})
// dispatch 方法
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
