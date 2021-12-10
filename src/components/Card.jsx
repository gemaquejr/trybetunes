import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { artistName, collectionId, collectionName, artworkUrl100 } = this.props;
    return (
      <>
        <section>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p>{ artistName }</p>
          <p>{ collectionName }</p>
        </section>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/:${collectionId}` }
        />
      </>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};
