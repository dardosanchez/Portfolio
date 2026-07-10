# 💻 Portfolio Frontend (React + Vite)

> **Capa cliente construida como una Single Page Application (SPA) responsiva, fluida y moderna, integrada con un panel de administración en tiempo real.**

## 🛠️ Tecnologías y Herramientas

*   **React:** Para una arquitectura de componentes declarativa y reactiva.
*   **Vite:** Herramienta de compilación ultrarrápida y entorno de desarrollo ágil con HMR (Hot Module Replacement).
*   **CSS Vanilla & Media Queries:** Control total del diseño visual sin dependencias pesadas, logrando tiempos de carga ínfimos.
*   **Fetch API:** Comunicación asíncrona con la API REST del Backend.

---

## 🔑 Características del Cliente

1.  **Panel de Control Inline (CMS):**
    *   Subida de imágenes directo a Cloudinary mediante formularios multipart (`FormData`).
    *   Gestión dinámica de proyectos (Crear, Editar, Eliminar) sin recargar la página.
    *   Edición de la información de contacto y currículum.
2.  **Autenticación JWT:**
    *   Persistencia de sesión en el navegador mediante `localStorage`.
    *   Envío del token JWT en la cabecera `Authorization: Bearer <token>` para todas las operaciones de escritura y eliminación.
3.  **UI/UX Premium:**
    *   Diseño responsivo con breakpoints específicos para móviles, tabletas y ordenadores portátiles.
    *   Efecto de desenfoque de fondo (*glassmorphism*) en los modales para una estética premium.
    *   Enlace discreto en el pie de página (`• Admin`) para alternar al modo editor.

---

## 🚀 Inicio Rápido (Desarrollo Local)

### Requisitos Previos
*   [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)

### Instalación
1. Entra a la carpeta del proyecto:
   ```bash
   cd portfolio_frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Compila el proyecto para producción:
   ```bash
   npm run build
   ```
