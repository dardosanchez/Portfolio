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
    fetch('https://backend-portfolio-wxt6.onrender.com/profile/all')
      .then(res => res.json())
      .then(data => {
       
        if (data && data.length > 0) {
          setPerfil(data[0]);
        }
      })
      .catch(err => console.error("Error cargando perfil:", err));
  }, []);

  
  if (!perfil) return <div style={{textAlign:'center', marginTop:'20%'}}>Cargando perfil...</div>;

  return (
    <div className="App">
      <Navbar />
      
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