import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCommentSelector } from '../../selectors';

function Comment({ comment }) {
  return (
    <div className="card p-1">
      <div className="card-head">
        <b>user: {comment.user}</b>
      </div>
      <div className="card-body">
          {comment.text}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
  }).isRequired
};

const createMapStateToProps = () => {
  const commentSelector = createCommentSelector();

  return (state, ownProps) => ({
    comment: commentSelector(state, ownProps)
  });
};

export default connect(createMapStateToProps)(Comment);
