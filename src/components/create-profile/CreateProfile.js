// Create personal info
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileActions';
// withRouter trapper the route jump in actions
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import InputGroup from '../../common/InputGroup';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false, // display content about add social account
    errors: {},
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    wechat: '',
    QQ: '',
    tengxunkt: '',
    wangyikt: '',
  }
  // function of life cycle
  UNSAFE_componentWillReceiveProps(nextProps) {
    // give the returned error to state before renew/render
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    // give the rest array to a varity
    let { displaySocialInputs, errors, ...profileData } =this.state
    //initiate the require
    this.props.createProfile(profileData, this.props.history)
  }
  onChange = (e) => {
    // require the content by each input, change status
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    let { errors, displaySocialInputs } = this.state;
    // Define content of add social account
    let socialInputs;
    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            placeholder="wechat public account"
            name="wechat"
            icon="fab fa-wexin"
            value={this.state.wechat}
            onChange={this.onChange}
            error={errors.wechat}
          />

          <InputGroup
            placeholder="QQ"
            name="QQ"
            icon="fab fa-qq"
            value={this.state.QQ}
            onChange={this.onChange}
            error={errors.QQ}
          />

          <InputGroup
            placeholder="Tengxun cloud course"
            name="tengxunkt"
            icon="fat fa-wechat"
            value={this.state.tengxunkt}
            onChange={this.onChange}
            error={errors.tengxunkt}
          />

          <InputGroup
            placeholder="Wangyi cloud course"
            name="wangyikt"
            icon="fab fa-wechat"
            value={this.state.wangyikt}
            onChange={this.onChange}
            error={errors.wangyikt}
          />
        </div>
      )
    }
    const options = [
      { label: "* pleace select your occupation", value: "* pleace select your occupation" },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'HighDeveloper', value: 'HighDeveloper' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Backend Developer', value: 'Backend Developer' },
      { label: 'Python machine learning', value: 'Python machine learning' },
      { label: 'Other', value: 'Other' }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create personal profile</h1>
              <p className="lead text-center">Please fill in your personal information, let me know more about you!</p>
              <small className="d-block pb-3">* mean must fill</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                 placeholder="* Profile Handle"
                 name="handle"
                 value={this.state.handle}
                 onChange={this.onChange}
                 error={errors.handle}
                 info="this handle will be used to check data in backend, usually is your email address"
                />
                
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Please tell us your current occupation"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Can be your own company or your employed company"
                />

                <TextFieldGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your own company's or your employed company's website address"
                />

                <TextFieldGroup
                  placeholder="Coordinate"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your curent city and suburban"
                />
                <TextFieldGroup
                  placeholder="* programming laanguage skills"
                  name="skills"
                  value="this.state.skills"
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use dash to gap your Language (HTML, CSS, JavaScript, React)"
                />
                <TextFieldGroup
                  placeholder="Github username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want to share your projects to public, you can fill your Github Username"
                />
                <TextAreaFieldGroup
                  placeholder="Self-introduction"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Introducing yourself"
                />
                <div className="mb-3">
                  <button 
                  className="btn btn-light"
                  type="button"
                  onClick={() => {
                    //prevState 
                    // this.setState({ displaySocialInputs: !this.state.displaySocialInputs })
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState,displaySocialInputs
                    }));
                  }}
                  >
                    Add Social Account
                  </button>
                  <span className="text-muted">Options</span>
                </div>
                {socialInputs}
                <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps =(dispatch) => {
  return {
    createProfile: (params, history) => {
      dispatch(createProfile(params, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile));