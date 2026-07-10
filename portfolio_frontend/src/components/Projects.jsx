import PropTypes from 'prop-types';

const Projects = ({ data }) => {
  return (
    <section id="projects">
      <p className="section__text__p1">Explorá mis últimos</p>
      <h1 className="title">Proyectos</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          
          {data && data.map((proyecto) => (
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

          {(!data || data.length === 0) && <p className="text-center w-100">No hay proyectos cargados.</p>}

        </div>
      </div>
      <img src="/assets/arrow.png" alt="Arrow icon" className="icon arrow" onClick={() => location.href='./#contact'} />
    </section>
  );
};

Projects.propTypes = {
  data: PropTypes.array
};

export default Projects;