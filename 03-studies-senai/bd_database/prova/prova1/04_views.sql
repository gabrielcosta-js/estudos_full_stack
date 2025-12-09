USE bureau_credito_bd;

-- 1 Pessoas e Empresas cadastradas no sistema
SELECT p.nome AS nome_pessoa, e.nome AS nome_empresa
FROM divida d
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
JOIN empresa e ON e.id_empresa = d.id_empresa;

-- 2 Total de pessoas e empresas no sistema
SELECT COUNT(p.nome) AS total_pessoas, COUNT(e.nome) AS total_empresa
FROM divida d
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
JOIN empresa e ON e.id_empresa = d.id_empresa
ORDER BY p.nome ASC;

-- 3 Pessoas com dívidas ativas
SELECT p.nome AS pessoas, d.status_divida
FROM divida d
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
WHERE d.status_divida LIKE '%ATIVA%';

-- 4 Empresas com dívidas ativas
SELECT e.nome AS empresas, d.status_divida
FROM divida d
JOIN empresa e ON e.id_empresa = d.id_empresa
WHERE d.status_divida LIKE '%PAGA%';

-- 5 Todos os nomes, empresas, instituições de dívida e seus status
SELECT p.nome AS nome_pessoa, d.status_divida, i.nome AS instituicao_devedora, e.nome AS nome_empresa, d.status_divida, i.nome  AS instituicao_devedora
FROM divida d
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
JOIN empresa e ON e.id_empresa = d.id_empresa
JOIN instituicao_divida i ON i.id_instituicao_divida = d.id_instituicao_divida
GROUP BY e.nome;

-- 6 Total de pessoas e empresas com dívidas CANCELADAS, irá exibir nada, não tem canceladas
SELECT COUNT(d.status_divida) AS dividas_pagas, COUNT(d.status_divida)  AS dividas_pagas
FROM divida d
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
JOIN empresa e ON e.id_empresa = d.id_empresa
WHERE d.status_divida LIKE '%CANCELADA%'
ORDER BY p.nome, e.nome;

-- 7 Total de pessoas e empresas com dívidas NECOCIADO, irá exibir nada, não tem canceladas
SELECT COUNT(d.status_divida) AS dividas_negociadas, COUNT(d.status_divida)  AS dividas_negociadas
FROM divida d
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
JOIN empresa e ON e.id_empresa = d.id_empresa
WHERE d.status_divida LIKE '%NEGOCIADO%'
ORDER BY p.nome, e.nome;

-- 8 Pessoas e empresas com o mesmo endereço
SELECT p.nome AS nome_pessoa, p.endereco, e.nome AS nome_empresa, e.endereco
FROM divida d 
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
JOIN empresa e ON e.id_empresa = d.id_empresa
WHERE p.endereco LIKE '%Rua josé fogo - 521%' AND e.endereco LIKE '%AV paulo matador - 531%'
GROUP BY p.nome, e.nome;

-- 9 Pessoa e empresas com maior dívida 
SELECT p.nome AS nome_pessoa, pg.valor, e.nome AS nome_empresa, pg.valor AS Maior_divida
FROM divida d 
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
JOIN empresa e ON e.id_empresa = d.id_empresa
JOIN tipo_pagamento pg ON pg.id_tipo_pagamento = d.id_tipo_pagamento
GROUP BY pg.valor DESC ;

-- 10 Pessoa e empresas com maior dívida 
SELECT p.nome AS nome_pessoa, pg.valor, e.nome AS nome_empresa, pg.valor AS Maior_divida
FROM divida d 
JOIN pessoa p ON p.id_pessoa = d.id_pessoa
JOIN empresa e ON e.id_empresa = d.id_empresa
JOIN tipo_pagamento pg ON pg.id_tipo_pagamento = d.id_tipo_pagamento
GROUP BY pg.valor ASC LIMIT 1;

