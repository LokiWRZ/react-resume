import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(newUser)
    }

    //page render
    componentDidMount () {
        // If auth, jump to control page
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }
    //If have error reminder when receive new data, assign value
    UNSAFE_componentWillReceiveProps (nextProps) {
        //isAuth?
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        } else {
            console.log('Not Login');
        }
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    render() {
        const { errors } = this.props;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">login</h1>
                            <p className="lead text-center">Have a existing account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    placeholder="email address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="pwd"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
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
    errors: state.errors,
    auth: state.auth,
})
//dispatch function
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (params) => {
            dispatch(loginUser(params))
        }
    }
}
// define the type transferred by reduce
Login.propTypes = {
        errors: PropTypes.object.isRequired,
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)