USE bureau_credito_bd;

-- 1 TRIGGER LOG para ocorrencias
DELIMITER $$
CREATE TRIGGER tg_ocorrencias
AFTER INSERT ON divida
FOR EACH ROW
BEGIN
	INSERT INTO ocorrencias_log(nome,cpf,telefone,endereco) VALUES
    (new.nome,new.cpf,new.telefone,new.endereco);
END $$
DELIMITER ;

-- 2 TRIGGER LOG para consulta
DELIMITER $$
CREATE TRIGGER tg_consulta
AFTER INSERT ON divida
FOR EACH ROW
BEGIN
	INSERT INTO ocorrencias_log(nome,cpf,telefone,endereco) VALUES
    (new.nome,new.cpf,new.telefone,new.endereco);
END $$
DELIMITER ;

-- 3 TRIGGER log de modificações da tabela PESSOA
DELIMITER $$
CREATE TRIGGER tg_log_pessoa
AFTER INSERT ON ocorrencias_log
FOR EACH ROW
BEGIN
	INSERT INTO ocorrencias_log(nome,cpf,telefone,endereco) VALUES
    (new.nome,new.cpf,new.telefone,new.endereco);
END $$
DELIMITER ;

-- 4 TRIGGER log de modificações da tabela empresa
DELIMITER $$
CREATE TRIGGER tg_log_empresa
AFTER INSERT ON ocorrencias_log
FOR EACH ROW
BEGIN
	INSERT INTO ocorrencias_log(nome,cpf,telefone,endereco) VALUES
    (new.nome,new.cpf,new.telefone,new.endereco);
END $$
DELIMITER ;

-- 5 TRIGGER  log de modificações da tabela instituicao_dividas
DELIMITER $$
CREATE TRIGGER tg_log_instituicoes_dividas
AFTER INSERT ON ocorrencias_log
FOR EACH ROW
BEGIN
	INSERT INTO ocorrencias_log(nome,cpf,telefone,endereco) VALUES
    (new.nome,new.cpf,new.telefone,new.endereco);
END $$
DELIMITER ;