import React from 'react';

export default (OriginalComponent) =>
  class DecoratedComponent extends React.Component {
    state = {
      openItemId: null
    };

    toggleOpenItem = (openItemId) =>
      this.setState({
        openItemId: openItemId === this.state.openItemId ? null : openItemId
      });

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          toggleOpenItem={this.toggleOpenItem}
        />
      );
    };
  }
