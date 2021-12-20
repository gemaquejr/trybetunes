import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput = async () => {
    const { music: { trackId } } = this.props;
    this.setState({ loading: true, checked: true });
    const response = await addSong(trackId);
    if (response === 'OK') {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { checked, loading } = this.state;

    const { music: {
      artworkUrl100,
      trackName,
      previewUrl,
      collectionName,
      trackId,
    } } = this.props;
    return (
      <div>
        <li>{trackName}</li>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {loading ? <Loading /> : (
          <label htmlFor="favorites">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={ checked }
              onChange={ (event) => this.handleInput(event) }
            />
          </label>
        )}

      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};
