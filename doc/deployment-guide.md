# Guía de despliegue - Book Journal Back-end

Esta guía explica cómo llevar el backend a otro equipo usando Docker y `docker-compose`.

## 1. Requisitos

Esta sección enumera dependencias mínimas para ejecutar y desarrollar el proyecto. El objetivo es permitir que un desarrollador nuevo configure un entorno reproducible sin conjeturas.

- Git
- JDK 21
- Maven 3.8+
- Docker
- docker-compose
- PostgreSQL (opcional, puede usar el contenedor postgres en docker-compose)

## 2. Estructura clave del proyecto

Aquí se documenta la organización de archivos más relevante para que quien llegue pueda localizar rápidamente Dockerfile, db config y código fuente principal.

```
back-end/
  Dockerfile
  docker-compose.yml
  src/main/java/...controller...
  src/main/resources/application.properties
  pom.xml
```

## 2.1 URLs de acceso después de desplegar

Estas direcciones permiten verificar el servicio ya levantado y son puntos de partida para pruebas manuales y validación de la integración con frontend.

- Backend: `http://localhost:8080`
- Endpoints REST: `http://localhost:8080/api/*`
- pgAdmin: `http://localhost:5050`

## 3. Configuración del datasource (variables de entorno)

Este apartado muestra la parametrización de conexión a base de datos a través de variables de entorno en lugar de hardcodeo en el código, lo que facilita mover a distintos entornos (dev/test/prod).
En `src/main/resources/application.properties`:
```
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
```

Con `docker-compose`, ya están definidas:

- `PGADMIN_DEFAULT_EMAIL: admin@admin.com`
- `PGADMIN_DEFAULT_PASSWORD: admin`

- `SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/book_journal`
- `SPRING_DATASOURCE_USERNAME=postgres`
- `SPRING_DATASOURCE_PASSWORD=postgres`

No se necesita editar si se usa el compose oficial. Toca conectar el servidor con la credeciales username=postgres y password=postgres y conectarla como hostname=postgres-book.

## 4. Dockerfile explicado

Explica la imagen base y las instrucciones que se usan para empaquetar y lanzar la aplicación en un contenedor Docker. Es el pivote entre el artefacto Java y el entorno de ejecución.

`back-end/Dockerfile`:

```
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY target/back-end-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

- Base: JDK 21 (Jammy)
- Copia JAR empaquetado desde `target`
- Expone puerto 8080 para API
- Ejecuta la app en modo standalone

## 5. docker-compose.yml explicado

Esta sección explica por qué se utiliza `docker-compose`: orquestar servicios dependientes (backend+DB+pgadmin) con un solo comando y configuración versionada.

Servicios definidos:
1. `postgres` (DB)
   - Imagen `postgres:15`
   - DB al 5432
   - Volumen `postgres_data`
2. `backend`
   - build desde carpeta actual
   - depende de postgres
   - expone 8080 local
   - variables de conexión a DB
3. `pgadmin`
   - imagen `dpage/pgadmin4`
   - expone 5050 local

Volúmenes:
- `postgres_data`: persistencia postgres

## 6. Pasos para desplegar en un nuevo equipo (modo Docker Compose)

Estos pasos muestran un flujo reproducible para pasar del código fuente a un backend funcionando. Cada comando tiene la explicación de por qué se ejecuta:

1. Clonar repo:
```
git clone https://github.com/PaulaRiveros2203/Book-Journal.git
cd Book_Journal/back-end
```

2. Compilar y empaquetar JAR:
```
./mvnw clean package -DskipTests
```
- `clean`: elimina artefactos previos.
- `package`: crea el JAR para Docker.

3. Iniciar servicios con compose:
```
docker-compose up -d --build
```
- `-d` ejecuta en segundo plano.
- `--build` fuerza recompilado de la imagen backend.

4. Ver logs:
```
docker-compose logs -f backend
```
- Verifica arranque correcto y errores de conexión DB.

5. Probar API:
- `GET http://localhost:8080/api/libros`
- `GET http://localhost:8080/api/usuarios/1`

6. Parar servicios:
```
docker-compose down
```
- Detiene y elimina redes/containers (no volúmenes por defecto).

## 7. Variantes de despliegue

Estas variantes cubren casos cuando no se usa docker-compose, por ejemplo un servidor que solo ejecuta el contenedor backend contra una base de datos externa.

### 7.1 Sin docker-compose (solo contenedor backend)

1. Iniciar postgres local/manual
2. `SPRING_DATASOURCE_URL` etc. con `-e` o `.env`
3. Construir imagen:
```
docker build -t book-journal-backend .
```
4. Ejecutar:
```
docker run -d --name spring-book -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:5432/book_journal \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=postgres \
  book-journal-backend
```

### 7.2 Importante en equipo nuevo

- Reemplazar `postgres` por host real de DB si no es contenedor.
- Usar perfiles de Spring (`--spring.profiles.active=prod`) si se añade.
- Ajustar `spring.jpa.hibernate.ddl-auto=update` en producción por seguridad.

## 8. Verificación de integración con frontend

Esta sección indica cómo comprobar que el backend está listo para el cliente web y qué ajustes de seguridad se deben considerar. El frontend debe llamar al mismo hostname y puerto, o reconfigurarse si se despliega en dominio diferente.

- El frontend consume endpoints con base `http://localhost:8080`.
- Asegurar CORS: `@CrossOrigin("*")` está activo en controladores.

## 9. Puntos de mejora para producción
- Usar HTTPS y credenciales seguras.
- Hashear `Usuario.password` (BCrypt) y no devolverlo en respuestas.
- Añadir autenticación JWT/Session.
- Añadir validación con `@Valid` y `@ControllerAdvice`.
- Transformar respuestas en `ResponseEntity` con estados 201/204/404.

## 10. Comandos útiles
- Iniciar: `docker-compose up --build -d`
- Estado: `docker-compose ps`
- Logs: `docker-compose logs -f backend`
- Reiniciar: `docker-compose restart`
- Eliminar: `docker-compose down -v`

# Despliegue de Backend en Google Cloud Run

Se describe el proceso completo para desplegar un backend (por ejemplo, una aplicación Spring Boot) en la nube utilizando **Google Cloud Run**.

Cloud Run permite ejecutar aplicaciones contenidas en Docker sin necesidad de administrar servidores, lo que simplifica enormemente el despliegue y escalabilidad.

---

## ¿Qué es Cloud Run?

**Cloud Run** es un servicio serverless de Google Cloud que permite ejecutar contenedores de forma automática.

### mCaracterísticas principales:

- No necesitas administrar servidores
- Escalado automático
- Pago por uso
- Integración con otros servicios de Google Cloud
- Despliegue rápido desde contenedores Docker

---

## Flujo general

El proceso de despliegue sigue estos pasos:

1. Autenticarse en Google Cloud
2. Configurar el proyecto
3. Construir la aplicación
4. Crear una imagen Docker
5. Subir la imagen
6. Desplegar en Cloud Run

---

## Paso a paso con explicación

### 1. Ubicarse en el backend

```bash
cd C:\Users\juanj\Desktop\Juan\Book-Journal\back-end
```

Nos ubicamos en la carpeta donde se encuentra el proyecto backend.

---

### 2. Iniciar sesión en Google Cloud

```bash
gcloud auth login
```

Este comando autentica tu cuenta de Google en la terminal.

Se abrirá el navegador para seleccionar tu cuenta.

---

### 3. Seleccionar el proyecto

```bash
gcloud config set project test-489423
```

Define el proyecto en el que se trabajará.

Todos los recursos se crearán dentro de este proyecto.

---

### 4. Habilitar APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable sqladmin.googleapis.com
```

Se habilitan los servicios necesarios:

- Cloud Run → ejecutar la aplicación
- Artifact Registry → almacenar imágenes Docker
- Cloud Build → construir imágenes
- Cloud SQL → base de datos

Solo se hace una vez.

---

### 5. Crear repositorio Docker

```bash
gcloud artifacts repositories create backend-repo \
--repository-format=docker \
--location=us-central1
```

Crea un repositorio para almacenar imágenes Docker en Google Cloud.

---

### 6. Autenticar Docker

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```

Permite que Docker pueda subir imágenes al repositorio de Google Cloud.

---

### 7. Compilar el backend

```bash
.\mvnw.cmd clean package -DskipTests
```

Genera el archivo `.jar` ejecutable de la aplicación.

---

### 8. Crear imagen Docker

```bash
docker build -t us-central1-docker.pkg.dev/test-489423/backend-repo/backend-book .
```

Construye una imagen Docker que contiene:

- El backend
- El entorno de ejecución
- Dependencias necesarias

---

### 9. Subir la imagen

```bash
docker push us-central1-docker.pkg.dev/test-489423/backend-repo/backend-book
```

Sube la imagen al repositorio en la nube.

---

### 10. Desplegar en Cloud Run

```bash
gcloud run deploy backend-book \
--image us-central1-docker.pkg.dev/test-489423/backend-repo/backend-book \
--platform managed \
--region us-central1 \
--allow-unauthenticated \
--port 8080 \
--add-cloudsql-instances test-489423:us-central1:book-journal-db \
--set-env-vars "SPRING_DATASOURCE_URL=jdbc:postgresql://localhost/libreria_online?socketFactory=com.google.cloud.sql.postgres.SocketFactory&cloudSqlInstance=test-489423:us-central1:book-journal-db,SPRING_DATASOURCE_USERNAME=bookjournal,SPRING_DATASOURCE_PASSWORD=BookJournal2026*"
```

Este comando:

- Despliega la aplicación
- Configura el puerto
- Conecta con la base de datos
- Define variables de entorno

---

## Resultado

Se obtiene una URL pública como:

```
https://backend-book-xxxxx.a.run.app
```

La API queda disponible en internet.

---

## Flujo de actualización

Cada vez que cambias el código:

```bash
.\mvnw.cmd clean package -DskipTests
docker build -t ...
docker push ...
gcloud run deploy ...
```

---

## ¿Por qué usar Cloud Run?

### Ventajas principales

#### 1. Serverless
No necesitas administrar servidores.

#### 2. Escalabilidad automática
Se adapta a la cantidad de usuarios automáticamente.

#### 3. Pago por uso
Solo pagas cuando tu aplicación está en uso.

#### 4. Despliegue rápido
Permite subir aplicaciones en minutos.

#### 5. Integración con servicios de Google
Se conecta fácilmente con Cloud SQL, IAM, etc.

---

## Errores comunes

- Docker no está ejecutándose
- Puerto no configurado correctamente
- Problemas de conexión a la base de datos
- Nombre incorrecto de la imagen
