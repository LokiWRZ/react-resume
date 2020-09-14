import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { getPosts } from '../../actions/postActions';
import Spinner from '../../common/Spinner';
import PostFeed from './PostFeed';
// comments list
export class Posts extends Component {
  componentDidMount() {
    // require content of like
    this.props.getPosts()
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    // if loading or post is null, display loading animation
    if(posts === null || loading) postContent = <Spinner />
    // loading content of comments
    else postContent = <PostFeed posts={posts} />
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/**display comment list */}
              <PostForm />
              {/**display like comment */}
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
    getPosts: () => {
      dispatch(getPosts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Posts)