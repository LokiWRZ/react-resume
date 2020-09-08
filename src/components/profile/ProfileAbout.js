import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../vaildation/is-empty';

// Developer information
class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    // require name
    const name = profile.user.name.trim().split(' ')[0];
    // personal skill
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{name}'s Sefl-Introduction</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{name} No Introduction Information</span>
              ) : (
              <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Personal skills</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-itmes-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;