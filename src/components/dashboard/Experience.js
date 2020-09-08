import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profileActions';

//Personal Resume Component
class Experience extends Component {
  onDeleteClick = (id) => {
    this.props.deleteExperience(id)
  }
  render() {
    // require resume information from parent
    const experience = this.props.experience.map(exp => {
      return (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            {exp.from} to {exp.to === '' ? 'Now' : exp.to}
          </td>
          <td>
            <button
              onClick={() => { this.onDeleteClick(exp._id) }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      )
    })
    return (
      <div>
        {
          this.props.experience.length > 0 ?
            <div>
              <h4 className="mb-4">Personal Resume</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Year</th>
                    <th>Operation</th>
                  </tr>
                  {experience}
                </thead>
              </table>
            </div> : null
        }
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    //delete current resume
    deleteExperience: (id) => {
      dispatch(deleteExperience(id))
    }
  }
}
export default connect(null, mapDispatchToProps)(Experience)