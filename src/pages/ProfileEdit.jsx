import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      isDisabled: true,
      submitted: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => { this.saveButton(); });
  }

  getUser = async () => {
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({
      loading: false,
      name: response.name,
      email: response.email,
      description: response.description,
      image: response.image,
    });
    this.saveButton();
  }

  handleSave = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = this.state;
    await updateUser({ name, email, description, image });
    this.setState({ submitted: true, loading: false });
  }

  saveButton() {
    const { name, email, description, image } = this.state;
    const renderForm = [name !== '', description !== '', email !== '', image !== ''];
    if (renderForm.every((item) => item === true)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const {
      loading,
      name,
      email,
      description,
      image,
      isDisabled,
      submitted,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <h1>TrybeTunes</h1>
        <Header />
        {loading ? <Loading /> : (
          <main>
            <form>
              <label htmlFor="image">
                Imagem:
                <input
                  data-testid="edit-input-image"
                  name="image"
                  onChange={ (event) => this.handleInput(event) }
                  value={ image }
                />
              </label>
              <label htmlFor="name">
                Nome:
                <input
                  data-testid="edit-input-name"
                  name="name"
                  onChange={ (event) => this.handleInput(event) }
                  value={ name }
                />
              </label>
              <label htmlFor="email">
                E-mail:
                <input
                  data-testid="edit-input-email"
                  name="email"
                  placeholder="Ex.: teste@teste.com"
                  onChange={ (event) => this.handleInput(event) }
                  value={ email }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <input
                  data-testid="edit-input-description"
                  name="description"
                  onChange={ (event) => this.handleInput(event) }
                  value={ description }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ isDisabled }
                onClick={ this.handleSave }
              >
                Salvar
              </button>
            </form>
            {submitted && <Redirect to="/profile" />}
          </main>
        )}
      </div>

    );
  }
}
