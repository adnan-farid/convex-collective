import React from 'react';

function Header() {
  return (
    <header className="App-header">
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 0l-11 6v12l11 6 11-6v-12l-11-6zm-9 16.813v-9.626l9-4.908 9 4.908v9.626l-9 4.909-9-4.909z"/>
          <path d="M12 5l-7 3.774v6.452l7 3.774 7-3.774v-6.452l-7-3.774zm5 9.428l-5 2.698-5-2.698v-5.855l5-2.698 5 2.698v5.855z"/>
        </svg>
        <span className="logo-text">Convex Collective</span>
      </div>
      <nav className="nav-links">
        <a href="#introduction" className="nav-link">Introduction</a>
        <a href="#Problem Definition" className="nav-link">Problem Definition</a>
        <a href="#Literature Review" className="nav-link">Literature Review</a>
        <a href="# Experimental Study Plan" className="nav-link">Experimental Study Plan</a>
        <a href="# Experimental Study Plan" className="nav-link">Animation</a>

      </nav>
    </header>
  );
}

export default Header;
