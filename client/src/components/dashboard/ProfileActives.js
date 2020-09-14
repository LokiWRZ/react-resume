import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActives = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" />Edit personal information
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add personal experience
      </Link>
      <Link to="/add-educatuib" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add educational experience
      </Link>
    </div>
  );
};

export default ProfileActives;