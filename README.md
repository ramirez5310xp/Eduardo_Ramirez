# Portafolio de Eduardo Ramírez

Portafolio personal adaptable a móviles y escritorio, creado con HTML, CSS y JavaScript. No requiere instalar dependencias ni compilar el proyecto.

## Contenido

- Presentación, perfil profesional y enlaces de contacto.
- Habilidades técnicas organizadas por área.
- Proyectos destacados con filtros y vista de detalles.
- Experiencia laboral y formación académica.
- Tema claro/oscuro y navegación móvil.

## Ver el portafolio

Abre `index.html` en un navegador. Las imágenes se encuentran en `img/`; conserva esa carpeta junto a los archivos HTML, CSS y JavaScript.

## Personalización

- Edita el contenido y enlaces en `index.html`.
- Ajusta colores, tipografía y diseño responsive en `style.css`.
- Modifica interacciones en `script.js`.
- Sustituye las imágenes de `img/` si actualizas tu foto o capturas de proyectos.
- Los logotipos de la UES, ESIT, Enterprise DataBase, Instituto Nacional Candelaria de la Frontera y Textiles Opico se guardan en `img/` y se muestran en sus respectivas entradas de trayectoria. El logo de la UES proviene de [ues.edu.sv](https://www.ues.edu.sv/wp-content/uploads/sites/20/2026/06/Logos-UES-rojo-vertical-2022.png).
- Los iconos de tecnologías se guardan localmente en `img/technologies/`; proceden del proyecto [Devicon](https://github.com/devicons/devicon).

## Analitica de visitas

El portafolio carga el contenedor de Google Tag Manager `GTM-KPL6FRRN`. En Google Tag Manager, configura una etiqueta de Google Analytics 4 con tu ID de medicion y una etiqueta de evento GA4 para el evento personalizado `portfolio_click` (disparador: evento personalizado con el mismo nombre). Asi podras consultar las visitas y los clics en el panel privado de Google Analytics.

El codigo envia `portfolio_click` al hacer clic en enlaces, botones y tarjetas de proyectos. Incluye el texto del elemento y el destino de enlaces que no sean de correo o telefono. Configura en GTM las etiquetas y disparadores que quieras publicar; este sitio no envia datos de identidad deliberadamente.
