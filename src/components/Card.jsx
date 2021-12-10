import React from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { album, artist, Image } = this.props;
    return (
      <section>
        <img src={ Image } alt="Imagem album" />
        <p>{ artist }</p>
        <p>{ album }</p>
      </section>
    );
  }
}

Card.propTypes = {
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  Image: PropTypes.string.isRequired,
};
