import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function NavBar() {
  return (
    <div className='pos-absolute flex-row padding-10 flex-spaceBTW shadow-bottom bgTheme'>
      <div className='fs-4vw color-white'>
        <Link to='/'>
          <button className='btn-link color-white'>
            Quick Note App
        </button>
        </Link>
      </div>
      <div className='flex-row fs-4vw'>
        <Link to='/allnotes'>
          <button className='btn-link color-white'>
            All Notes
          </button>
        </Link>
        <Link to='/'>
          <button className='btn-link color-white'>
            New Note
          </button>
        </Link>
      </div>
    </div>
  );
}