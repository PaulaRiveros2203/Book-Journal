# 📚 Book-Journal - Base de Datos

## Descripción
Base de datos PostgreSQL para la aplicación **Book-Journal**, una librería online que permite a los usuarios registrarse, llevar un registro de libros leídos y gestionar su lista de libros deseados.

---

## Requisitos
- PostgreSQL 16 o superior
- Puerto: `5433` (o `5432` si no hay conflictos)

---

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

## Instalación

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

## Diagrama de relaciones

```
usuarios
   │
   ├──── libros_leidos (usuario_id → usuarios.id)
   │
   └──── libros_deseados (usuario_id → usuarios.id)
```

---

## Desarrollado por
Proyecto colaborativo - Book-Journal
