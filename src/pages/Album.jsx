import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicResult: [],
      artistName: '',
      collectionName: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((response) => {
      this.setState({
        musicResult: response,
        artistName: response[0].artistName,
        collectionName: response[0].collectionName });
    });
  }

  render() {
    const { musicResult, artworkUrl100, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <h1>TrybeTunes</h1>
        <Header />

        <h1 data-testid="artist-name">{ artistName }</h1>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h4 data-testid="album-name">{ collectionName }</h4>

        {/* Marco Severo me ajudou na lógica. */}

        {musicResult.slice([1]).map((music) => (
          <div key={ music.id }>
            <MusicCard music={ music } />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
