import React, { Component } from 'react';
import CommentItem from './CommentItem';
// content of comments
export default class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    // generate multi module of comments based on number of comments
    return comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId} />)
  }
}