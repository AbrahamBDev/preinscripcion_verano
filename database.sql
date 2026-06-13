CREATE DATABASE unerg; 

USE unerg;

CREATE TABLE materias(
    id INT PRIMARY KEY AUTO_INCREMENT ,
    codigo varchar(10) UNIQUE NOT NULL,
    nombre varchar(30) NOT NULL
);


CREATE TABLE usuarios(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    usuario varchar(20) NOT NULL UNIQUE,
    contrasena varchar(40) NOT NULL
    rol varchar(10) NOT NULL;
);

CREATE TABLE periodos(
    id int PRIMARY KEY AUTO_INCREMENT,
    periodo varchar(10) UNIQUE not null,
    nombre varchar(30) not null
    estado_id int not null
);

CREATE TABLE estado_periodo(
    id int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(20) not null
);


CREATE TABLE inscripciones(
    id INT PRIMARY KEY AUTO_INCREMENT ,
    id_materia int not null,
    id_periodo int not null,
    id_usuario int not null
);


INSERT INTO materias (codigo, nombre)
VALUES 
("IM1421", "MATEMÁTICA I"),
("IC1222", "FUNDAMENTOS DE LA INFORMÁTICA "),
("IM1223", "LÓGICA MATEMÁTICA "),
("IH1124", "LENGUAJE Y COMUNICACIÓN"),
("IH1125", "INGLES I"),
("FC0001", "FORMACION CONSTITUCIONAL");

INSERT INTO estado_periodo (nombre)
VALUES
("activo"), ("inactivo");