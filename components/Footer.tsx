import React from 'react';
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>{new Date().getFullYear()} Johny All rights reserverd</p>
      <p className="icons">
        <a href="https://twitter.com/flyingBird520" target="_blank" rel="noreferrer">
          <AiOutlineTwitter />
        </a>
        <a href="https://www.linkedin.com/in/johnyxu/" target="_blank" rel="noreferrer">
          <AiOutlineLinkedin />
        </a>
      </p>
    </div>
  );
};

export default Footer;
