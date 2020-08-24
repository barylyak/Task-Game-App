import React from 'react';
import './Navbar.css';

const Navbar = ({reset}) => (
  <div className='navbar'>
    <a className='btn' onClick={reset}>New Game</a>
  </div>
);

export default Navbar;
