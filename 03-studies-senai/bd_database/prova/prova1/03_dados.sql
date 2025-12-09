USE bureau_credito_bd;

-- Optei fazer procedure ao invés de insert into
DELIMITER $$
CREATE PROCEDURE insert_pessoa
(IN nome VARCHAR(45), IN cpf VARCHAR(45), IN telefone VARCHAR(45), IN endereco VARCHAR(45))
BEGIN
	INSERT INTO pessoa(nome,cpf,telefone,endereco) VALUES
    (nome,cpf,telefone,endereco);
END $$
DELIMITER ;

-- Inserindo os dados, moises e paulo são irmãos e moram no mesmo lugar
CALL insert_pessoa('Moisés Texeira', '123456789-11','(75) 98783-5546','Rua josé fogo - 521');
CALL insert_pessoa('Paulo Texeira', '11987654321-11','(75) 99999-4444','Rua josé fogo - 521');
CALL insert_pessoa('Ana cristina', '1020304060-11','(75) 99999-5555','Rua Carlos touca - 300');
CALL insert_pessoa('Maria Braga', '1110203040-60','(75) 99999-6666','Avenida Ribeirao azul - 511');

-- ----------------------------------

DELIMITER $$
CREATE PROCEDURE insert_empresa
(IN nome VARCHAR(45), IN cnpj VARCHAR(45), IN telefone VARCHAR(45), IN endereco VARCHAR(45))
BEGIN
	INSERT INTO empresa(nome,cnpj,telefone,endereco) VALUES
    (nome,cnpj,telefone,endereco);
END $$
DELIMITER ;

CALL insert_empresa('TRANSPORTE RAMOS','10023344-11','(75) 99999-7777','AV paulo matador - 531');
CALL insert_empresa('ZÉ DROGARIA', '20302454-11','(75) 99999-8888','AV paulo matador - 531');
CALL insert_empresa('ZÉ MERCADINHO', '60283354934-11','(75) 99999-99999','Rua central magalhões - 320');
CALL insert_empresa('ZÉ PNEU E PEÇAS', '67893248954-11','(75) 99999-1111','Avenida Ribeirao azul - 511');

-- ------------------------------

DELIMITER $$
CREATE PROCEDURE insert_instituicao_divida
(IN nome VARCHAR(45), IN descricao VARCHAR(45), IN data_divida DATE)
BEGIN
	INSERT INTO instituicao_divida(nome,descricao, data_divida) VALUES
    (nome, descricao, data_divida);
END $$
DELIMITER ;

CALL insert_instituicao_divida('ATACADÃO LTDA', 'alimentos','2025-12-01');
CALL insert_instituicao_divida('FARMÁCIA LTDA', 'remédio','2025-12-02');
CALL insert_instituicao_divida('OFICINA LTDA', 'Peças e serviços','2025-12-03');
CALL insert_instituicao_divida('ESCOLA LTDA', 'Mensalidade Escola','2025-12-04');

-- --------------------------------------

DELIMITER $$
CREATE PROCEDURE insert_tipo_pagamento
(IN nome_pgto VARCHAR(45), IN data_pagamento DATE, IN valor DECIMAL(10,2))
BEGIN
	INSERT INTO tipo_pagamento(nome_pgto, data_pagamento, valor) VALUES
    (nome_pgto, data_pagamento, valor);
END $$
DELIMITER ;

CALL insert_tipo_pagamento('PIX', '2025-10-01', 1500);
CALL insert_tipo_pagamento('PIX', '2025-10-02', 2000);
CALL insert_tipo_pagamento('PIX', '2025-10-03', 3000);
CALL insert_tipo_pagamento('CARTÃO CRÉDITO', '2025-10-04', 1000);

-- ----------------------------------------------------------

DELIMITER $$
CREATE PROCEDURE insert_divida
(IN id_pessoa INT, IN id_empresa INT, IN id_instituicao_divida INT, IN id_tipo_pagamento INT, 
IN status_divida ENUM('ATIVA','PAGA','NEGOCOCIADA','CANCELADA'))
BEGIN
	INSERT INTO divida(id_pessoa,id_empresa,id_instituicao_divida,id_tipo_pagamento, 
    status_divida) VALUES
    (id_pessoa,id_empresa,id_instituicao_divida,id_tipo_pagamento, 
    status_divida);
END $$
DELIMITER ;

CALL insert_divida('1', '1','1','1','ATIVA');
CALL insert_divida('2', '2','2','2','ATIVA');
CALL insert_divida('2', '1','1','1','PAGA');
CALL insert_divida('3', '3','3','3','PAGA');

