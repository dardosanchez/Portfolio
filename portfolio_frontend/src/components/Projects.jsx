import React, { useState, useEffect } from 'react';

const Projects = () => {
  
  const [proyectos, setProyectos] = useState([]);

  
  useEffect(() => {
    fetch('https://backend-portfolio-wxt6.onrender.com/proyect/all') 
      .then(response => response.json())
      .then(data => {
        console.log("Datos recibidos del backend:", data); 
        setProyectos(data);
      })
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);

  return (
    <section id="projects">
      <p className="section__text__p1">Explorá mis últimos</p>
      <h1 className="title">Proyectos</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          
         
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="details-container color-container">
              <div className="article-container">
                
                <img 
                  src={proyecto.imagen} 
                  alt={proyecto.nombre} 
                  className="project-img" 
                />
              </div>
              <h2 className="experience-sub-title project-title">{proyecto.nombre}</h2>
              
              <p className="project-stack">
                {proyecto.descripcion}
                <br />
               
                {proyecto.stack && (
                  <>
                    <b>Stack:</b> {proyecto.stack}
                  </>
                )}
              </p>

              <div className="btn-container">
                
                <button 
                  className="btn btn-color-2 project-btn" 
                  onClick={() => proyecto.github ? window.open(proyecto.github, '_blank') : alert("Link no disponible")}
                >
                  Github
                </button>
                
               
                <button 
                  className="btn btn-color-2 project-btn" 
                  onClick={() => proyecto.liveDemo ? window.open(proyecto.liveDemo, '_blank') : alert("Link no disponible")}
                >
                  Sitio Web
                </button>
              </div>
            </div>
          ))}

         
          {proyectos.length === 0 && <p>Cargando proyectos...</p>}

        </div>
      </div>
      <img src="/assets/arrow.png" alt="Arrow icon" className="icon arrow" onClick={() => location.href='./#contact'} />
    </section>
  );
};

export default Projects;