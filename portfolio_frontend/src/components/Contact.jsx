import React from 'react';

const Contact = ({ data }) => {
  return (
    <section id="contact">
      <p className="section__text__p1">Ponete en contacto</p>
      <h1 className="title">Contactame</h1>
      <div className="contact-info-upper-container">
        <div className="contact-info-container">
          <img src="/assets/email.png" alt="Email icon" className="icon contact-icon email-icon" />
          <p><a href={`mailto:${data.email}`}>{data.email}</a></p>
        </div>
        <div className="contact-info-container">
          <img src="/assets/linkedin.png" alt="LinkedIn icon" className="icon contact-icon" />
          <p><a href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </div>
      </div>
    </section>
  );
};

export default Contact;