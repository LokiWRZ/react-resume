import React, { Component } from 'react';
import isEmpty from '../../vaildation/is-empty';
import PropTypes from 'prop-types';

// Developers' avatars
class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto"><img src={profile.user.avatar} alt="" className="rounded-circle"/></div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>{profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                <a href={profile.website} target="_blank" className="text-white p-2">
                  <i className="fas fa-globe fa-2x" />
                </a>
                )}

                {isEmpty(profile.social && profile.social.wechat) ? null : (
                <a /* href={profile.social.wechat} */ target="_blank" className="text-white p-2">
                  <i className="fab fa-weixin fa-2x" />
                </a>
                )}

                {isEmpty(profile.social && profile.social.QQ) ? null : (
                <a /* href={profile.social.QQ} */ target="_blank" className="text-white p-2">
                  <i className="fab fa-qq fa-2x" />
                </a>
                )}

                {isEmpty(profile.social && profile.social.tengxunkt) ? null : (
                <a href={profile.social.tengxunkt} target="_blank" className="text-white p-2">
                  <i className="fab fa-youtube fa-2x" />
                </a>
                )}

                {isEmpty(profile.social && profile.social.wangyikt) ? null : (
                <a href={profile.social.wangyikt} target="_blank" className="text-white p-2">
                  <i className="fab fa-facebook fa-2x" />
                </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileHeader;