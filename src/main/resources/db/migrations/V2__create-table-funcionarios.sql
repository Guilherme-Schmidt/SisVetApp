CREATE TABLE Cliente (

                         cpf VARCHAR(14) NOT NULL PRIMARY KEY,
                         nome VARCHAR(100) NOT NULL,
                         sexo VARCHAR(10),
                         dataNascimento DATE,
                         email VARCHAR(100),
                         telefone VARCHAR(20),
                         endereco VARCHAR(255),
                         funcao VARCHAR(50)
);
