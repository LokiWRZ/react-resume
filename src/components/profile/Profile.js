// Developer Module
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import { getProfileByHandle } from '../../actions/profileActions';
//Loading animation
import Spinner from '../../common/Spinner';

export class Profile extends Component {
  componentDidMount() {
    // Require dynamic params from Router
    if(this.props.match.params.handle) {
      // send requirement with params
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if(profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Return personal information
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          {/**Skills */}
          <ProfileAbout profile={profile} />
          {/**Education&Experience */}
          <ProfileCreds education={profile.education} experience={profile.experience} />
          {
            profile.githubusername
              ? (<ProfileGithub username={profile.githubusername} />)
              : null
          }
        </div>
      )
    }
    return (
      <div>
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">{profileContent}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

const mapDispatchToProps = dispatch => {
  return {
    getProfileBuHnadle: (handle) => {
      dispatch(getProfileBuHandle(handle))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);