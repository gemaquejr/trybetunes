import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then(({ name }) => {
      this.setState({ name, loading: false });
    });
  }

  render() {
    const { name, loading } = this.state;

    return loading ? (
      <Loading />)
      : (
        <header data-testid="header-component">
          <span data-testid="header-user-name">
            {name}
          </span>
        </header>
      );
  }
}
