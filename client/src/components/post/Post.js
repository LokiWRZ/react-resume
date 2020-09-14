import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/postActions';
import Spinner from '../../common/Spinner';
import CommentFeed from './CommentFeed';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';

// Encouraging comments
export class Post extends Component {
  componentDidMount() {
    // get users' information of encouraging comments, and get user Id by dynamic route
    this.props.getPost(this.props.match.params.id) 
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if(post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          {/**render userinof component */}
          <PostItem post={post} showActions={false} />
          {/**fill comment form */}
          <CommentForm postId={post._id} />
          {/**Multi users leave comment to comment, Component */}
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      )
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link className="btn btn-light mb-3">
                Return
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
})

const mapDispatchToProps = dispatch => {
  return {
    getPost: (id) => {
      dispatch(getPost(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)