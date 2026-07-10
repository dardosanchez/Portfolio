import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './style.css';
import './mediaqueries.css';

function App() {
  const [perfil, setPerfil] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://backend-portfolio-wxt6.onrender.com/profile/all').then(res => res.json()),
      fetch('https://backend-portfolio-wxt6.onrender.com/proyect/all').then(res => res.json())
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
      <Navbar />
      <Hero data={perfil} />
      <About data={perfil} />
      <Experience /> 
      <Projects data={proyectos} />
      <Contact data={perfil} />
      <Footer data={perfil} />
    </div>
  );
}

export default App;