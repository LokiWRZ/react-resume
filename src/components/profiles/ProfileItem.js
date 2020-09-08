//Developers' module information
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from '../../vaildation/is-empty';

export class ProfileItem extends Component {
  render() {
    // get props from parent component
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2"><img src={profile.user.avatar} alt="Avatar" className="rounded-circle"/></div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3> {profile.user.name}</h3>
            <p>{profile.status}</p>
            <p>{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
            <Link className="btn btn-info" to={`/profile/${profile.handle}`}>More</Link>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skills</h4>
            <ul className="list-group">
              {/* splict 0 to 4 degree in array */}
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li className="list-group-item" key={index}>
                  <i className="fa fa-check pr-1" />{skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);