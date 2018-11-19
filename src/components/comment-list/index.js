import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CSSTransition from 'react-addons-css-transition-group';
import Comment from '../comment/';
import CommentForm from '../comment-form';
import toggleOpen from '../../decorators/toggleOpen';
import { loadArticleComments } from '../../ac';
import Loader from '../common/loader';
import './style.css';

class CommentList extends Component {

  static propTypes = {
    article: PropTypes.object,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  };

  render() {
      const { isOpen, toggleOpen } = this.props;
      const text = isOpen ? 'hide comments' : 'show comments';

      return (
          <div>
            <button onClick={toggleOpen} className="test__comment-list--btn btn ptn-primary mt-1 mb-1">
                {text}
            </button>
            <CSSTransition
                transitionName="comments"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {this.getBody()}
            </CSSTransition>
          </div>
      )
  };

  componentDidUpdate(oldProps) {
      const { isOpen, article, loadArticleComments } = this.props;
      if (
          isOpen &&
          !oldProps.isOpen &&
          !article.commentsLoading &&
          !article.commentsLoaded
      ) {
          loadArticleComments(article.id)
      }
  };

  getBody() {
      const {
          article: { comments, id, commentsLoading, commentsLoaded, commentIsAdding },
          isOpen
      } = this.props;

      if (!isOpen) return null;
      if (commentsLoading) return <Loader />;
      if (!commentsLoaded) return null;
      return (
          <div className="test__comment-list--body list-group list-group-flush">
              {comments.length ? (
                  this.comments
              ) : (
                  <li className="test__comment-list--empty list-group-item">No comments yet</li>
              )}
              {commentIsAdding ? <Loader text={"Adding comment..."} /> : <CommentForm articleId={id} />}
          </div>
      );
  };

  get comments() {
      return (
          <ul>
              {this.props.article.comments.map((id) => (
                  <li key={id} className="test__comment-list--item list-group-item">
                    <Comment id={id} />
                  </li>
              ))}
          </ul>
      );
  };
}

export default connect(
    null,
    { loadArticleComments }
)(toggleOpen(CommentList));
