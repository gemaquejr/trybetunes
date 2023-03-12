import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      musics: [],
    };

    this.loadMusics = this.loadMusics.bind(this);
  }

  componentDidMount() {
    const albumId = window.location.pathname.split('/');
    this.loadMusics(albumId[albumId.length - 1]);
  }

  async loadMusics(albumId) {
    const musics = await getMusics(albumId);
    this.setState({ isLoading: false, musics });
  }

  render() {
    const { isLoading, musics } = this.state;

    return (
      <div className="page-album" data-testid="page-album">
        <Header />

        {
          isLoading ? <Loading /> : (
            musics.map((song, index) => (
              index === 0 ? (
                <div className="album" key={ song.collectionId }>
                  <img alt={ song.collectionName } src={ song.artworkUrl100 } />
                  <h4 data-testid="album-name">{ song.collectionName }</h4>
                  <h5 data-testid="artist-name">{ song.artistName }</h5>
                </div>
              ) : (
                <MusicCard
                  audioComponent="audio-component"
                  checkboxMusicTrackId={ `checkbox-music-${song.trackId}` }
                  key={ song.trackId }
                  previewUrl={ song.previewUrl }
                  song={ song }
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                />
              )
            ))
          )
        }
      </div>
    );
  }
}

export default Album;
