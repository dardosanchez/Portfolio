import PropTypes from 'prop-types';

const Footer = ({ data, isAdmin, onLogout, onLoginClick }) => {
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
      <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', color: 'rgb(85, 85, 85)' }}>
        Copyright &#169; 2026 {data.name} 
        <span>•</span>
        {isAdmin ? (
          <span 
            onClick={onLogout} 
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Salir
          </span>
        ) : (
          <span 
            onClick={onLoginClick} 
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Admin
          </span>
        )}
      </p>
    </footer>
  );
};

Footer.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  isAdmin: PropTypes.bool,
  onLogout: PropTypes.func,
  onLoginClick: PropTypes.func,
};

export default Footer;