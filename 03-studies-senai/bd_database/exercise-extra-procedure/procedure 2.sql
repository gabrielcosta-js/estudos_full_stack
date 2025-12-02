CREATE DATABASE aws;
USE aws;

CREATE TABLE Pedidos(
	id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    produto VARCHAR(50),
    quantidade INT,
    preco_unitario DECIMAL(10,2),
    valor_total DECIMAL(10,2)
);

INSERT INTO Pedidos (produto,quantidade, preco_unitario)
VALUES ('Teclado', 2, 150.00),
		('Mouse', 3, 80.00);
        
DELIMITER //
CREATE PROCEDURE CalcularValorTotal(IN p_id INT)
BEGIN
	UPDATE Pedidos
    SET valor_total = quantidade * preco_unitario
    WHERE id_pedido = p_id;
    END
// DELIMITER 

CALL calcularValorTotal(1); -- Ele atualiza apenas 1, se quissese todos eu botava RANGE(1,50) DO 1 A 50 EX

SELECT * FROM Pedidos;