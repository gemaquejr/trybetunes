import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      albumResult: [],
      loading: false,
      message: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    const enableButton = 2;
    this.setState(() => ({ [name]: value, isDisabled: value.length < enableButton }));
  };

  handleSearch = async () => {
    const { name } = this.state;
    this.setState({ loading: true, name: '' });
    const response = await searchAlbumsAPI(name);
    if (response.length === 0) {
      this.setState({
        albumResult: [],
        loading: false,
        message: 'Nenhum álbum foi encontrado',
      });
    } else {
      this.setState({
        albumResult: response,
        loading: false,
        message: `Resultado de álbuns de: ${name}`,
      });
    }
  }

  render() {
    const {
      loading, albumResult, isDisabled, message, name } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="searchArtist">
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Artista"
                onChange={ (event) => this.handleInput(event) }
                name="name"
                value={ name }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ isDisabled }
              onClick={ (event) => this.handleSearch(event) }
            >
              Pesquisar
            </button>
          </form>
        )}
        <span>{message}</span>
        {/* Marco Severo me aconselhou a retirar o componente Card e colocar ele aqui dentro do Form. */}
        {albumResult.map((album) => (
          <section key={ album.collectionId }>

            <h1>{ album.artistName }</h1>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <h4>{ album.collectionName }</h4>

            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              Visitar album
            </Link>
          </section>
        ))}
      </div>
    );
  }
}
