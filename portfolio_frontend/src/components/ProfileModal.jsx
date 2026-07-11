import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from '../config';

const ProfileModal = ({ isOpen, onClose, profileData, onUpdate }) => {
  const [name, setName] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  
  const [imagenFile, setImagenFile] = useState(null);
  const [imageAboutFile, setImageAboutFile] = useState(null);
  const [curriculumFile, setCurriculumFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (profileData) {
      setName(profileData.name || '');
      setCargo(profileData.cargo || '');
      setEmail(profileData.email || '');
      setGithub(profileData.github || '');
      setLinkedin(profileData.linkedin || '');
    }
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('cargo', cargo);
    formData.append('email', email);
    formData.append('github', github);
    formData.append('linkedin', linkedin);

    if (imagenFile) formData.append('imagen', imagenFile);
    if (imageAboutFile) formData.append('imageAbout', imageAboutFile);
    if (curriculumFile) formData.append('curriculum', curriculumFile);

    try {
      const response = await fetch(`${API_URL}/profile/edit/${profileData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      const updatedProfile = await response.json();
      onUpdate(updatedProfile);
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
      <div className="modal-content glassmorphism modal-large">
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Cargo / Especialidad</label>
              <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email de Contacto</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>GitHub (Link)</label>
              <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>
            <div className="form-group">
              <label>LinkedIn (Link)</label>
              <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Foto de Perfil (Nueva)</label>
              <input type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} />
            </div>
            <div className="form-group">
              <label>Foto Sobre Mí (Nueva)</label>
              <input type="file" accept="image/*" onChange={(e) => setImageAboutFile(e.target.files[0])} />
            </div>
            <div className="form-group">
              <label>Currículum PDF (Nuevo)</label>
              <input type="file" accept="application/pdf" onChange={(e) => setCurriculumFile(e.target.files[0])} />
            </div>
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className="modal-buttons">
            <button type="button" className="btn btn-color-2" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-color-1" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profileData: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default ProfileModal;
