# Book Journal — Base de Datos

## Descripción
Base de datos PostgreSQL para la aplicación **Book Journal**, una librería online que permite a los usuarios registrarse, llevar un registro de libros leídos y gestionar su lista de libros deseados.

---

## Responsable
**Paula Riveros** — Diseño, configuración y despliegue de la base de datos

---

## Stack tecnológico
- **Motor de base de datos:** PostgreSQL 18
- **Servicio cloud:** Google Cloud SQL
- **Cliente local:** pgAdmin 4
- **Puerto local:** 5433
- **Puerto cloud:** 5432

---

## Estructura del repositorio

```
database/
├── database.sql          # Script completo: tablas + datos de prueba
├── README_database.md    # Este archivo
└── diagrama_erd.html     # Diagrama Entidad-Relación (fondo oscuro)
```

---

## Modelo de datos

### Tabla `usuarios`
Almacena los datos de registro de cada usuario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | Clave primaria, autoincremental |
| nombre | VARCHAR(100) | Nombre del usuario |
| apellido | VARCHAR(100) | Apellido del usuario |
| email | VARCHAR(150) | Email único por usuario |
| contraseña | VARCHAR(255) | Contraseña encriptada (hash) |
| fecha_registro | TIMESTAMP | Se registra automáticamente |
| fecha_nacimiento | VARCHAR(50) | Fecha de nacimiento |
| genero_favorito | VARCHAR(100) | Género literario favorito |
| promedio_lectura | VARCHAR(50) | Promedio de libros por mes |

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
| resena | TEXT | Reseña del usuario |
| inicio | DATE | Fecha de inicio de lectura |
| fin | DATE | Fecha de fin de lectura |
| calificacion | INT | Calificación del 1 al 5 |
| fecha_agregado | TIMESTAMP | Se registra automáticamente |

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
| fecha_agregado | TIMESTAMP | Se registra automáticamente |

---

## Diagrama de relaciones

```
usuarios
   │
   ├──── libros_leidos (usuario_id → usuarios.id)
   │         ON DELETE CASCADE
   │
   └──── libros_deseados (usuario_id → usuarios.id)
             ON DELETE CASCADE
```

---

## Configuración local

### Requisitos
- PostgreSQL 18 instalado
- Puerto disponible (se usó 5433 por conflicto con instalación previa)

### Ejecutar el script SQL
```bash
psql -U postgres -p 5433 -f database/database.sql
```

### Verificar tablas
```sql
\c libreria_online
\dt
```

---

## Configuración en la nube

### Servicio
- **Proveedor:** Google Cloud
- **Servicio:** Cloud SQL
- **Motor:** PostgreSQL 18
- **Instancia:** book-journal-db
- **IP pública:** 34.66.88.86
- **Puerto:** 5432
- **Base de datos:** libreria_online

### Conexión desde Spring Boot
Agregar en `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://34.66.88.86:5432/libreria_online
spring.datasource.username=bookjournal
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

---

## Credenciales de prueba

Usuarios insertados como datos de prueba para desarrollo y testing:

| Nombre | Email | Género favorito |
|--------|-------|-----------------|
| Paula Riveros | paula@bookjournal.com | Fantasia |
| Carlos Mendoza | carlos@bookjournal.com | Ciencia Ficcion |
| Laura Torres | laura@bookjournal.com | Romance |

> **Nota:** Las contraseñas en la base de datos están en formato hash. Para pruebas usar la contraseña que configure el backend en su implementación de Spring Security.

---

## Datos de prueba

### Libros leídos insertados
| Usuario | Título | Autor | Calificación |
|---------|--------|-------|--------------|
| Paula | Harry Potter y la Piedra Filosofal | J.K. Rowling | 5/5 |
| Paula | El Señor de los Anillos | J.R.R. Tolkien | 5/5 |
| Carlos | Dune | Frank Herbert | 4/5 |
| Carlos | 1984 | George Orwell | 5/5 |
| Laura | Orgullo y Prejuicio | Jane Austen | 5/5 |

### Libros deseados insertados
| Usuario | Título | Autor | Prioridad |
|---------|--------|-------|-----------|
| Paula | Las Cronicas de Narnia | C.S. Lewis | 1 |
| Paula | El Nombre del Viento | Patrick Rothfuss | 2 |
| Carlos | Fundacion | Isaac Asimov | 1 |
| Laura | Jane Eyre | Charlotte Bronte | 1 |
| Laura | Cumbres Borrascosas | Emily Bronte | 2 |

---

## Problemas encontrados y soluciones

| Problema | Solución |
|----------|----------|
| Puerto 5432 ocupado al instalar PostgreSQL | Se usó el puerto 5433 para la instalación local |
| psql no reconocido en CMD | Se agregó C:\Program Files\PostgreSQL\18\bin al PATH del sistema |
| Advertencia de código de página en CMD (850 vs 1252) | Se evitaron tildes y caracteres especiales en los scripts SQL |
| Columnas con nombres diferentes entre el modelo Java y la BD | Se revisaron los modelos del backend y se alinearon los nombres de columnas |

---

## Pasos realizados

1. Instalación de PostgreSQL 18 en Windows (puerto 5433)
2. Configuración del PATH del sistema
3. Creación de la base de datos libreria_online
4. Creación de las tablas usuarios, libros_leidos y libros_deseados
5. Actualización de tablas para alinear con los modelos del backend (Spring Boot)
6. Inserción de datos de prueba
7. Creación de instancia PostgreSQL en Google Cloud SQL
8. Configuración de red autorizada (0.0.0.0/0)
9. Creación de usuario bookjournal en Cloud SQL
10. Importación del script SQL al Cloud SQL via Cloud Storage
11. Generación del diagrama ERD y diagrama de arquitectura

---

*Proyecto académico — Book Journal 2026*
