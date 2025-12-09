CREATE DATABASE IF NOT EXISTS bureau_credito_bd;
USE bureau_credito_bd;

-- Criação das tabelas
CREATE TABLE pessoa(
id_pessoa INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45),
cpf VARCHAR(45),
telefone VARCHAR(45),
endereco VARCHAR(45) 
);

CREATE TABLE empresa(
id_empresa INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45),
cnpj VARCHAR(45),
telefone VARCHAR(45),
endereco VARCHAR(45)
);

CREATE TABLE instituicao_divida(
id_instituicao_divida INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45),
descricao VARCHAR(45),
data_divida DATE
);

CREATE TABLE tipo_pagamento(
id_tipo_pagamento INT AUTO_INCREMENT PRIMARY KEY,
nome_pgto VARCHAR(45),
data_pagamento DATE,
valor DECIMAL(10,2)
);

CREATE TABLE divida(
id_divida INT AUTO_INCREMENT PRIMARY KEY,
id_pessoa INT,
id_empresa INT,
id_instituicao_divida INT,
id_tipo_pagamento INT,
status_divida ENUM('ATIVA','PAGA','NEGOCOCIADA','CANCELADA'),
FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (id_instituicao_divida) REFERENCES instituicao_divida(id_instituicao_divida) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (id_tipo_pagamento) REFERENCES tipo_pagamento(id_tipo_pagamento) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Cricação de tabelas para log
CREATE TABLE ocorrencias_log(
id_ocorrencias_log INT AUTO_INCREMENT PRIMARY KEY,
consultor VARCHAR(45),
data_consulta DATE,
alvo_consultado VARCHAR(45)
);

CREATE TABLE consultas_log(
id_consulta_log INT AUTO_INCREMENT PRIMARY KEY,
inclusao VARCHAR(45),
retirada VARCHAR(45),
contestacao_divida VARCHAR(45)
);


