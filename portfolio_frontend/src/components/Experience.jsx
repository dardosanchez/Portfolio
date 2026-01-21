import React from 'react';

const Experience = () => {
  return (
    <section id="experience">
      <p className="section__text__p1">Explora Mi</p>
      <h1 className="title">Experiencia</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          
          {/* FRONTEND */}
          <div className="details-container">
            <h2 className="experience-sub-title">Frontend</h2>
            <div className="article-container">
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>HTML / CSS</h3><p>Avanzado</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>React</h3><p>Intermedio</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>JavaScript</h3><p>Intermedio</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Bootstrap</h3><p>Intermedio</p></div>
              </article>
            </div>
          </div>

          {/* BACKEND */}
          <div className="details-container">
            <h2 className="experience-sub-title">Backend</h2>
            <div className="article-container">
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Java</h3><p>Avanzado</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Spring Boot</h3><p>Avanzado</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Spring Sec / JWT</h3><p>Intermedio</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>MySQL / JPA</h3><p>Intermedio</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Microservicios</h3><p>En aprendizaje</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>API REST</h3><p>Intermedio</p></div>
              </article>
            </div>
          </div>

          {/* DEVOPS */}
          <div className="details-container">
            <h2 className="experience-sub-title">DevOps & Tools</h2>
            <div className="article-container">
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Git / GitHub</h3><p>Intermedio</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Docker</h3><p>Básico</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Linux</h3><p>Intermedio</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Postman</h3><p>Intermedio</p></div>
              </article>
              <article>
                <img src="/assets/checkmark.png" alt="Experience icon" className="icon" />
                <div><h3>Maven</h3><p>Intermedio</p></div>
              </article>
            </div>
          </div>

        </div>
      </div>
      <img src="/assets/arrow.png" alt="Arrow icon" className="icon arrow" onClick={() => location.href='./#projects'} />
    </section>
  );
};

export default Experience;