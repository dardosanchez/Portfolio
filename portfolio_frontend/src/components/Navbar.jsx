import { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ isAdmin, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav id="desktop-nav">
        <div className="logo">Dardo Sanchez</div>
        <div>
          <ul className="nav-links">
            <li><a href="#about">Sobre mí</a></li>
            <li><a href="#experience">Experiencia</a></li>
            <li><a href="#projects">Proyectos</a></li>
            <li><a href="#contact">Contacto</a></li>
            {isAdmin && (
              <li>
                <button onClick={onLogout} className="btn-logout">
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <nav id="hamburger-nav">
        <div className="logo">Dardo Sanchez</div>
        <div className="hamburger-menu">
          <div 
            className={`hamburger-icon ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#about" onClick={toggleMenu}>Sobre mí</a></li>
            <li><a href="#experience" onClick={toggleMenu}>Experiencia</a></li>
            <li><a href="#projects" onClick={toggleMenu}>Proyectos</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contacto</a></li>
            {isAdmin && (
              <li>
                <a href="#logout" onClick={(e) => { e.preventDefault(); onLogout(); toggleMenu(); }}>
                  Cerrar Sesión
                </a>
              </li>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default Navbar;