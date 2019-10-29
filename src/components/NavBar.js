import React from 'react';
import './styles.css';

export default function NavBar() {
  return (
    <div className='pos-absolute flex-row padding-10 flex-spaceBTW shadow-bottom bgTheme'>
      <div className='fs-4vw color-white'>
        <button className='btn-link color-white'>
        Quick Note App
        </button>
      </div>
      <div className='flex-row fs-4vw'>
          <button className='btn-link color-white'>
            All Notes
          </button>
          <button className='btn-link color-white'>
            New Note
          </button>
      </div>
    </div>
  );
}