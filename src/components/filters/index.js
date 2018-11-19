import React, { Component } from 'react';
import DateRange from './date-range';
import SelectFilter from './select';

class Filters extends Component {

  render() {
    return (
      <div>
        <SelectFilter articles={this.props.articles} />
        <DateRange />
      </div>
    );
  };
}

export default Filters;
