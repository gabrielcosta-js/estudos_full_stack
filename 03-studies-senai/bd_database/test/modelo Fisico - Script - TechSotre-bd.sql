CREATE DATABASE IF NOT EXISTS tech_store_bd;
USE tech_store_bd;

CREATE TABLE cliente(
id_cliente INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
cpf VARCHAR(45) NOT NULL,
telefone VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL,
endereco VARCHAR(45) NOT NULL,
cidade VARCHAR(45) NOT NULL
);

CREATE TABLE produto(
id_produto INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
preco DECIMAL(10.2) NOT NULL,
categoria VARCHAR(45) NOT NULL
);

CREATE TABLE pagamento(
id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
id_produto INT,
status_pagamento VARCHAR(45) NOT NULL,
forma_pagamento VARCHAR(45) NOT NULL,
FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);


CREATE TABLE pedido(
id_pedido INT AUTO_INCREMENT PRIMARY KEY,
id_cliente INT,
id_produto INT,
data_pedido DATE,
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

INSERT INTO cliente (nome, cpf, telefone, email, endereco, cidade) VALUES
('Gabriel Silva', '123.456.789-00', '(75) 90000-0001', 'gabriel@email.com', 'Rua dos Alfas 123', 'Conceição do Jacuípe'),
('Maria Oliveira', '987.654.321-00', '(75) 90000-0002', 'maria@email.com', 'Av dos Betas 456', 'Conceição do Jacuípe'),
('João Souza', '111.222.333-44', '(75) 90000-0003', 'joao@email.com', 'Rua Vasco da Gamma 789', 'Conceição do Jacuípe'),
('Ana Santos', '444.555.666-77', '(75) 90000-0004', 'ana@email.com', 'Rua Delta ao Quadrado321', 'Conceição do Jacuípe'),
('Pedro Rocha', '777.888.999-10', '(75) 90000-0005', 'pedro@email.com', 'Av Sergio Cardoso 654', 'Feira de Santana'),
('Carla Mendes', '100.200.300-40', '(75) 90000-0006', 'carla@email.com', 'Rua Getulio Vargas 987', 'Feira de Santana'),
('Lucas Almeida', '400.500.600-70', '(75) 90000-0007', 'lucas@email.com', 'Rua Presidente Dutra 159', 'Feira de Santana'),
('Fernanda Lima', '700.800.900-90', '(75) 90000-0008', 'fernanda@email.com', 'Av João Duval 753', 'Feira de Santana'),
('Rafael Costa', '900.100.102-03', '(75) 90000-0009', 'rafael@email.com', 'Rua do Fogo 468', 'Conceição do Jacuípe'),
('Juliana Martins', '103.104.105-16', '(75) 90000-0010', 'juliana@email.com', 'Rua SR dos Passos 246', 'Feira de Santana');

INSERT INTO produto (nome, preco, categoria) VALUES
('Mouse Gamer RGB', 120.90, 'Periférico'),
('Teclado Mecânico', 350.00, 'Periférico'),
('Monitor 24 Polegadas', 899.99, 'Monitores'),
('Headset Surround', 199.90, 'Áudio'),
('Notebook i5 8GB', 3500.00, 'Computadores'),
('Cadeira Gamer', 799.50, 'Móveis'),
('Webcam Full HD', 230.00, 'Periférico'),
('SSD 480GB', 250.00, 'Armazenamento'),
('HD 1TB', 300.00, 'Armazenamento'),
('Placa de Vídeo GTX 1660', 1800.00, 'Hardware');

INSERT INTO pagamento (id_produto, status_pagamento, forma_pagamento) VALUES
(1, 'Pago', 'Pix'),
(2, 'Cancelado', 'Crédito'),
(3, 'Pago', 'Débito'),
(4, 'Pago', 'Crédito'),
(5, 'Cancelado', 'Boleto'),
(6, 'Pago', 'Pix'),
(7, 'Pago', 'Crédito'),
(8, 'Cancelado', 'Débito'),
(9, 'Pago', 'Pix'),
(10, 'Pago', 'Crédito');

INSERT INTO pedido (id_cliente, id_produto, data_pedido) VALUES
(1, 1, '2025-01-10'),
(2, 1, '2025-01-11'),
(3, 2, '2025-01-12'),
(4, 2, '2025-01-13'),
(5, 3, '2025-01-14'),
(6, 3, '2025-01-15'),
(7, 8, '2025-01-16'),
(8, 9, '2025-01-17'),
(9, 10, '2025-01-18'),
(10, 6, '2025-01-19');

-- Todos os meus Selects com WHERE 
SELECT nome,cidade FROM cliente
WHERE cidade LIKE '%Feira de Santana%';

SELECT nome,cidade FROM cliente
WHERE cidade LIKE '%Conceição do Jacuípe%';

SELECT * FROM produto
WHERE categoria LIKE '%Periférico%';

SELECT * FROM produto
WHERE categoria LIKE '%Monitores%';

SELECT * FROM produto
WHERE categoria LIKE '%Armazenamento%';

-- Todos os selects que tem ORDER BY
SELECT nome, email FROM cliente
ORDER BY nome ASC;

SELECT nome, email FROM cliente
ORDER BY nome DESC;

SELECT * FROM produto
ORDER BY nome ASC;

SELECT * FROM produto
ORDER BY nome DESC;

-- Todos os selects de Funções agregadas (COUNT, SUM, AVG)

SELECT COUNT(*) AS total_clientes FROM cliente
ORDER BY nome;

SELECT COUNT(*) AS total_cidades FROM cliente
ORDER BY cidade;

SELECT COUNT(*) AS total_produtos FROM produto
ORDER BY nome;

SELECT SUM(preco) AS soma_precos_produtos
FROM produto;

SELECT AVG(preco) AS media_preco_produtos
FROM produto;

SELECT COUNT(*) AS total_pedidos
FROM pedido;

-- Todos os Joins 
SELECT pe.id_pedido, cl.nome
FROM pedido pe
JOIN cliente cl ON pe.id_cliente = cl.id_cliente;

SELECT pe.id_pedido, pd.nome
FROM pedido pe
JOIN produto pd ON pe.id_produto = pd.id_produto;

SELECT pg.id_pagamento, pd.nome, pg.status_pagamento
FROM pagamento pg
JOIN produto pd ON pg.id_produto = pd.id_produto;

SELECT cl.nome, pd.nome AS produto_comprado
FROM pedido pe
JOIN cliente cl ON pe.id_cliente = cl.id_cliente
JOIN produto pd ON pe.id_produto = pd.id_produto;

SELECT cl.nome, pe.data_pedido, pd.nome AS produto_comprado
FROM cliente cl
JOIN pedido pe ON cl.id_cliente = pe.id_cliente
JOIN produto pd ON pe.id_produto = pd.id_produto;

SELECT cidade, COUNT(*) AS total
FROM cliente
GROUP BY cidade;

SELECT categoria, COUNT(*) AS total
FROM produto
GROUP BY categoria;

SELECT status_pagamento, COUNT(*) AS total
FROM pagamento
GROUP BY status_pagamento;

SELECT categoria, AVG(preco) AS media
FROM produto
GROUP BY categoria;

SELECT categoria, AVG(preco) AS media
FROM produto
GROUP BY categoria
HAVING AVG(preco) > 500;

-- Os outros selects que escolhi 

SELECT * FROM cliente cl
ORDER BY cl.nome;

SELECT * FROM produto pd
WHERE pd.preco > 500;

SELECT * FROM pedido pe
WHERE pe.data_pedido = '2025-01-15';

SELECT pe.id_pedido, pg.status_pagamento
FROM pedido pe
JOIN pagamento pg ON pe.id_produto = pg.id_produto
WHERE pg.status_pagamento = 'Pago';

SELECT AVG(pd.preco) AS media_precos
FROM produto pd;

SELECT cl.nome, pe.data_pedido
FROM cliente cl
JOIN pedido pe ON cl.id_cliente = pe.id_cliente;

SELECT pe.id_pedido, pd.nome AS produto
FROM pedido pe
JOIN produto pd ON pe.id_produto = pd.id_produto;

SELECT pd.categoria, COUNT(*) AS total
FROM produto pd
GROUP BY pd.categoria;

SELECT * FROM produto pd
ORDER BY pd.preco DESC
LIMIT 5;

SELECT * FROM pagamento pg
WHERE pg.forma_pagamento = 'Crédito';












