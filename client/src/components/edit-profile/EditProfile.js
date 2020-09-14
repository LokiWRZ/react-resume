import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextAreaFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import InputGroup from '../../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../vaildation/is-empty';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
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
    errors: {}
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onSubmit = (e) => {
    e.preventDefault();
    let { displaySocialInputs, errors, ...profileData } = this.state
    this.props.createProfile(profileData, this.props.history);
  }

  // life cycle function
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
    
    if(nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      profile.company = !isEmpty(profile.company) ? profile.company: '';
      profile.website = !isEmpty(profile.website) ? profile.website: '';
      profile.location = !isEmpty(profile.location) ? profile.location: '';
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.wechat = !isEmpty(profile.social.wechat) ? profile.social.wechat : '';
      profile.QQ = !isEmpty(profile.social.QQ) ? profile.social.QQ : '';
      profile.tengxunkt = !isEmpty(profile.social.tengxunkt) ? profile.social.tengxunkt : '';
      profile.wangyikt = !isEmpty(profile.social.wangyikt) ? profile.social.wangyikt : '';

      const skillsCSV = profile.skills.join(",");
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        wechat: profile.wechat,
        QQ: profile.QQ,
        tengxunkt: profile.tengxunkt,
        wangyikt: profile.wangyikt
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="wechat public account"
            name="wechat"
            icon="fab fa-weixin"
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
            placeholder="Tengxun online course"
            name="tengxunkt"
            icon="fab fa-wechat"
            value={this.state.tengxunkt}
            onChange={this.onChange}
            error={errors.tengxunkt}
          />

          <InputGroup
            placeholder="Wnagyi online course"
            name="wangyikt"
            icon="fab fab-wangyi"
            value={this.state.wangyikt}
            onChange={this.onChange}
            error={errors.wangyikt}
          />
        </div>
      );
    }
    const options = [
      { label: "* please your occupation", value: "* please your occupation" },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'HighDeveloper', value: 'HighDeveloper' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Backend Developer', value: 'Backend Developer' },
      { label: 'python machine learning', value: 'Python machine learning' },
      { label: 'Other', value: 'Other' }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit personal profile</h1>

              <small className="d-block pb-3">* measn must fill</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="this handle is used to check data in backend interface, usually fill your email"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Please tell us your occupation"
                />

                <TextFieldGroup
                  placeholder="company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Your own company or your employed company"
                />
                <TextFieldGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your own company's website or your employed company's website"
                />
                <TextFieldGroup
                  placeholder="coordinary"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your current city or suburban"
                />
                <TextFieldGroup
                  placeholder="* programming skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please dash to gap your language (E.G: HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want to share your project to public, you can fill your Github Username"
                />
                <TextAreaFieldGroup
                  placeholder="Self-introduction"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Please yourself"
                />

                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add social account
                  </button>
                  <span className="text-muted">Options</span>
                </div>
                {socialInputs}
                <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />

              </form>

            </div>
          </div>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (params, history) => {
      dispatch(createProfile(params, history))
    },
    getCurrentProfile: () => {
      dispatch(getCurrentProfile())
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile));