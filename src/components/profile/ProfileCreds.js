import React, { Component } from 'react';

//Personal experience and Personal Education
class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          {exp.from} to {exp.to === '' ? 'Now' : exp.to}
        </p>
        <p>
          <strong>Role:</strong> {exp.title}
        </p>
        <p>
          {exp.location === '' ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === '' ? null : (
            <span>
              <strong>Role description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          {edu.from} to {edu.to === '' ? 'Now' : edu.to}
        </p>
        <p>
          <strong>Degree: </strong> {edu.degree}
        </p>
        <p>
          <strong>Major: </strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === '' ? null : (
            <span>
              <strong>Educational Performence: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Personal Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No information about personal experience</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Educational experience</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{}eduItems</ul>
          ) : (
            <p className="text-center">No information about educational experience</p>
          )}
        </div>
      </div>
    )
  }
}

export default ProfileCreds;