--
-- PostgreSQL database dump
--

\restrict UkHmAJhCA0z4mPlxEAsKNLQfbwTPfqreID2qYeb7mmc0iUep6bO9aZhyQC1lwE1

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: libros_deseados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.libros_deseados (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    autor character varying(150),
    genero character varying(100),
    prioridad integer,
    notas text,
    fecha_agregado timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT libros_deseados_prioridad_check CHECK (((prioridad >= 1) AND (prioridad <= 3)))
);


ALTER TABLE public.libros_deseados OWNER TO postgres;

--
-- Name: libros_deseados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.libros_deseados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.libros_deseados_id_seq OWNER TO postgres;

--
-- Name: libros_deseados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.libros_deseados_id_seq OWNED BY public.libros_deseados.id;


--
-- Name: libros_leidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.libros_leidos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    autor character varying(150),
    genero character varying(100),
    fecha_lectura date,
    calificacion integer,
    resena text,
    fecha_agregado timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    inicio date,
    fin date,
    CONSTRAINT libros_leidos_calificacion_check CHECK (((calificacion >= 1) AND (calificacion <= 5)))
);


ALTER TABLE public.libros_leidos OWNER TO postgres;

--
-- Name: libros_leidos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.libros_leidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.libros_leidos_id_seq OWNER TO postgres;

--
-- Name: libros_leidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.libros_leidos_id_seq OWNED BY public.libros_leidos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    "contrase¤a" character varying(255) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_nacimiento character varying(50),
    genero_favorito character varying(100),
    promedio_lectura character varying(50)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: libros_deseados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros_deseados ALTER COLUMN id SET DEFAULT nextval('public.libros_deseados_id_seq'::regclass);


--
-- Name: libros_leidos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros_leidos ALTER COLUMN id SET DEFAULT nextval('public.libros_leidos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: libros_deseados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.libros_deseados (id, usuario_id, titulo, autor, genero, prioridad, notas, fecha_agregado) FROM stdin;
1	1	Las Cronicas de Narnia	C.S. Lewis	Fantasia	1	Recomendado por un amigo	2026-03-23 08:27:52.227827
2	1	El Nombre del Viento	Patrick Rothfuss	Fantasia	2	Saga muy popular	2026-03-23 08:27:52.227827
3	2	Fundacion	Isaac Asimov	Ciencia Ficcion	1	Clasico imprescindible	2026-03-23 08:27:52.227827
4	3	Jane Eyre	Charlotte Bronte	Romance	1	Lo quiero leer pronto	2026-03-23 08:27:52.227827
5	3	Cumbres Borrascosas	Emily Bronte	Romance	2	Continuacion de Jane Eyre	2026-03-23 08:27:52.227827
\.


--
-- Data for Name: libros_leidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.libros_leidos (id, usuario_id, titulo, autor, genero, fecha_lectura, calificacion, resena, fecha_agregado, inicio, fin) FROM stdin;
1	1	Harry Potter y la Piedra Filosofal	J.K. Rowling	Fantasia	\N	5	Magico e increible	2026-03-23 08:27:30.520191	2024-01-05	2024-01-15
2	1	El Senor de los Anillos	J.R.R. Tolkien	Fantasia	\N	5	Una obra maestra	2026-03-23 08:27:30.520191	2024-02-01	2024-02-20
3	2	Dune	Frank Herbert	Ciencia Ficcion	\N	4	Complejo pero fascinante	2026-03-23 08:27:30.520191	2024-01-10	2024-02-05
4	2	1984	George Orwell	Distopia	\N	5	Perturbador y brillante	2026-03-23 08:27:30.520191	2024-03-01	2024-03-10
5	3	Orgullo y Prejuicio	Jane Austen	Romance	\N	5	Clasico imprescindible	2026-03-23 08:27:30.520191	2024-02-14	2024-02-28
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, apellido, email, "contrase¤a", fecha_registro, fecha_nacimiento, genero_favorito, promedio_lectura) FROM stdin;
1	Paula	Riveros	paula@bookjournal.com	$2a$10$hasheada1	2026-03-23 08:27:07.900491	1999-03-15	Fantasia	3 libros/mes
2	Carlos	Mendoza	carlos@bookjournal.com	$2a$10$hasheada2	2026-03-23 08:27:07.900491	1995-07-22	Ciencia Ficcion	2 libros/mes
3	Laura	Torres	laura@bookjournal.com	$2a$10$hasheada3	2026-03-23 08:27:07.900491	2001-11-05	Romance	4 libros/mes
\.


--
-- Name: libros_deseados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.libros_deseados_id_seq', 5, true);


--
-- Name: libros_leidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.libros_leidos_id_seq', 5, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- Name: libros_deseados libros_deseados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros_deseados
    ADD CONSTRAINT libros_deseados_pkey PRIMARY KEY (id);


--
-- Name: libros_leidos libros_leidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros_leidos
    ADD CONSTRAINT libros_leidos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: libros_deseados libros_deseados_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros_deseados
    ADD CONSTRAINT libros_deseados_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: libros_leidos libros_leidos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros_leidos
    ADD CONSTRAINT libros_leidos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict UkHmAJhCA0z4mPlxEAsKNLQfbwTPfqreID2qYeb7mmc0iUep6bO9aZhyQC1lwE1

