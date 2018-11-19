import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../ac';
import './style.css';

class CommentForm extends Component {

  static propTypes = {};

  state = {
    user: '',
    text: ''
  };

  render() {
    return (
      <form className="card col-sm-5 p-5 align-self-center" onSubmit={this.handleSubmit}>
          <div className="form-group row">
              <label htmlFor="inputCommentUser" className="col-sm-2 col-form-label">User:</label>
              <div className="col-sm-10">
                  <input
                      value={this.state.user}
                      onChange={this.handleChange('user')}
                      className={this.getClassName('user')}
                      id="inputCommentUser"
                  />
              </div>
          </div>
          <div className="form-group row">
              <label htmlFor="inputCommentText" className="col-sm-2 col-form-label">Text:</label>
              <div className="col-sm-10">
                  <input
                      value={this.state.text}
                      onChange={this.handleChange('text')}
                      className={this.getClassName('text')}
                      id="inputCommentText"
                  />
              </div>
          </div>
          <input type="submit" value="Add comment" className="btn btn-primary float-right" disabled={!this.isValidForm()} />
      </form>);


  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { addComment } = this.props;

    addComment(this.state);

    this.resetForm();

  };

  isValidForm = () => ['user', 'text'].every(this.isValidField);

  isValidField = (type) => this.state[type].length >= limits[type].min;

  getClassName = (type) => (this.isValidField(type) ? 'form-control is-valid' : 'form-control');

  handleChange = (type) => (ev) => {
    const { value } = ev.target;
    if (value.length > limits[type].max) return;
    this.setState({
      [type]: value
    });
  };

  resetForm = () => this.setState({
      user: '',
      text: ''
  });
}

const limits = {
  user: {
    min: 10,
    max: 50
  },
  text: {
    min: 10,
    max: 50
  }
};

export default connect(
  null,
  (dispatch, ownProps) => ({
    addComment: (comment) => dispatch(addComment(comment, ownProps.articleId))
  })
)(CommentForm);
