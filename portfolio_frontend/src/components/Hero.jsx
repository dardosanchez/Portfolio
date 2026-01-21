import React from 'react';

// Recibimos 'data' como prop
const Hero = ({ data }) => {
  return (
    <section id="profile">
      <div className="section__pic-container">
        {/* Usamos la imagen que viene de la BD (Cloudinary) */}
        <img 
            src={data.imagen} 
            alt={`${data.name} profile picture`} 
            className="hero-img" // Agregale esta clase en CSS si querés ajustar tamaño
            style={{ borderRadius: '50%', objectFit: 'cover' }} // Ajuste rápido por si acaso
        />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Hola, soy</p>
        <h1 className="title">{data.name}</h1>
        <p className="section__text__p2">{data.cargo}</p>
        
        <div className="btn-container">
          {/* Botón CV: Abre el PDF de Cloudinary */}
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
            onClick={() => location.href = data.linkedin} 
          />
          <img 
            src="/assets/github.png" 
            alt="My Github profile" 
            className="icon"
            onClick={() => location.href = data.github} 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;