import React from 'react';

import '../styles/box-sizing.css';
import '../styles/typography.css';
import '../styles/util.css';

const Card = ({ title, body, children }) => {
  return (
    <div className="flat-card gray-border mt-10 flex-col">
      <div className="border-bottom pd-5">
        <label className="font-bold break-word fs-pt8em">{title}</label>
      </div>
      <div className="pd-10 flex-grow">
        <p className="fs-12 no-margin break-word">{body}</p>
      </div>
      {children}
    </div>
  );
};
export default Card;
