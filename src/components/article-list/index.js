import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Article from '../article';
import accordion from '../../decorators/accordion';
import { articlesLoadingSelector, filtratedArticles } from '../../selectors';
import { loadAllArticles } from '../../ac';
import Loader from '../common/loader';

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    fetchData: PropTypes.func,

    //from accordion decorator
    openItemId: PropTypes.string,
    toggleItem: PropTypes.func
  };

  render() {
    if (this.props.loading) return <Loader />;
    return <ul>{this.body}</ul>;
  };

  get body() {
    const { toggleOpenItem, openItemId, articles } = this.props;
    return articles.map((article) => (
      <li key={article.id} className="test__article-list--item">
        <Article
          article={article}
          isOpen={openItemId === article.id}
          toggleOpen={toggleOpenItem}
        />
      </li>
    ))
  };

  componentDidMount() {
    const { loadAllArticles } = this.props;
    loadAllArticles && loadAllArticles();
  };
}

export default connect(
  (state) => {
    return {
      articles: filtratedArticles(state),
      loading: articlesLoadingSelector(state)
    }
  },
  { loadAllArticles }
)(accordion(ArticleList));
