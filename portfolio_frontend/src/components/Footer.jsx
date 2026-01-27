import React from 'react';

const Footer = ({ data }) => {
  return (
    <footer>
      <nav>
        <div className="nav-links-container">
          <ul className="nav-links">
            <li><a href="#about">Sobre mí</a></li>
            <li><a href="#experience">Experiencia</a></li>
            <li><a href="#projects">Proyectos</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>
      </nav>
      <p>Copyright &#169; 2026 {data.name}</p>
    </footer>
  );
};

export default Footer;