import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './style.css'
import './mediaqueries.css'

function App() {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/profile/all')
      .then(res => res.json())
      .then(data => {
        // IMPORTANTE: Como el backend devuelve una lista [ {Obj} ], 
        // agarramos el primero (posición 0).
        if (data && data.length > 0) {
          setPerfil(data[0]);
        }
      })
      .catch(err => console.error("Error cargando perfil:", err));
  }, []);

  // Mientras carga, mostramos un mensajito simple o nada
  if (!perfil) return <div style={{textAlign:'center', marginTop:'20%'}}>Cargando perfil...</div>;

  return (
    <div className="App">
      <Navbar />
      {/* Pasamos 'perfil' a los componentes que necesitan datos dinámicos */}
      <Hero data={perfil} />
      <About data={perfil} />
      <Experience /> 
      <Projects />
      <Contact data={perfil} />
      <Footer data={perfil} />
    </div>
  );
}

export default App;