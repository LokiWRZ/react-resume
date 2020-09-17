import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccout } from '../../actions/profileActions';
//load animation
import Spinner from '../../common/Spinner';
import ProfileActives from './ProfileActives';
import Experience from './Experience';
import Education from './Education';
//Show users' info after login
export class Dashboard extends Component {
  componentDidMount() {
    //use dispatch to require data
    this.props.GetCurrentProfile()
  }
  //delete
  onDeleteClick = () => {
    this.props.deleteAccount()
  }
  render() {
    const { user } =this.props.auth;
    const { profile, loading } = this.props.profile
    let dashboardContent;
    // judge whether profile or loading is null
    if(profile == null || loading) {
      dashboardContent = <Spinner />
    } else {
      //user login successful and have data
      if(Object.keys(profile).length > 0) {
        dashboardContent = <div>
          <p className="lead text-muted">
            Welcome <Link to={`profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActives />

          {/* Educational Experience    Personal Resume */}
          <Experience Experience={profile.experoemce} />
          {/* Educational Experience */}
          <Education education={profile.education} />
          {/* Delete Account Button */}
          <div sytle={{ marginBottom: '60px' }} />
          <button onClick={this.onDeleteClick} className="btn btn-danger">
            Delete current account
          </button>
        </div>
      } else {
        //login with no data 
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>Without any personal information, please add personal information</p>
            <Link className="btn btn-lg btn-info" to="/create-profile">Create personal information</Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Home Page</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

const mapDispatchToProps = (dispatch) => {
  return {
    GetCurrentProfile: () => {
      dispatch(getCurrentProfile())
    },
    //delete account
    deleteAccout: () => {
      dispatch(deleteAccout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)