import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profileActions';

// Educational Component
class Education extends Component {
  //delete
  onDeleteClick = (id) => {
    this.props.deleteEducation(id)
  }
  render() {
    let education = this.props.education.map(exp => (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
        <td>{exp.from} to {exp.to === '' ? 'Now' :exp.to}</td>
        <td><button onClick={() => this.onDeleteClick(exp._id)} className="btn tbn-danger">Delete</button></td>
      </tr>
    ))
    return (
      <div>
        {
          this.props.education.length > 0 ?
            <div>
              <h4 className="mb-4">Educational Experience</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Year</th>
                    <th>Operation</th>
                  </tr>
                  {education}
                </thead>
              </table>
            </div>
            : null
        }
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    //delete current educational experience
    deleteEducation: (id) => {
      dispatch(deleteEducation(id))
    }
  }
}
export default connect(null, mapDispatchToProps)(Education);