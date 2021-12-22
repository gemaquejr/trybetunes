import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.userProfile();
  }

  userProfile() {
    this.setState({ loading: true });
    getUser().then((user) => {
      this.setState({ user, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <h1>TrybeTunes</h1>
        <Header />
        {loading ? <Loading /> : (
          <>
            <Link to="/profile/edit">Editar perfil</Link>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <h1>{ user.name }</h1>
            <h1>{ user.email }</h1>
            <h1>{ user.description }</h1>
          </>
        )}
      </div>
    );
  }
}
