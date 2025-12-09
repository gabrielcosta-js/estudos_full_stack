USE escolatech;

SELECT *FROM alunos;

SELECT nome, cidade FROM alunos;

SELECT *FROM cursos;

SELECT  a.nome AS Nomes,
		m.data_matricula
	FROM matriculas m
	JOIN alunos a ON m.id_aluno = a.id_aluno;
    
SELECT *FROM matriculas;

SELECT a.nome, m.data_matricula
FROM matriculas m
JOIN alunos a ON a.id_aluno = m.id_aluno;



-- 30

SELECT c.nome, AVG(m.nota_final) AS curso_com_maior_nota
FROM matriculas m
JOIN cursos c ON c.id_curso = m.id_curso
GROUP BY c.nome LIMIT 1;

SELECT cidade, COUNT(*) AS total_de_alunos
FROM alunos
GROUP BY cidade;

SELECT a.cidade, AVG(m.nota_final) AS media_dos_alunos
FROM matriculas m
JOIN alunos a ON a.id_aluno = m.id_aluno
WHERE a.cidade LIKE '%SÃO PAULO%'
GROUP BY a.cidade;

SELECT p.nome, p.especialidade
FROM professores p;

SELECT p.nome, p.especialidade, p.cidade
FROM professores p
WHERE especialidade LIKE '%Design%';

SELECT nome, valor 
FROM cursos
WHERE valor >= 700 AND valor <= 1000;

SELECT a.nome, c.nome, m.nota_final AS aluno_com_a_maior_nota
FROM matriculas m
JOIN alunos a ON a.id_aluno = m.id_aluno
JOIN cursos c ON c.id_curso = m.id_curso
WHERE m.nota_final >= 9
ORDER BY m.nota_final DESC LIMIT 1;

SELECT nome, genero FROM alunos
WHERE genero LIKE "%M%";

SELECT nome, genero FROM alunos
WHERE genero LIKE "%F%";

SELECT area, COUNT(*) AS total_de_curso FROM cursos
GROUP BY area;

SELECT nome, cidade FROM professores
WHERE cidade LIKE "%São Paulo%" OR cidade LIKE "%Recife%";

SELECT a.nome, m.nota_final AS notas_acima_da_media
FROM matriculas m
JOIN alunos a ON a.id_aluno = m.id_aluno
WHERE m.nota_final > (
    SELECT AVG(nota_final) FROM matriculas
);

SELECT c.nome, COUNT(*) AS matriculas
FROM matriculas m
JOIN cursos c ON c.id_curso = m.id_curso
GROUP BY c.nome;

SELECT c.nome, COUNT(*) AS matriculas, sum(c.valor) AS valor_arrecado
FROM matriculas m
JOIN cursos c ON c.id_curso = m.id_curso
GROUP BY c.nome;

SELECT a.nome, m.nota_final
FROM matriculas m
JOIN alunos a ON a.id_aluno = m.id_aluno
WHERE m.nota_final < 8;

SELECT a.nome AS alunos, p.nome AS professores, a.cidade
FROM alunos a, professores p
WHERE a.cidade = p.cidade;

SELECT a.nome AS aluno, c.nome AS curso, p.nome AS professor
FROM matriculas m
JOIN alunos a ON a.id_aluno = m.id_aluno
JOIN professores p ON p.id_professor = m.id_professor
JOIN cursos c ON c.id_curso = m.id_curso
GROUP BY m.id_curso;

SELECT a.nome AS aluno, m.nota_final
FROM matriculas m
JOIN alunos a ON a.id_aluno = m.id_aluno
ORDER BY m.nota_final DESC LIMIT 1;

SELECT a.nome AS aluno, m.nota_final
FROM matriculas m
JOIN alunos a ON a.id_aluno = m.id_aluno
ORDER BY m.nota_final ASC LIMIT 1;

SELECT genero, COUNT(*) AS total_de_alunos_genero
FROM alunos
GROUP BY genero;

SELECT nome, especialidade
FROM professores
WHERE especialidade LIKE '%Banco de Dados%';