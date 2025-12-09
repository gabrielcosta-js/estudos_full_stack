-- 1. Crie um banco de dados chamado escola_senai.
CREATE DATABASE escola_senai;
-- 2. Utilize o banco criado.
USE escola_senai;
--  3 á 5 Crie as tabelas
CREATE TABLE curso(
id_curso INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
carga_horaria INT,
data_inicio DATE
);
CREATE TABLE aluno(
ra INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
nascimento DATE,
cidade VARCHAR(50)
);
CREATE TABLE matricula(
id_matricula INT AUTO_INCREMENT PRIMARY KEY,
ra INT,
id_curso INT,
data_matricula DATE,
valor DECIMAL(10,2),
FOREIGN KEY (ra) REFERENCES aluno(ra) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_curso) REFERENCES curso(id_curso) ON DELETE CASCADE ON UPDATE CASCADE
);
-- INSERIR DADOS 6 Á 8
INSERT INTO aluno(nome,nascimento,cidade) VALUES
('Gabriel','2005-03-25','Conceição do Jacuípe'),
('Daniel','2007-03-26','Feira de santana'),
('Lucas','2006-03-27','Conceição do Jacuípe');
INSERT INTO curso(nome,carga_horaria,data_inicio) VALUES
('DEV',50,'2025-12-08'),
('Front-end',60,'2025-12-08'),
('Back-end',90,'2025-12-08');
INSERT INTO matricula(ra,id_curso,data_matricula,valor) VALUES
(1,1,'2025-11-08',1800),
(2,3,'2025-12-08',1800),
(3,3,'2025-11-08',1800);

-- 9 EXIBIR TABELAS CRIADAS COM TODOS OS DADOS
SELECT * FROM aluno,curso,matricula;

-- 9 EXIBIR TABELAS DO BANCO DE DADOS
SHOW TABLES;

-- 10. Exiba todo o conteúdo da tabela aluno.
SELECT * FROM aluno;

-- 11. Adicione uma coluna email na tabela aluno depois da coluna nome.
ALTER TABLE aluno ADD COLUMN email VARCHAR(50) AFTER nome;

-- 12. Adicione na tabela curso uma coluna categoria (varchar 40) antes da carga_horaria.
-- SQL NÂO ACEITA ISSO BEFORE| ALTER TABLE curso ADD COLUMN categoria VARCHAR(40) BEFORE carga_horaria;
ALTER TABLE curso ADD COLUMN categoria VARCHAR(40) AFTER nome;

-- 13. Renomeie a coluna “cidade” da tabela aluno para municipio.
-- Não funciona em maria db ALTER TABLE aluno RENAME COLUMN cidade TO municipio;
ALTER TABLE aluno CHANGE cidade municipio VARCHAR(50);

-- 14. Altere o tipo da coluna nome (curso) para varchar(100).
ALTER TABLE curso CHANGE nome nome VARCHAR(100);

-- 15. Atualize o nome de um aluno específico (ra = 2 para “João Gabriel”).
UPDATE aluno
SET nome = 'João Gabriel'
WHERE ra = 2;

-- 16. Delete da tabela curso um curso cujo id seja 3.
DELETE FROM curso WHERE id_curso = 3;

-- 17. Remova a coluna categoria da tabela curso.
ALTER TABLE curso DROP COLUMN categoria;

-- 18. Crie um usuário chamado 'aluno_senai'@'localhost' com senha Aluno123.
CREATE USER 'aluno_senai'@'localhost' IDENTIFIED BY 'Aluno123';

-- 19. Liste todos os usuários cadastrados no MySQL.
SELECT USER FROM mysql.user;

-- 20. Conceda permissão de SELECT e INSERT no banco escola_senai para o usuário aluno_senai.
GRANT SELECT, INSERT ON escola_senai.* TO 'aluno_senai'@'localhost';

-- 21. Revoque todas as permissões do usuário aluno_senai.
REVOKE ALL PRIVILEGES ON escola_senai.* FROM 'aluno_senai'@'localhost';
FLUSH PRIVILEGES;

-- 22. Delete o usuário aluno_senai.
DROP USER 'aluno_senai'@'localhost';

-- 23. Crie uma TRIGGER chamada trg_validar_matricula
--  Que impeça matrículas com data_matricula < '2020-01-01'
DELIMITER $$
CREATE TRIGGER trg_validar_matricula
BEFORE INSERT ON matricula
FOR EACH ROW
BEGIN
	IF NEW.data_matricula < '2020-01-01' THEN
    SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Data de matrícula inválida, deve ser maior que 2020-01-01';
	END IF;
END $$ 
DELIMITER ;

INSERT INTO matricula(ra, id_curso, data_matricula, valor)
VALUES (1, 1, '2019-01-01', 1500);

CREATE TABLE log_matricula (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_matricula INT,
    ra INT,
    id_curso INT,
    data_matricula DATE,
    valor DECIMAL(10,2),
    data_registro DATETIME
);


-- 24. Crie uma TRIGGER chamada trg_log_matricula
-- Que insira na tabela log_matricula (crie essa tabela) toda matrícula cadastrada.
DELIMITER $$
CREATE TRIGGER trg_log_matricula
AFTER INSERT ON matricula
FOR EACH ROW
BEGIN
	INSERT INTO log_matricula (id_matricula, ra, id_curso, data_matricula, valor, data_registro)
    VALUES
        (NEW.id_matricula, NEW.ra, NEW.id_curso, NEW.data_matricula, NEW.valor, NOW());
END $$
DELIMITER ;

-- 25. Crie uma PROCEDURE chamada sp_cadastrar_aluno(nome, nascimento, municipio)
-- que insira automaticamente na tabela aluno.
DELIMITER $$
CREATE PROCEDURE sp_cadastrar_aluno
(IN nome VARCHAR(50), IN nascimento DATE, IN municipio VARCHAR(50))
BEGIN
	INSERT INTO aluno VALUES (null, nome, null, nascimento, municipio);
END $$
DELIMITER ;

-- 26. Execute 2 vezes a procedure sp_cadastrar_aluno com valores diferentes.
CALL sp_cadastrar_aluno ('ANA CLARA', '2008-07-05', 'Conceição de MARIA');
CALL sp_cadastrar_aluno ('Pedro', '2003-08-08', 'Conceição de MARIA');

-- 27. Use INNER JOIN para exibir: nome do aluno, nome do curso e data da matrícula.
SELECT a.nome,
		c.nome,
        m.data_matricula
FROM matricula m
JOIN aluno a ON a.ra = m.ra
JOIN curso c ON c.id_curso = m.id_curso;

SELECT * FROM matricula;

-- extra
INSERT INTO matricula(ra, id_curso, data_matricula, valor)
VALUES (2, 1, '2025-01-10', 1500);

--  28. Exiba quantos alunos existem por município (usar GROUP BY).
SELECT a.municipio, COUNT(a.municipio) AS total_alunos_municipio
FROM aluno a
GROUP BY a.municipio;

-- 29. Exiba apenas os cursos cuja carga_horaria seja maior que a média geral (usar HAVING AVG).
SELECT c.nome, c.carga_horaria
FROM curso c
GROUP BY nome, carga_horaria
HAVING c.carga_horaria > (SELECT AVG(carga_horaria) FROM curso);

-- 30. Exiba o nome do aluno e do curso de todos os alunos que fizeram matrícula antes da data de início do curso (ganharão brinde).
-- Use JOIN + WHERE + comparação de datas. 2025-12-08
SELECT a.nome AS aluno, c.nome AS curso
FROM matricula m
JOIN aluno a ON a.ra = m.ra
JOIN curso c ON c.id_curso = m.id_curso
WHERE m.data_matricula < c.data_inicio;

-- Gabarito do GPT




