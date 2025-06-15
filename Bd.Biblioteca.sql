
CREATE DATABASE  biblioteca;
USE biblioteca;

CREATE TABLE bibliotecarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_bibliotecario INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50),
    status ENUM('Disponível', 'Emprestado', 'Reservado'),
    data_cadastro DATE NOT NULL,
    FOREIGN KEY (id_bibliotecario) REFERENCES bibliotecarios(id)
       
);
