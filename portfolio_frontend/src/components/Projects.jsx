import React, { useState, useEffect } from 'react';

const Projects = () => {
  // 1. Estado para guardar los proyectos que vienen del Backend
  const [proyectos, setProyectos] = useState([]);

  // 2. useEffect: Se ejecuta una sola vez cuando carga el componente
  useEffect(() => {
    fetch('http://localhost:8080/proyect/all') // <--- Asegurate que esta sea tu ruta real en Java
      .then(response => response.json())
      .then(data => {
        console.log("Datos recibidos del backend:", data); // Para ver en consola si llega bien
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
          
          {/* 3. Mapeamos: Por cada proyecto en la lista, crea una tarjeta */}
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="details-container color-container">
              <div className="article-container">
                {/* Asumimos que guardaste la ruta completa o el nombre de archivo en la BD */}
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
                {/* Renderizamos el stack si existe */}
                {proyecto.stack && (
                  <>
                    <b>Stack:</b> {proyecto.stack}
                  </>
                )}
              </p>

              <div className="btn-container">
                {/* Botón Github (si no hay link, no hace nada) */}
                <button 
                  className="btn btn-color-2 project-btn" 
                  onClick={() => proyecto.github ? location.href=proyecto.github : alert("Link no disponible")}
                >
                  Github
                </button>
                
                {/* Botón Demo/Web */}
                <button 
                  className="btn btn-color-2 project-btn" 
                  onClick={() => proyecto.liveDemo ? location.href=proyecto.liveDemo : alert("Link no disponible")}
                >
                  Sitio Web
                </button>
              </div>
            </div>
          ))}

          {/* Si no hay proyectos, mostramos un mensaje temporal */}
          {proyectos.length === 0 && <p>Cargando proyectos...</p>}

        </div>
      </div>
      <img src="/assets/arrow.png" alt="Arrow icon" className="icon arrow" onClick={() => location.href='./#contact'} />
    </section>
  );
};

export default Projects;