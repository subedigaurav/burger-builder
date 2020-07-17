import React, { Component } from 'react';

// this is for the lazy loading of the component
const asyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
