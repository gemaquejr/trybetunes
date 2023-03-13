import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userName: '',
    };

    this.loadUserName = this.loadUserName.bind(this);
  }

  componentDidMount() {
    this.loadUserName();
  }

  async loadUserName() {
    const { name: userName } = await getUser();
    this.setState({ isLoading: false, userName });
  }

  render() {
    const { isLoading, userName } = this.state;

    return (
      <header data-testid="header-component">
        <div className="informations-header">
          <div>
            {
              isLoading ? <Loading /> : (
                <h3 data-testid="header-user-name">{ userName }</h3>
              )
            }
          </div>
        </div>

        <nav className="links-header">
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
