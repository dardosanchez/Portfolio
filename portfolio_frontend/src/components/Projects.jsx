import PropTypes from 'prop-types';

const Projects = ({ data, isAdmin, onAddProject, onEditProject, onDeleteProject }) => {
  return (
    <section id="projects">
      <p className="section__text__p1">Explorá mis últimos</p>
      <h1 className="title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        Proyectos
        {isAdmin && (
          <button 
            onClick={onAddProject} 
            className="btn btn-color-1" 
            style={{ width: 'auto', padding: '0.6rem 1.2rem', fontSize: '1rem' }}
          >
            + Agregar
          </button>
        )}
      </h1>
      
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

              {isAdmin && (
                <div className="btn-container" style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem', width: '100%' }}>
                  <button 
                    className="btn btn-color-1" 
                    style={{ width: '6rem', padding: '0.5rem', background: '#353535' }}
                    onClick={() => onEditProject(proyecto)}
                  >
                    Editar
                  </button>
                  
                  <button 
                    className="btn btn-color-2" 
                    style={{ width: '6rem', padding: '0.5rem', borderColor: '#ff4d4d', color: '#ff4d4d' }}
                    onClick={() => onDeleteProject(proyecto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}

          {(!data || data.length === 0) && <p className="text-center w-100">No hay proyectos cargados.</p>}

        </div>
      </div>
    </section>
  );
};

Projects.propTypes = {
  data: PropTypes.array,
  isAdmin: PropTypes.bool,
  onAddProject: PropTypes.func,
  onEditProject: PropTypes.func,
  onDeleteProject: PropTypes.func,
};

export default Projects;