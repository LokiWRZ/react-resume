import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import InputGroup from '../../common/InputGroup';
import { createProfile } from '../../actions/profileActions';
class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      wechat: this.state.wechat,
      QQ: this.state.QQ,
      tengxunkt: this.state.tengxunkt,
      wangyikt: this.state.wangyikt,
    };

    // console.log(profileData);

    this.props.createProfile(profileData, this.props.history);

  }

  // 生命周期函数
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
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
            placeholder="tengxunkt"
            name="tengxunkt"
            icon="fab fa-wechat"
            value={this.state.tengxunkt}
            onChange={this.onChange}
            error={errors.tengxunkt}
          />

          <InputGroup
            placeholder="Wnagyikt"
            name="wangyikt"
            icon="fab fa-wechat"
            value={this.state.wangyikt}
            onChange={this.onChange}
            error={errors.wangyikt}
          />
        </div>
      );
    }

    const options = [
      { label: "* Please your occupation", value: "* Please your occupation" },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'HighDeveloper', value: 'HighDeveloper' },
      { label: 'Manager', value: 'Manager' },
      { label: 'backend Developer', value: 'backend Developer' },
      { label: 'python machine learning', value: 'Python machine learning' },
      { label: 'Other', value: 'other' }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create personal information</h1>
              <p className="lead text-center">Fill your personal document, let us know more about you!</p>
              <small className="d-block pb-3">* have to fill</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Here's handle is used to find data in backend interface, usually to write your email"
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
                  info="Can be your own or your company"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your own or your company's website"
                />
                <TextFieldGroup
                  placeholder="Coordinary"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your city or suburban"
                />
                <TextFieldGroup
                  placeholder="* programming language skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use dash to gap your owned language (e.g: HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want to share your project to public, you can fill your github username"
                />
                <TextAreaFieldGroup
                  placeholder="Self-introduction"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Introduce yourself"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));