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
    correo varchar(320) NOT NULL UNIQUE,
    contrasena varchar(40) NOT NULL,
    rol_id int not null
);

CREATE TABLE roles(
    id int PRIMARY key AUTO_INCREMENT,
    nombre varchar(20) not null

);

CREATE TABLE periodos(
    id int PRIMARY KEY AUTO_INCREMENT,
    periodo varchar(10) UNIQUE not null,
    nombre varchar(30) not null,
    fecha_comienzo date not null,
    fecha_final date not null,
    estado_id int not null
    
);

INSERT INTO periodos(periodo,nombre,estado_id,fecha_comienzo,fecha_final) 
VALUES ("2022-1","verano",1,"2022-02-02", "2022-03-03");

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
("IM1421", "MATEMÁTICA I", 5),
("IC1222", "FUNDAMENTOS DE LA INFORMÁTICA", 3),
("IM1223", "LÓGICA MATEMÁTICA", 3),
("IH1124", "LENGUAJE Y COMUNICACIÓN", 2),
("IH1125", "INGLES I", 2),
("FC0001", "FORMACION CONSTITUCIONAL", 2),
("ED0001", "ECONOMIA DIGITAL EN VENEZUELA", 3),
("DP0001", "DEPORTE", 2),
("IM2421", "MATEMÁTICA II", 5),
("IB2322", "FÍSICA I", 4),
("IC2323","ALGORITMOS I", 3),
("IH2124", "PROBLEMÁTICA CIENTÍFICA TECNOLÓGICA", 2),
("IH2125", "INGLES II", 2),
("IME120", "ELECTIVA I", 2),
("AC0001", "ARTE Y CULTURA", 2),
("IM3421", "MATEMÁTICA III", 5),
("IB3322", "FÍSICA II", 4),
("IC3323", "ALGORITMOS II", 3),
("IC3244", "PROGRAMACIÓN I", 4),
("IH3125", "METODOLOGÍA Y TÉCNICAS DE INVESTIGACIÓN", 2),
("IME620", "ELECTIVA II", 2),
("IM4421", "MATEMÁTICA IV", 5),
("IM5421", "PROBABILIDAD Y ESTADÍSTICA", 3),
("IM4323", "ESTRUCTURAS DISCRETAS I", 4),
("IC4244", "PROGRAMACIÓN II", 4),
("IS4225", "BASE DE DATOS", 3),
("IME720", "ELECTIVA III", 2),
("IC5422", "ORGANIZACIÓN DEL COMPUTADOR", 5),
("IM5221", "ALGEBRA BOOLEANA", 3),
("IM5323", "ESTRUCTURAS DISCRETAS II", 4),
("IC5244", "PROGRAMACIÓN III", 4),
("IS5205", "TEORÍA DE SISTEMAS", 2),
("IMEIV", "ELECTIVA IV", 2),
("IC6322", "ARQUITECTURA DEL COMPUTADOR", 4),
("IM6243", "MÉTODOS NUMÉRICOS", 4),
("ID6241", "INVESTIGACIÓN DE OPERACIONES", 4),
("ID6124", "INGENIERÍA ECONÓMICA", 2),
("IS6425", "SISTEMAS DE INFORMACIÓN I", 5),
("IMEV", "ELECTIVA V", 2),
("IC7322", "SISTEMAS OPERATIVOS", 4),
("ID7322", "CONTROL DE PROYECTOS", 4),
("ID7323", "ORGANIZACIÓN Y GESTIÓN EMPRESARIAL", 4),
("IS7244", "TRADUCTORES E INTERPRETES", 4),
("IS7324", "SISTEMAS DE INFORMACIÓN II", 5),
("IT8241", "REDES", 4),
("ID8082", "PASANTÍAS", 4),
("EA", "ELECTIVA DE ÁREA I", 4),
("IS8243", "LENGUAJES DE PROGRAMACIÓN", 4),
("IS8424", "SISTEMAS DE INFORMACIÓN III", 5),
("IT9241", "SISTEMAS DISTRIBUIDOS", 4),
("PG9083", "PROYECTO DE GRADO I", 4),
("EA0244", "ELECTIVA DE ÁREA II", 4),
("EL9325", "ELECTIVA LIBRE I", 4),
("IH9202", "ÉTICA PROFESIONAL", 2),
("ID0221", "GERENCIA DE PROYECTOS", 3),
("PG0083", "PROYECTO DE GRADO II", 4),
("EA9244", "ELECTIVA DE ÁREA III", 4),
("EL", "ELECTIVA LIBRE II", 3),
("IS0222", "INFORMÁTICA EDUCATIVA", 3);

INSERT INTO estado_periodo (nombre)
VALUES
("activo"), ("inactivo");

INSERT INTO roles (nombre)
VALUES
("usuario"), ("admin");