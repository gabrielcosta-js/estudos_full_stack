CREATE DATABASE IF NOT EXISTS elaine_bd;
USE elaine_bd;

CREATE TABLE aluno(
    ra INT PRIMARY KEY,
    nome VARCHAR(50),
    nascimento DATE
    );
    
CREATE TABLE curso(
	codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    carga_horaria INT,
    data_inicio DATE,
    data_termino DATE
    );
    
CREATE TABLE matricula(
	id_matricula INT AUTO_INCREMENT PRIMARY KEY,
    codigo INT,
    ra INT,
    data_matricula DATE,
    valor DECIMAL(10.2),
    FOREIGN KEY (codigo) REFERENCES curso(codigo),
    FOREIGN KEY (ra) REFERENCES aluno(ra)
    );

INSERT INTO aluno (ra,nome,nascimento) VALUES
(123456,'Ana', '1972-01-10'),
(1234567,'Bianca', '1973-02-11'),
(123458,'Carla', '1987-12-12'),
(123459,'Danilo', '1990-10-02'),
(123460,'Eliana', '1987-01-01');

INSERT INTO curso(nome,carga_horaria,data_inicio,data_termino) VALUES
('java',360,'2007-12-01','2008-10-10'),
('auto cad',60,'2008-01-10','2008-05-10'),
('php',90,'2008-02-15','2008-07-10'),
('redes',60,'2008-01-20','2008-03-20');

INSERT INTO matricula (codigo, ra, data_matricula, valor) VALUES
(1,123456,'2007-09-10', 100.00),
(3,123456,'2007-10-01', 60.00),
(1,1234567,'2007-09-01', 100.00),
(2,123458,'2007-01-11', 50.00),
(2,123459,'2007-07-20', 50.00),
(1,123460,'2007-08-10', 80.00);

SELECT a.ra, a.nome AS aluno, c.nome AS curso
FROM matricula m
JOIN aluno a ON a.ra = m.ra
JOIN curso c ON c.codigo = m.codigo;

SELECT a.ra, a.nome AS aluno, c.nome AS curso
FROM matricula m
JOIN aluno a ON a.ra = m.ra
JOIN curso c ON c.codigo = m.codigo
ORDER BY c.nome ASC;

SELECT c.nome AS curso, COUNT(*) AS numero_de_matriculas
FROM matricula m
JOIN curso c ON c.codigo = m.codigo
GROUP BY m.codigo;

SELECT 
    c.nome AS curso,
    COUNT(m.codigo) AS numero_de_matriculas
FROM curso c
LEFT JOIN matricula m ON c.codigo = m.codigo
GROUP BY c.codigo, c.nome;

SELECT c.nome AS curso, SUM(m.valor) AS total_valor
FROM matricula m
JOIN curso c ON c.codigo = m.codigo
GROUP BY m.codigo;

SELECT 
    c.nome AS curso,
    SUM(m.valor) AS total_por_curso,
    (SELECT SUM(valor) FROM matricula) AS total_geral
FROM matricula m
JOIN curso c ON c.codigo = m.codigo
GROUP BY c.nome;

SELECT ROUND(AVG(m.valor), 2) AS valor_medio_matriculas
FROM matricula m
JOIN curso c ON c.codigo = m.codigo;

SELECT c.nome AS nome_curso, ROUND(AVG(m.valor), 2) AS valor_medio_matriculas
FROM matricula m
JOIN curso c ON c.codigo = m.codigo
GROUP BY c.nome;

SELECT 
    c.nome AS curso,
    COUNT(m.codigo) AS numero_de_matriculas
FROM curso c
LEFT JOIN matricula m ON c.codigo = m.codigo
GROUP BY c.codigo, c.nome
HAVING COUNT(m.codigo) < 2;

SELECT c.nome AS curso_com_mesma_CH
FROM curso c
WHERE c.carga_horaria = 60;

SELECT a.nome AS pessoas_com_mesmo_mes_nascimento
FROM aluno a
WHERE MONTH(a.nascimento) = 01;

SELECT c.nome AS curso, c.data_inicio
FROM curso c
WHERE YEAR(c.data_inicio) = 2008 AND MONTH(c.data_inicio) = 1
GROUP BY c.codigo;

SELECT c.nome AS curso, c.data_inicio
FROM curso c
JOIN matricula m ON m.codigo = c.codigo
WHERE YEAR(c.data_inicio) = 2008 AND MONTH(c.data_inicio) = 1
GROUP BY c.codigo;

SELECT a.nome AS aluno, c.nome AS curso, m.data_matricula, c.data_inicio
FROM matricula m
JOIN aluno a ON a.ra = m.ra
JOIN curso c ON c.codigo = m.codigo
WHERE m.data_matricula < c.data_inicio;

SELECT 
    c.nome AS curso,
    c.data_inicio
FROM curso c
WHERE c.data_inicio > CURDATE();

SELECT a.nome AS aluno, ROUND(m.valor * 0.50, 2) AS valor_restituir
FROM matricula m
JOIN aluno a ON a.ra = m.ra
WHERE DAYOFWEEK(m.data_matricula) = 7;

SELECT 
    a.nome AS aluno,
    TIMESTAMPDIFF(YEAR, a.nascimento, CURDATE()) AS idade
FROM aluno a;

SELECT 
    c.nome AS curso,
    PERIOD_DIFF(
        DATE_FORMAT(c.data_termino, '%Y%m'),
        DATE_FORMAT(c.data_inicio, '%Y%m')
    ) AS duracao_meses
FROM curso c;

