import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <nav>
            <Link data-testid="link-to-search" to="../search">
              Pesquisar
            </Link>
            <Link data-testid="link-to-favorites" to="../favorites">
              Favoritas
            </Link>
            <Link data-testid="link-to-profile" to="../profile">
              Perfil
            </Link>
          </nav>
        </header>
      );
  }
}
