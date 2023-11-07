-- creacion de la base de datos
CREATE DATABASE moviesdb;
-- usar
USE moviesdb;

--  crear tabla 

CREATE TABLE movie(
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2,1) NOT NULL
)

CREATE TABLE genre(
	id 	INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    
    
)