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



-- 31

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
FROM matriculas
JOIN alunos a ON a.id_aluno = m.id_aluno
JOIN cursos c ON c.id_curso = m.id_curso
ORDER BY m.nota_final ASC LIMIT 1;