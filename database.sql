CREATE DATABASE unerg; 

USE unerg;

CREATE TABLE materias(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    codigo varchar(10) UNIQUE NOT NULL,
    nombre varchar(30) NOT NULL
);


CREATE TABLE usuarios(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    usuario varchar(20) NOT NULL UNIQUE,
    contrasena varchar(40) NOT NULL
    rol varchar(10) NOT NULL;
);

CREATE TABLE periodo(
    id int PRIMARY KEY AUTO_INCREMENT not null,
    periodo varchar(10) UNIQUE not null,
    nombre varchar(30) not null
)


CREATE TABLE inscripciones(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_materia int not null,
    id_periodo int not null,
    id_usuario int not null

);
