-- create database
DROP DATABASE IF EXISTS summary_db;
CREATE DATABASE summary_db;

-- use db
USE summary_db;

-- create table
CREATE TABLE Summaries(
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL,
    lenght INT,
    up_date VARCHAR(255) NOT NULL,
    sum_desc TEXT NOT NULL,
    pdf VARCHAR(255) NOT NULL,
    career VARCHAR(255),
    subject VARCHAR(255) NOT NULL,
    likes INT NOT NULL
);
CREATE TABLE Users(
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);
CREATE TABLE users_summaries(
	summary_id BINARY(16) REFERENCES Summaries(id),
    user_id BINARY(16) REFERENCES Users(id),
    PRIMARY KEY (summary_id,user_id)
);

-- insertar valores
INSERT INTO Summaries(id,name,lenght,up_date,sum_desc,pdf,career,subject,likes) VALUES
(UUID_TO_BIN(UUID()),"summary1",12,"today","sumarie","url pdf","TUPW","programacion",12);

INSERT INTO Users(id,name,email) VALUES
(UUID_TO_BIN(UUID()),"user1","pepito@gmail.com");

INSERT INTO users_summaries(summary_id,user_id) VALUES
((SELECT id FROM Summaries WHERE name ='summary1'),(SELECT id FROM users WHERE name ='user1'));

SELECT * FROM Summaries;
