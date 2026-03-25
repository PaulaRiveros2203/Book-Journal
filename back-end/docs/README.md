📚 Book Journal
📌 Descripción

Book Journal es una aplicación web que permite a los usuarios gestionar su lista personal de lectura de manera sencilla e intuitiva.

Los usuarios pueden registrar nuevos libros, visualizar su biblioteca, marcar libros como leídos, administrar una lista de deseos y gestionar su perfil dentro de la plataforma.

🚀 Arquitectura de la Solución

La aplicación está construida bajo una arquitectura desacoplada:

Frontend: HTML, CSS y JavaScript (hosting estático)
Backend: API REST desarrollada con Spring Boot
Base de datos: PostgreSQL
Infraestructura: Google Cloud Platform (GCP)

🌐 Despliegue del Frontend

El frontend fue desplegado utilizando Google Cloud Storage como hosting estático.
🔧 Configuración realizada:
Creación de un bucket en GCP: frontend-journal
Subida de archivos del proyecto (HTML, CSS, JS)
Configuración como sitio web estático
Definición de página principal (login.html)
Configuración de acceso público mediante permisos (allUsers)
🌍 URL del frontend:
https://storage.googleapis.com/frontend-journal/front-end/html/login.html

🛠️ Tecnologías Utilizadas
Frontend: HTML, CSS, JavaScript
Backend: Spring Boot
Base de datos: PostgreSQL
Cloud: Google Cloud Platform (Cloud Storage, Cloud Run)
Contenedores: Docker
✨ Funcionalidades
🔐 Registro y login de usuarios
👤 Edición y visualización de perfil
📖 Gestión de libros (CRUD)
✅ Lista de libros leídos
⭐ Lista de deseos
📊 Seguimiento del progreso de lectura
📊 Estado del Proyecto
Componente	Estado
Frontend	✅ Desplegado
👩‍💻 Autor
Dayana Pulido