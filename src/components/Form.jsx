import React, { Component } from 'react';

export default class Loading extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    const enableButton = 2;
    this.setState(() => ({ [name]: value, isDisabled: value.length < enableButton }));
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="searchArtist">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Artista"
              onChange={ (event) => this.handleInput(event) }
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ isDisabled }
            >
              Pesquisar
            </button>
          </form>
        </label>
      </div>
    );
  }
}
