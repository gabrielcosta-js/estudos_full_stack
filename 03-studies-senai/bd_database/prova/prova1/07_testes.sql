USE bureau_credito_bd;

-- Testando a versão de SGBD
SELECT version();

-- Testando quais usuários estão cadastrados
SELECT USER FROM mysql.user;

-- Testando qual usuário estou logado
SELECT CURRENT_USER;

-- Testando se todas as tabelas estão operando
SELECT * FROM pessoa, empresa, instituicao_divida, tipo_pagamento;

-- Consultando todos os dados da tabela pessoa
SELECT * FROM pessoa;

-- Consultando todos os dados da empresa
SELECT * FROM empresa;

-- Consultando todos os dados da tabela instituição_divida
SELECT * FROM instituicao_divida;

-- Consultando todos os dados da tabela tipo_pagamento
SELECT * FROM tipo_pagamento;

-- Consultando o log de ocorrencias
SELECT * FROM ocorrencias_log;
