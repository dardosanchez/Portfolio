import PropTypes from 'prop-types';

const Hero = ({ data, isAdmin, onEditProfile }) => {
  return (
    <section id="profile">
      <div className="section__pic-container">
        <img 
            src={data.imagen} 
            alt={`${data.name} profile picture`} 
            className="hero-img" 
            style={{ borderRadius: '50%', objectFit: 'cover' }} 
        />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Hola, soy</p>
        <h1 className="title">{data.name}</h1>
        <p className="section__text__p2">{data.cargo}</p>
        
        <div className="btn-container">
          <a 
            href={data.curriculum} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-color-2"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
          >
            Descargar CV
          </a>
          
          <a 
            href="#contact" 
            className="btn btn-color-1"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
          >
            Contacto
          </a>

          {isAdmin && (
            <button 
              onClick={onEditProfile} 
              className="btn btn-color-1 admin-edit-btn"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#353535', color: '#white' }}
            >
              Editar Perfil
            </button>
          )}
        </div>

        <div id="socials-container">
          <img 
            src="/assets/linkedin.png" 
            alt="LinkedIn" 
            className="icon"
            onClick={() => window.open(data.linkedin, '_blank')}
            style={{ cursor: 'pointer' }}
          />
          <img 
            src="/assets/github.png" 
            alt="Github" 
            className="icon"
            onClick={() => window.open(data.github, '_blank')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  data: PropTypes.shape({
    imagen: PropTypes.string,
    name: PropTypes.string,
    cargo: PropTypes.string,
    curriculum: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string
  }).isRequired,
  isAdmin: PropTypes.bool,
  onEditProfile: PropTypes.func,
};

export default Hero;