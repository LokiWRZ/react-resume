import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';
// comment component
export class CommentItem extends Component {
  onDeleteClick (postId, commentId) {
    this.props.deleteComment(postId, commentId)

  }
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img src={comment.avatar} alt="" className="rounded-circle d-nonse d-md-block"/>
            </a>
            <br/>
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {
              // judge whether login user is the same as comment user, if same, display delete button
              comment.user === auth.user.id ? (
                <button type="button" onClick={this.onDeleteClick.bind(this, postId, comment._id)} className="btn btn-danger mr-1">
                  Delete
                </button>
              ) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (postId, commentId) => {
      dispatch(deleteComment(postId, commentId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);