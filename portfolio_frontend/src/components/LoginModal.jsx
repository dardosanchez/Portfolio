import { useState } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from '../config';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // States for password reset requirement
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      // Check if password reset is required
      if (data.passwordResetRequired === 'true') {
        setShowChangePassword(true);
      } else {
        onLoginSuccess();
        onClose();
        resetForm();
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la contraseña');
      }

      onLoginSuccess();
      onClose();
      resetForm();
    } catch (err) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
    setError('');
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glassmorphism">
        {!showChangePassword ? (
          <>
            <h2>Acceso Administración</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Usuario</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <div className="modal-buttons">
                <button type="button" className="btn btn-color-2" onClick={handleCancel} disabled={loading}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-color-1" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>Actualizar Contraseña</h2>
            <p className="section__text__p1" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              Debes cambiar tu contraseña temporal para continuar.
            </p>
            <form onSubmit={handleChangePasswordSubmit}>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Confirmar Nueva Contraseña</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <div className="modal-buttons">
                <button type="button" className="btn btn-color-2" onClick={handleCancel} disabled={loading}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-color-1" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar y Continuar'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginModal;
