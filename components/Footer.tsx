import React from 'react';
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Johny All rights reserverd</p>
      <p className="icons">
        <AiOutlineLinkedin />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
