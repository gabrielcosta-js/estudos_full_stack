USE bureau_credito_bd;

-- Criação de usuários
CREATE USER 'administrador'@'localhost' IDENTIFIED BY 'admin123';
CREATE USER 'consultor'@'localhost' IDENTIFIED BY 'consultor123';
CREATE USER 'usuario_teste'@'localhost' IDENTIFIED BY 'usuario_teste123';

-- Dando as permissões pro usuário
GRANT ALL PRIVILEGES ON bureau_credito_bd. * TO 'administrador'@'localhost';
GRANT SELECT, INSERT, ALTER, DELETE, DROP ON bureau_credito_bd. * TO 'consultor'@'localhost';
GRANT SELECT, INSERT ON bureau_credito_bd. * TO 'usuario_teste'@'localhost'; -- Vizualização e Inserção
