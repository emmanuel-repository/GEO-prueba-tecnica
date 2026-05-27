--
-- PostgreSQL database dump
--

\restrict MZHxvdDahXJicKPKmZdvtjmEXU54wpuqa7MJW3cvQhMLq7aVz4ZmoxXrUhapXoM

-- Dumped from database version 18.3 (Homebrew)
-- Dumped by pg_dump version 18.3 (Homebrew)

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
-- Name: category_instruments; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.category_instruments (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.category_instruments OWNER TO root;

--
-- Name: category_instruments_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.category_instruments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_instruments_id_seq OWNER TO root;

--
-- Name: category_instruments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.category_instruments_id_seq OWNED BY public.category_instruments.id;


--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO root;

--
-- Name: musical_instruments; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.musical_instruments (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    description character varying(500) NOT NULL,
    color character varying(100) NOT NULL,
    size character varying(100) NOT NULL,
    brand character varying(100) NOT NULL,
    model character varying(100) NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.musical_instruments OWNER TO root;

--
-- Name: musical_instruments_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.musical_instruments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.musical_instruments_id_seq OWNER TO root;

--
-- Name: musical_instruments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.musical_instruments_id_seq OWNED BY public.musical_instruments.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: category_instruments id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.category_instruments ALTER COLUMN id SET DEFAULT nextval('public.category_instruments_id_seq'::regclass);


--
-- Name: musical_instruments id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.musical_instruments ALTER COLUMN id SET DEFAULT nextval('public.musical_instruments_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: category_instruments; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.category_instruments (id, name, description, created_at, updated_at) FROM stdin;
1	Guitarras y Bajos	Guitarras acústicas, eléctricas, clásicas y bajos eléctricos	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
2	Pianos y Teclados	Pianos acústicos, digitales, órganos y sintetizadores	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
3	Batería y Percusión	Baterías acústicas, electrónicas, cajones y percusión menor	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
4	Vientos de Madera	Flautas, clarinetes, saxofones y oboes	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
5	Vientos de Metal	Trompetas, trombones, tubas y cornetas	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
6	Cuerdas Clásicas	Violines, violas, cellos y contrabajos	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
7	Instrumentos Electrónicos	Sintetizadores, controladores MIDI y samplers	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
8	Instrumentos de Estudio	Micrófonos, interfaces de audio y monitores de estudio	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
9	Instrumentos Folklóricos	Guitarrón, vihuela, arpa y instrumentos tradicionales mexicanos	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
10	Accesorios	Cuerdas, baquetas, cejillas, afinadores y soportes	2026-05-27 04:56:54.031495	2026-05-27 04:56:54.031495
\.


--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	create users table	SQL	V1__create_users_table.sql	1755015413	root	2026-05-26 22:13:37.237496	12	t
2	2	create category instruments table	SQL	V2__create_category_instruments_table.sql	-1610570897	root	2026-05-26 22:13:37.260792	5	t
3	3	create musical instruments table	SQL	V3__create_musical_instruments_table.sql	-2037508087	root	2026-05-26 22:13:37.272829	10	t
\.


--
-- Data for Name: musical_instruments; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.musical_instruments (id, name, type, price, description, color, size, brand, model, category_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.users (id, username, email, password, role) FROM stdin;
1	admin	admin@test.com	$2a$10$12Kw8xo0gM0v9OO7lNdUZOWJxVeuv9cBl8B9FoyF2T5WBWo9WpsE6	USER
2	admin2	emmanuel.rod.her.96@gmail.com	$2a$10$r4yFyDZ84Giaq1tOM0QKpepgpQ6lDfU4EpuuotZtNS7LJM2Rudbhe	USER
\.


--
-- Name: category_instruments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.category_instruments_id_seq', 20, true);


--
-- Name: musical_instruments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.musical_instruments_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: category_instruments category_instruments_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.category_instruments
    ADD CONSTRAINT category_instruments_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: musical_instruments musical_instruments_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.musical_instruments
    ADD CONSTRAINT musical_instruments_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- Name: musical_instruments musical_instruments_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.musical_instruments
    ADD CONSTRAINT musical_instruments_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category_instruments(id);


--
-- PostgreSQL database dump complete
--

\unrestrict MZHxvdDahXJicKPKmZdvtjmEXU54wpuqa7MJW3cvQhMLq7aVz4ZmoxXrUhapXoM

