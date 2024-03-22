--
-- PostgreSQL database cluster dump
--

-- Started on 2024-03-22 16:58:57

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-03-22 16:58:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2024-03-22 16:58:57

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-03-22 16:58:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 3 (class 3079 OID 16419)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16406)
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    username character varying(50),
    email character varying(100),
    password character varying(255),
    full_name character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16448)
-- Name: publication_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publication_likes (
    publication_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.publication_likes OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16399)
-- Name: publications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publications (
    title character varying(60),
    publication_date timestamp without time zone,
    author character varying(20),
    info_1 integer,
    info_2 integer,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content text
);


ALTER TABLE public.publications OWNER TO postgres;

--
-- TOC entry 4713 (class 2606 OID 16418)
-- Name: accounts accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- TOC entry 4715 (class 2606 OID 16440)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (uuid);


--
-- TOC entry 4717 (class 2606 OID 16416)
-- Name: accounts accounts_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_username_key UNIQUE (username);


--
-- TOC entry 4719 (class 2606 OID 16452)
-- Name: publication_likes publication_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication_likes
    ADD CONSTRAINT publication_likes_pkey PRIMARY KEY (publication_id, user_id);


--
-- TOC entry 4711 (class 2606 OID 16447)
-- Name: publications publications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_pkey PRIMARY KEY (uuid);


--
-- TOC entry 4720 (class 2606 OID 16453)
-- Name: publication_likes publication_likes_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication_likes
    ADD CONSTRAINT publication_likes_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publications(uuid);


--
-- TOC entry 4721 (class 2606 OID 16458)
-- Name: publication_likes publication_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication_likes
    ADD CONSTRAINT publication_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.accounts(uuid);


-- Completed on 2024-03-22 16:58:58

--
-- PostgreSQL database dump complete
--

-- Completed on 2024-03-22 16:58:58

--
-- PostgreSQL database cluster dump complete
--

