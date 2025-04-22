import React from 'react';

function Footer() {
  return (
    <footer className="App-footer">
      <div className="footer-links">
        <a href="#about" className="footer-link">About</a>
        <a href="#research" className="footer-link">Research</a>
        <a href="#contact" className="footer-link">Contact</a>
        <a href="#github" className="footer-link">GitHub</a>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
