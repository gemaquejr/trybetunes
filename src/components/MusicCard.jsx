import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musicResult } = this.props;
    return (
      <div>
        {musicResult.slice([1])
          .map(({ artworkUrl100, trackName, previewUrl, collectionName }) => (
            <>
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
            </>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicResult: PropTypes.string.isRequired,
};
