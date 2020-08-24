import React from 'react';
import PropTypes from 'prop-types';

const Card = ({onClick, color, isMatched, isHidden, id}) => {
  return (
    <div
      style={{
        backgroundColor: isMatched || !isHidden ? color : 'gray',
        border: '3px solid lightgray',
        display: 'flex',
        justifyContent: 'center',
       height: '150px',
        width: '150px',
        margin: '5px',
        fontSize: '4em',
        color: '#fff',
        alignItems: 'center',
        transition: 'background-color .3s ease-in-out'      }}
      onClick={() => onClick(color, id)}
    ></div>
  )
}

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

export default Card;
