import React from 'react';

const About = ({ data }) => {
  return (
    <section id="about">
      <p className="section__text__p1">Conocé un poco más</p>
      <h1 className="title">Sobre mí</h1>
      <div className="section-container">
        <div className="section__pic-container">
          {/* Foto de Cloudinary para el About */}
          <img 
            src={data.imageAbout} 
            alt="Profile picture" 
            className="about-pic" 
          />
        </div>
        
        {/* ... El resto de los cuadros de Experiencia/Educación queda igual ... */}
        {/* (Copiá y pegá el contenido interno que ya tenías acá abajo) */}
        
        <div className="about-details-container">
          <div className="about-containers">
            <div className="details-container">
              <img src="/assets/experience.png" alt="Experiencia" className="icon" />
              <h3>Experiencia</h3>
              <p>Más de 3 años <br />Desarrollador FullStack</p>
            </div>
            <div className="details-container">
              <img src="/assets/education.png" alt="Educación" className="icon" />
              <h3>Educación</h3>
              <p>Ing. en Sistemas (En curso)<br />Técnico en Computación</p>
            </div>
          </div>
          <div className="text-container">
            <p>
              Soy estudiante de Ingeniería en Sistemas y Desarrollador Backend apasionado por la arquitectura de software. 
              Mi especialidad es construir APIs robustas usando <b>Java y Spring Boot</b>.
            </p>
          </div>
        </div>
      </div>
      <img src="/assets/arrow.png" alt="Arrow icon" className="icon arrow" onClick={() => location.href='./#experience'} />
    </section>
  );
};

export default About;