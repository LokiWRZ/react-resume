import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, ROute, Link } from 'react-router-dom';
import classnames from 'classnames';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

// Like Component
export class PostItem extends Component {
  state = {
    errors: {}
  }
  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  // delete comments
  onDeleteClick = (id) => {
    this.props.deletePost(id)
  }
  // like
  onLikeClick(id) {
    this.props.addLike(id)
  }
  // Like pattern
  findUserLike = (likes) => {
    const { auth } = this.props
    // match user's id whether have like
    if(likes.filter(like => like.user === auth.user.id).length > 0) return true
    else return false
  }
  // Cancel like
  onUnlikeClick(id) {
    this.props.removeLike(id)
  }
  render() {
    //get params from parent component
    const { post, auth, showActions } = this.props
    return (
      <div className="card card-body mb3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img src={post.avatar} alt="" className="rounded-circle d-nonse d-md-block"/>
            </a>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.name}</p>
            {
              showActions ? (
                <span>
                  <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className={classnames("fas fa-thumbs-up", {
                      'text-info': this.findUserLike(post.likes)
                    })}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn but-info mr-1">
                    Encouraging comments
                  </Link>
                  {
                    // judge whether the Login Id is same as the comment Id, if same, can delete it
                    post.user === auth.user.id ? (
                      <button 
                      onClick={() => this.onDeleteClick(post._id)}
                      type="button"
                      className="btn btn-danger mr-1">
                        Delete
                      </button>
                    ) : null
                  }
                </span>
              ) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = dispatch => {
  return {
    deletePost: (id) => {
      dispatch(deletePost(id))
    },
    addLike: (id) => {
      dispatch(addLike(id))
    },
    removeLike: (id) => {
      dispatch(removeLike(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);