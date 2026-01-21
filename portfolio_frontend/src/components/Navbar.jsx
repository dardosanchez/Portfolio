import React, { useState } from 'react';

const Navbar = () => {
  // ESTADO: Controla si el menú del celular está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);

  // FUNCIÓN: Invierte el estado (si está abierto lo cierra, y viceversa)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* --- BARRA DE NAVEGACIÓN DE ESCRITORIO --- */}
      <nav id="desktop-nav">
        <div className="logo">Dardo Sanchez</div>
        <div>
          <ul className="nav-links">
            <li><a href="#about">Sobre mí</a></li>
            <li><a href="#experience">Experiencia</a></li>
            <li><a href="#projects">Proyectos</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>
      </nav>

      {/* --- BARRA DE NAVEGACIÓN MÓVIL (Hamburguesa) --- */}
      <nav id="hamburger-nav">
        <div className="logo">Dardo Sanchez</div>
        <div className="hamburger-menu">
          
          {/* ICONO DE LAS 3 RAYITAS (X) */}
          {/* Si menuOpen es true, le agrega la clase 'open' para que se transforme en X */}
          <div 
            className={`hamburger-icon ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          {/* LISTA DE ENLACES MÓVIL */}
          {/* Si menuOpen es true, le agrega la clase 'open' para que aparezca */}
          <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#about" onClick={toggleMenu}>Sobre mí</a></li>
            <li><a href="#experience" onClick={toggleMenu}>Experiencia</a></li>
            <li><a href="#projects" onClick={toggleMenu}>Proyectos</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contacto</a></li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;