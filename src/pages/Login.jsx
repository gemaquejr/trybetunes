import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      isDisabled: true,
      returnResponse: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    const enableButton = 3;
    this.setState(() => ({ [name]: value, isDisabled: value.length < enableButton }));
  }

  handleSearch = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    const response = await createUser({ name });
    if (response === 'OK') {
      this.setState({ loading: false, returnResponse: true });
    }
  }

  render = () => {
    const { name, loading, isDisabled, returnResponse } = this.state;
    return returnResponse ? (
      <Redirect to="/search" />)
      : (
        <div data-testid="page-login">
          {loading ? <Loading /> : (
            <form>
              <label htmlFor="userName">
                <input
                  data-testid="login-name-input"
                  name="name"
                  value={ name }
                  type="text"
                  placeholder="Nome"
                  onChange={ (event) => this.handleInput(event) }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ isDisabled }
                onClick={ (event) => this.handleSearch(event) }
              >
                Entrar
              </button>
            </form>
          )}
        </div>
      );
  };
}
