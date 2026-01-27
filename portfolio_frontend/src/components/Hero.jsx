import React from 'react';


const Hero = ({ data }) => {
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
          
          <button 
            className="btn btn-color-2" 
            onClick={() => window.open(data.curriculum)}
          >
            Descargar CV
          </button>
          
          <button 
            className="btn btn-color-1" 
            onClick={() => location.href='./#contact'}
          >
            Contacto
          </button>
        </div>

        <div id="socials-container">
          <img 
            src="/assets/linkedin.png" 
            alt="My LinkedIn profile" 
            className="icon"
            onClick={() => window.open(data.linkedin, '_blank')}
          />
          <img 
            src="/assets/github.png" 
            alt="My Github profile" 
            className="icon"
            onClick={() => window.open(data.github, '_blank')}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;