import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from '../config';

const ProjectModal = ({ isOpen, onClose, projectData, onUpdate }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stack, setStack] = useState('');
  const [github, setGithub] = useState('');
  const [liveDemo, setLiveDemo] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = !!projectData;

  useEffect(() => {
    if (projectData) {
      setNombre(projectData.nombre || '');
      setDescripcion(projectData.descripcion || '');
      setStack(projectData.stack || '');
      setGithub(projectData.github || '');
      setLiveDemo(projectData.liveDemo || '');
    } else {
      setNombre('');
      setDescripcion('');
      setStack('');
      setGithub('');
      setLiveDemo('');
      setImagenFile(null);
    }
  }, [projectData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('stack', stack);
    formData.append('github', github);
    formData.append('liveDemo', liveDemo);
    
    if (imagenFile) {
      formData.append('imagen', imagenFile);
    }

    try {
      const url = isEditMode 
        ? `${API_URL}/proyect/edit/${projectData.id}`
        : `${API_URL}/proyect/upload`;
        
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al procesar el proyecto');
      }

      const savedProject = await response.json();
      onUpdate(savedProject, isEditMode);
      onClose();
    } catch (err) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glassmorphism">
        <h2>{isEditMode ? 'Editar Proyecto' : 'Agregar Proyecto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Proyecto</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required rows="3" />
          </div>
          <div className="form-group">
            <label>Tecnologías (Ej: React, Node.js, CSS)</label>
            <input type="text" value={stack} onChange={(e) => setStack(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>GitHub (Link)</label>
            <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Sitio Web (Link)</label>
            <input type="url" value={liveDemo} onChange={(e) => setLiveDemo(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Imagen del Proyecto {isEditMode && '(Opcional cambiar)'}</label>
            <input type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} required={!isEditMode} />
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className="modal-buttons">
            <button type="button" className="btn btn-color-2" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-color-1" disabled={loading}>
              {loading ? 'Procesando...' : isEditMode ? 'Guardar Cambios' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectData: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default ProjectModal;
