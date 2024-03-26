--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5 (Ubuntu 15.5-0ubuntu0.23.04.1)
-- Dumped by pg_dump version 16.2

-- Started on 2024-03-26 21:49:07

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
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16446)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_utilisateur uuid,
    id_publication uuid,
    date_publication timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    contenu text
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16416)
-- Name: publication_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publication_likes (
    publication_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.publication_likes OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16419)
-- Name: publications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publications (
    title character varying(60),
    publication_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    author character varying(20),
    time_to_cook integer,
    n_personnes integer,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content text,
    user_id uuid
);


ALTER TABLE public.publications OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16409)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying(20),
    email character varying(100),
    password character varying(255),
    full_name character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3390 (class 0 OID 16446)
-- Dependencies: 219
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments VALUES ('7b742243-78f1-4e91-a9b6-3087be83a42a', '8945d984-65ed-4e3e-a9d1-9d2686cbd36a', 'e8dad2cd-52db-40f1-8a1d-917734dfd1a8', '2024-03-24 08:55:40.891911', 'Le meilleur xfghsth que j''ai jamais manger.');
INSERT INTO public.comments VALUES ('7bd6240c-d282-4ae8-a62d-b9474db4ecfb', '1b23955c-8033-41da-a657-15cb49bd547b', '3da3b4c7-a772-4588-9565-44a6d884c399', '2024-03-24 12:22:16.702372', 'Et ça c''est unique !!');
INSERT INTO public.comments VALUES ('ea64c75e-951f-4d3f-9007-d2a2e257ca6a', '1b23955c-8033-41da-a657-15cb49bd547b', 'e8dad2cd-52db-40f1-8a1d-917734dfd1a8', '2024-03-24 13:20:44.951849', 'très bon mais ça manquait un peu de sfdqjkl');
INSERT INTO public.comments VALUES ('08649e11-06ac-4b2b-b31c-941abaf74d20', '166e8f82-49ac-473b-9d3a-6c8dc5f99eb9', 'e8dad2cd-52db-40f1-8a1d-917734dfd1a8', '2024-03-25 07:25:34.109419', 'Le Hfuakfjbzb rajoute vraiment un truc par rapport à la recette originale');
INSERT INTO public.comments VALUES ('f24d7cad-55e5-4a35-865d-a2dec16dd580', '166e8f82-49ac-473b-9d3a-6c8dc5f99eb9', '3da3b4c7-a772-4588-9565-44a6d884c399', '2024-03-25 07:26:46.242756', 'Succulent ! ');


--
-- TOC entry 3388 (class 0 OID 16416)
-- Dependencies: 217
-- Data for Name: publication_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.publication_likes VALUES ('e8dad2cd-52db-40f1-8a1d-917734dfd1a8', '1b23955c-8033-41da-a657-15cb49bd547b');
INSERT INTO public.publication_likes VALUES ('3da3b4c7-a772-4588-9565-44a6d884c399', '1b23955c-8033-41da-a657-15cb49bd547b');
INSERT INTO public.publication_likes VALUES ('3da3b4c7-a772-4588-9565-44a6d884c399', '891fb6bc-c41b-4a26-808c-32422269ff43');


--
-- TOC entry 3389 (class 0 OID 16419)
-- Dependencies: 218
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.publications VALUES ('xfghsth', '2024-03-23 16:40:03.935326', 'admin', 45, 510, 'e8dad2cd-52db-40f1-8a1d-917734dfd1a8', '## Ingrédients

- qegr
- qsfdgd

## Préparation

SGEF', '891fb6bc-c41b-4a26-808c-32422269ff43');
INSERT INTO public.publications VALUES ('Jus de Mynthos', '2024-03-24 12:21:55.792079', 'Justin', 69, 42, '3da3b4c7-a772-4588-9565-44a6d884c399', '## Ingrédients

- un bon gros bol de CUM
- du jus de fruits

## Préparation

Mélangez le bon gros bol de cum avec le jus de fruits.

Dégustez.

Touchez votre bangala.





:)', '1b23955c-8033-41da-a657-15cb49bd547b');


--
-- TOC entry 3387 (class 0 OID 16409)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('admin', 'admin@admin.admin', '$2a$10$LHk8BLQ9SqXcHRdArTI5lehIjwpJDxkzTWcWrpv4nf1FjdD2a3ta.', 'admin', '2024-03-22 23:34:29.384477', '891fb6bc-c41b-4a26-808c-32422269ff43');
INSERT INTO public.users VALUES ('Lucy', 'damientoinitru@gmail.com', '$2a$10$OFSTOB9OeGzBR//kKem.teP3wKiTLZKWj8Q1rsXqvtaK0tApjbg9G', 'Lucy', '2024-03-22 23:42:33.585004', 'b1f4ef31-10c9-4ee1-882e-c00515a2a9fc');
INSERT INTO public.users VALUES ('CookMaster', 'jtb1375@gmail.com', '$2a$10$.lqM6aIh./7arujpJelAa.jsjAeMxwjaWTIQoXGne88LtuujgUkbq', 'Jérôme Basson', '2024-03-24 08:47:59.11884', '8945d984-65ed-4e3e-a9d1-9d2686cbd36a');
INSERT INTO public.users VALUES ('Justin', 'test@test.fr', '$2a$10$WT.qrEsKYxixm.IxsV196eZUCY5liJu0f5/vvckyEI8d7dKo43gRi', 'Gsjn', '2024-03-24 12:19:56.104251', '1b23955c-8033-41da-a657-15cb49bd547b');
INSERT INTO public.users VALUES ('Majo', 'mariejose.basson@sfr.fr', '$2a$10$UA6HkLsCmzM/HlRt0wOcmuk9.CyRSw1Ljh7sq.ZSOrevzVvUTPA8.', 'Basson ', '2024-03-24 16:45:34.793444', '03776be2-7e57-4a07-9391-4d0f7acf29ab');
INSERT INTO public.users VALUES ('Nthnl', 'nathanaool.basson@gmail.com', '$2a$10$YGvekDVA1L/euP79PcNbW.Cur0VIo8tSq1.VkgFM76koeFlwJZv5y', 'Nathanaël ', '2024-03-25 07:24:19.948362', '166e8f82-49ac-473b-9d3a-6c8dc5f99eb9');
INSERT INTO public.users VALUES ('marionn_lft', 'marion05.lefort@gmail.com', '$2a$10$k0A8SCfIfbusupEGP4bg8uPGnMiYnA5FMWHF.EjRhE1wqZh7v3S5K', 'Lefort', '2024-03-25 08:56:28.973333', 'fd248858-d1ef-4f0a-843b-38b6444df547');


--
-- TOC entry 3229 (class 2606 OID 16426)
-- Name: users accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- TOC entry 3231 (class 2606 OID 16428)
-- Name: users accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (uuid);


--
-- TOC entry 3233 (class 2606 OID 16471)
-- Name: users accounts_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT accounts_username_key UNIQUE (username);


--
-- TOC entry 3239 (class 2606 OID 16454)
-- Name: comments commentaires_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT commentaires_pkey PRIMARY KEY (uuid);


--
-- TOC entry 3235 (class 2606 OID 16432)
-- Name: publication_likes publication_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication_likes
    ADD CONSTRAINT publication_likes_pkey PRIMARY KEY (publication_id, user_id);


--
-- TOC entry 3237 (class 2606 OID 16434)
-- Name: publications publications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_pkey PRIMARY KEY (uuid);


--
-- TOC entry 3243 (class 2606 OID 16460)
-- Name: comments commentaires_id_publication_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT commentaires_id_publication_fkey FOREIGN KEY (id_publication) REFERENCES public.publications(uuid);


--
-- TOC entry 3244 (class 2606 OID 16455)
-- Name: comments commentaires_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT commentaires_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES public.users(uuid);


--
-- TOC entry 3242 (class 2606 OID 16465)
-- Name: publications fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(uuid);


--
-- TOC entry 3240 (class 2606 OID 16435)
-- Name: publication_likes publication_likes_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication_likes
    ADD CONSTRAINT publication_likes_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publications(uuid);


--
-- TOC entry 3241 (class 2606 OID 16440)
-- Name: publication_likes publication_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication_likes
    ADD CONSTRAINT publication_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(uuid);


-- Completed on 2024-03-26 21:49:08

--
-- PostgreSQL database dump complete
--

