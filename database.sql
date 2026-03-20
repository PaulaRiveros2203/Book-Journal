-- ============================================================
-- Book-Journal - Base de datos PostgreSQL
-- ============================================================
-- Ejecutar con:
-- psql -U postgres -p 5433 -f database.sql

-- Crear la base de datos
CREATE DATABASE libreria_online;

-- Conectarse a la base de datos
\c libreria_online;

-- ============================================================
-- TABLA: usuarios
-- Almacena los datos de registro de cada usuario
-- ============================================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLA: libros_leidos
-- Almacena los libros que cada usuario ha leído
-- ============================================================
CREATE TABLE libros_leidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(150),
    genero VARCHAR(100),
    fecha_lectura DATE,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    resena TEXT,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLA: libros_deseados
-- Almacena la lista de deseos de libros de cada usuario
-- ============================================================
CREATE TABLE libros_deseados (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(150),
    genero VARCHAR(100),
    prioridad INT CHECK (prioridad BETWEEN 1 AND 3),
    notas TEXT,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
