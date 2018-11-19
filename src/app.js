import React, { Component } from 'react';
import ArticleList from './components/article-list/';
import Filters from './components/filters';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="card">
        <Filters />
        <ArticleList />
      </div>
    )
  }
}

export default App;
