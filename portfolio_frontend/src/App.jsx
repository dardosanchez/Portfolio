import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ProfileModal from './components/ProfileModal';
import ProjectModal from './components/ProjectModal';
import { API_URL } from './config';
import './style.css';
import './mediaqueries.css';

function App() {
  const [perfil, setPerfil] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Administration state
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'));
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/profile/all`).then(res => res.json()),
      fetch(`${API_URL}/proyect/all`).then(res => res.json())
    ])
      .then(([perfilData, proyectosData]) => {
        if (perfilData && perfilData.length > 0) {
          setPerfil(perfilData[0]);
        }
        setProyectos(proyectosData || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar los datos de producción:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setPerfil(updatedProfile);
  };

  const handleProjectUpdate = (project, isEdit) => {
    if (isEdit) {
      setProyectos(proyectos.map(p => p.id === project.id ? project : p));
    } else {
      setProyectos([...proyectos, project]);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/proyect/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al eliminar el proyecto');
      setProyectos(proyectos.filter(p => p.id !== id));
    } catch (err) {
      alert(err.message || 'Error de conexión');
    }
  };

  if (loading || !perfil) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
      
      <Hero 
        data={perfil} 
        isAdmin={isAdmin} 
        onEditProfile={() => setIsProfileOpen(true)} 
      />
      
      <About data={perfil} />
      
      <Experience /> 
      
      <Projects 
        data={proyectos} 
        isAdmin={isAdmin} 
        onAddProject={() => { setSelectedProject(null); setIsProjectOpen(true); }}
        onEditProject={(project) => { setSelectedProject(project); setIsProjectOpen(true); }}
        onDeleteProject={handleDeleteProject}
      />
      
      <Contact data={perfil} />
      
      <Footer 
        data={perfil} 
        isAdmin={isAdmin} 
        onLogout={handleLogout} 
        onLoginClick={() => setIsLoginOpen(true)} 
      />

      {/* Admin Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={() => setIsAdmin(true)} 
      />
      
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        profileData={perfil}
        onUpdate={handleProfileUpdate}
      />
      
      <ProjectModal 
        isOpen={isProjectOpen} 
        onClose={() => setIsProjectOpen(false)} 
        projectData={selectedProject}
        onUpdate={handleProjectUpdate}
      />
    </div>
  );
}

export default App;