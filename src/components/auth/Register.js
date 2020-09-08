import React, { Component } from 'react';
// define the type transferred by reduce
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from '../../common/TextFieldGroup';

//import classnames from 'classnames'
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: "",
      errors: {}
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }
    this.props.registerUser(newUser, this.props.history)
  }
  //render page
  componentDidMount() {
    //if auth, jump to control page
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }
  render() {
    const {errors } = this.state;
    return(
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">Create New Account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="username"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  errpr={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="email address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="We use 'gravatar' global avatars, if need avator showed, please use the email registered in gravatar "
                />
                <TextFieldGroup
                  type="password"
                  placeholder="pwd"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="cf pwd"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
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
  errors: state.errors
})
//dispatch function
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (params, history) => {
      dispatch(registerUser(params,history))
    }
  }
}
//Define the type transferred by reduce
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))