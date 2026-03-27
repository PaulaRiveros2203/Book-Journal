# 📖 Book Journal | Tu biblioteca digital personal


## Descripción del Proyecto y Dominio Elegido
**Book Journal** es una aplicación web que está enfocada en la gestión personal de lectura, favorece la organización, registro y seguimiento de los libros de los potentes usuarios de una forma prática e intuitiva.

Esta plataforma permite hacer el registro de libros nuevos, visualización en biblioteca personalizada, marcación de libros leídos para tener un control en cueestiones de progreso, elimina registros según la necesidad del usuario.

Este proyecto se enfocó en una arquitectura basada en servicios, apoyandonos del framework SpringBoot, con la ayuda de esta herramienta se evidencia una API REST robusta, escalable y fácil de integrar con el frontend.

## 👩‍💻✨ Integrantes del Grupo y División de Responsabilidades

| Integrante | Rol | Responsabilidades |
|----------|------|------------------|
| **Laura Lopez** | Frontend 🎨 | Desarrollo del frontend (HTML, CSS, JavaScript) |
| **Juan Narvaez** | Backend ⚙️ | Desarrollo del backend con Spring Boot |
| **Paula Riveros** | Database🗄️ | Diseño e implementación de la base de datos |
| **Dayana Pulido** | Cloud ☁️ | Despliegue en Google Cloud Platform |
| **Paula Riveros / Dayana Pulido** | DevOps 🔄 | Apoyo en despliegue en GCP |
| **Juan Narvaez/ Dayana Pulido** | Cloud & Config ⚙️ | Configuración de servicios cloud (Cloud Storage, Cloud Run) |

## 🛠️✨ Stack Tecnológico

La aplicación **Book Journal** está construida utilizando un conjunto de tecnologías que abarcan el frontend, backend, base de datos e infraestructura en la nube.

---

### 🎨 Frontend

Encargado de la interacción con el usuario y la presentación visual de la aplicación.

- **Lenguajes base:**
  - HTML5 (estructura de las páginas: `login.html`, `registro.html`, `perfil.html`, `edit_perfil.html`, `lista_deseos.html`, `lectura_actual.html`, `libros_leidos.html`)
  - CSS3 (estilos visuales)

- **Tipografía:**
  - Integración con Google Fonts (Dancing Script y Patrick Hand)

- **Lógica de interfaz:**
  - JavaScript (manejo de eventos, formularios y actualización dinámica de la UI)

- **Comunicación:**
  - Fetch API para el envío y recepción de datos entre frontend y backend

---

### ⚙️ Backend

Encargado de la lógica de negocio, procesamiento de datos y comunicación con la base de datos.

- **Lenguaje:** Java  
- **Framework principal:** Spring Boot  
- **Gestión de dependencias:** Maven (`pom.xml`)  
- **Acceso a datos:** Spring Data JPA / Hibernate  
- **Seguridad:** Spring Security  
- **Servidor:** Apache Tomcat (embebido)  
- **Contenerización:** Docker (para control de versiones y despliegue consistente)  

---

### 🗄️ Base de Datos

Responsable del almacenamiento persistente de la información del sistema.

- **Motor de base de datos:** PostgreSQL 18
- **Servicio cloud:** Google Cloud SQL
- **Cliente local:** pgAdmin 4
- **Puerto local:** 5433
- **Puerto cloud:** 5432 

---
## 🌐 URLs de Acceso a la Aplicación Desplegada

### 🎨 Frontend (Cloud Storage)

- 🔐 Login  
  https://storage.googleapis.com/book-journal-frontend/front-end/html/login.html  

- 📝 Registro  
  https://storage.googleapis.com/book-journal-frontend/front-end/html/registro.html  

- 👤 Perfil  
  https://storage.googleapis.com/book-journal-frontend/front-end/html/perfil.html  

- ✏️ Editar Perfil  
  https://storage.googleapis.com/book-journal-frontend/front-end/html/edit_perfil.html 

- 📖 Lectura Actual  
  https://storage.googleapis.com/book-journal-frontend/front-end/html/lectura_actual.html  

- 📚 Libros Leídos  
  https://storage.googleapis.com/book-journal-frontend/front-end/html/libros_leidos.html  

- ⭐ Lista de Deseos  
  https://storage.googleapis.com/book-journal-frontend/front-end/html/lista_deseos.html 

---

### ⚙️ Backend (Cloud Run)

- 🌐 API Base  
  https://backend-book-675205716775.us-central1.run.app

## 🏗️ Diagrama de Arquitectura del Sistema

[Ver diagrama en PDF](./doc/darquitectura.pdf)
[Ver diagrama en html](./doc/diagrama_erd_book_journal.html)
## 💻 Instrucciones de Instalación Local

Sigue los siguientes pasos para ejecutar el proyecto en un entorno local.

---

### 🔧 Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- Java 17 o superior  
- Maven   
- Git  
- PostgreSQL 18 instalado
- Puerto disponible (se usó 5433 por conflicto con instalación previa)

---

### 📥 Clonar el repositorio

```bash
git clone <https://github.com/PaulaRiveros2203/Book-Journal.git>
cd Book-Journal
```
### 🗄️Configuración de la base de datos

## Estructura de la base de datos

### Tabla `usuarios`
Almacena los datos de registro de cada usuario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Clave primaria, autoincremental |
| nombre | VARCHAR(100) | Nombre del usuario |
| apellido | VARCHAR(100) | Apellido del usuario |
| email | VARCHAR(150) | Email único por usuario |
| contraseña | VARCHAR(255) | Contraseña encriptada |
| fecha_registro | TIMESTAMP | Fecha de registro automática |

---

### Tabla `libros_leidos`
Almacena los libros que cada usuario ha leído.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Clave primaria, autoincremental |
| usuario_id | INT | Referencia al usuario (FK) |
| titulo | VARCHAR(200) | Título del libro |
| autor | VARCHAR(150) | Autor del libro |
| genero | VARCHAR(100) | Género literario |
| fecha_lectura | DATE | Fecha en que lo leyó |
| calificacion | INT | Calificación del 1 al 5 |
| resena | TEXT | Reseña del usuario |
| fecha_agregado | TIMESTAMP | Fecha de registro automática |

---

### Tabla `libros_deseados`
Almacena la lista de deseos de libros de cada usuario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Clave primaria, autoincremental |
| usuario_id | INT | Referencia al usuario (FK) |
| titulo | VARCHAR(200) | Título del libro |
| autor | VARCHAR(150) | Autor del libro |
| genero | VARCHAR(100) | Género literario |
| prioridad | INT | Prioridad del 1 al 3 |
| notas | TEXT | Notas del usuario |
| fecha_agregado | TIMESTAMP | Fecha de registro automática |

---
### 1. Ejecutar el script SQL
```bash
psql -U postgres -p 5433 -f database.sql
```
### 2. Configurar variables de entorno
Copia el archivo `.env.example` y renómbralo como `.env`:
```bash
cp .env.example .env
```
Luego edita `.env` con tus credenciales locales.

### 3. Configuración en Spring Boot
Agrega en tu `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/libreria_online
spring.datasource.username=postgres
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```
---
### ⚙️ Ejecución del backend
Accede a la carpeta del backend y ejecuta la aplicación:
```bash
cd back-end
./mvnw spring-boot:run
```
---
El backend se ejecutará en:
```bash
http://localhost:8080
```
### 🎨 Ejecución del frontend
Accede a la carpeta del frontend:
```bash
cd front-end
```
Abre el archivo login.html en tu navegador
o utiliza una extensión como Live Server en Visual Studio Code.

### 🔗 Conexión frontend - backend
Verifica que en los archivos JavaScript la URL del API esté configurada de forma local:
```bash
const API = "http://localhost:8080/api";
```

### 🚀 Comandos de Despliegue

### 🐳 1. Construcción de la imagen Docker (Backend)
```bash
docker build -t gcr.io/test-489423/backend-book .
```
### 🔐 2. Autenticación en Google Cloud
```bash
gcloud auth login
gcloud config set project test-489423
```
### 📦 3. Subir la imagen a Container Registry
```bash
   gcloud auth configure-docker
   docker push gcr.io/test-489423/backend-book
```
### ☁️ 4. Desplegar en Cloud Run
```bash
   gcloud run deploy backend-book \
  --image gcr.io/test-489423/backend-book \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```
### 🌐 5. Obtener URL del backend
```bash
   gcloud run services describe backend-book --region us-central1 --format                    'value(status.url)'
```
### 📁 6. Despliegue del Frontend en Cloud Storage
Crear el bucket:
```bash
   gsutil mb -l us-central1 gs://book-journal-frontend
```
Subir archivos:
```bash
gsutil -m cp -r front-end/* gs://book-journal-frontend
```
Configurar acceso público:
```bash
gsutil iam ch allUsers:objectViewer gs://book-journal-frontend
```
Configurar como sitio web:
```bash
gsutil web set -m front-end/html/login.html gs://book-journal-frontend
```
## Credenciales de prueba

Usuarios insertados como datos de prueba para desarrollo y testing:

| Nombre | Email | Género favorito |
|--------|-------|-----------------|
| Paula Riveros | paula@bookjournal.com | Fantasia |
| Carlos Mendoza | carlos@bookjournal.com | Ciencia Ficcion |
| Laura Torres | laura@bookjournal.com | Romance |

> *Nota:* Las contraseñas en la base de datos están en formato hash. Para pruebas usar la contraseña que configure el backend en su implementación de Spring Security.

## Problemas encontrados y soluciones

| Problema | Solución |
|----------|----------|
| Puerto 5432 ocupado al instalar PostgreSQL | Se usó el puerto 5433 para la instalación local |
| psql no reconocido en CMD | Se agregó C:\Program Files\PostgreSQL\18\bin al PATH del sistema |
| Advertencia de código de página en CMD (850 vs 1252) | Se evitaron tildes y caracteres especiales en los scripts SQL |
| Columnas con nombres diferentes entre el modelo Java y la BD | Se revisaron los modelos del backend y se alinearon los nombres de columnas |

---

### Capturas de pantalla del funcionamiento
# 1 Frontend
[Login](./doc/Login.png)
[Registro](./doc/Registro.png)
[Perfil](./doc/Perfil.png)
[EditarPerfil](./doc/editperfil.png)
[ListaDeDeseos](./doc/ListadeDeseos.png)
[LibrosLeidos](./doc/LibrosLeidos.png)
[LecturaActual](./doc/LecturaActual.png)

# 2 Backend
