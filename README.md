# 🚀 Portfolio Web Full Stack

> **Una Single Page Application (SPA) moderna, responsive y dinámica, construida con una arquitectura desacoplada.**

![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)
![Java](https://img.shields.io/badge/Java-17%2B-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/Database-MySQL-005C84?style=flat-square&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat-square&logo=vite&logoColor=white)

## 📋 Descripción

Este proyecto es mi portafolio personal y profesional. A diferencia de una web estática tradicional, este sistema es una aplicación **Full Stack** completa donde el contenido (proyectos, perfil, información de contacto) es administrado y servido dinámicamente desde una base de datos.

El objetivo principal de este desarrollo fue demostrar la capacidad de integración entre un **Frontend moderno en React** y un **Backend robusto en Spring Boot**, implementando buenas prácticas de arquitectura de software, seguridad y diseño responsive.

---

## 🛠️ Tecnologías y Herramientas (Tech Stack)

### **Frontend (Cliente)**
* **React + Vite:** Utilizado para crear una interfaz de usuario rápida y reactiva.
* **Hooks (useState, useEffect):** Para el manejo eficiente del estado y el ciclo de vida de los componentes.
* **CSS3 & Media Queries:** Diseño totalmente *Responsive* adaptado a cualquier dispositivo.
* **Fetch API:** Consumo asíncrono de los endpoints REST.

### **Backend (Servidor)**
* **Java 17 & Spring Boot:** Núcleo de la lógica de negocio y exposición de la API.
* **Spring Data JPA (Hibernate):** Capa de persistencia para la comunicación con la base de datos.
* **Spring Security & JWT:** Implementación de seguridad y autenticación (preparado para escalabilidad).
* **MySQL:** Base de datos relacional para la persistencia de datos.
* **Maven:** Gestión de dependencias y construcción del proyecto.

### **Servicios Externos**
* **Cloudinary:** Servicio en la nube para el almacenamiento y optimización de imágenes.

---

## 🏗️ Arquitectura del Sistema

El proyecto sigue una arquitectura **Cliente-Servidor (REST API)** desacoplada:

1.  **Base de Datos:** MySQL almacena la información de los proyectos y el perfil.
2.  **API REST (Spring Boot):** Expone endpoints (ej: `/proyectos`, `/perfil`) que sirven los datos en formato JSON.
3.  **Cliente (React):** Consume estos endpoints y renderiza la interfaz dinámicamente.
