import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CarrinhoTest {

    @Test
    void adicionarProduto() {

        Carrinho2 carrinho = new Carrinho2();

        Produto mouse = new Produto("Mouse", 50, 1);

        carrinho.adicionarProduto(mouse);

        assertEquals(1, carrinho.quantidadeProdutos());
    }

    @Test
    void calcularTotal() {

        Carrinho2 carrinho = new Carrinho2();

        Produto mouse = new Produto("Mouse", 50, 1);
        Produto teclado = new Produto("Teclado", 100, 1);

        carrinho.adicionarProduto(mouse);
        carrinho.adicionarProduto(teclado);

        double resultado = carrinho.calcularTotal();

        assertEquals(150, resultado);
    }

    @Test
    void calcularTotalComQuantidade() {

        Carrinho2 carrinho = new Carrinho2();

        Produto mouse = new Produto("Mouse", 50, 2);

        carrinho.adicionarProduto(mouse);

        double resultado = carrinho.calcularTotal();

        assertEquals(100, resultado);
    }

    @Test
    void removerProduto() {

        Carrinho2 carrinho = new Carrinho2();

        Produto mouse = new Produto("Mouse", 50, 1);
        Produto teclado = new Produto("Teclado", 100, 1);

        carrinho.adicionarProduto(mouse);
        carrinho.adicionarProduto(teclado);

        carrinho.removerProduto("Mouse");

        assertEquals(1, carrinho.quantidadeProdutos());
        assertEquals(100, carrinho.calcularTotal());
    }

    @Test
    void aplicarDesconto() {

        Carrinho2 carrinho = new Carrinho2();

        Produto mouse = new Produto("Mouse", 100, 3);

        carrinho.adicionarProduto(mouse);

        double resultado = carrinho.calcularTotalComDesconto();

        assertEquals(270, resultado);
    }

    @Test
    void descontoNoLimiteDe200() {

        Carrinho2 carrinho = new Carrinho2();

        Produto mouse = new Produto("Mouse", 100, 2);

        carrinho.adicionarProduto(mouse);

        double resultado = carrinho.calcularTotalComDesconto();

        assertEquals(180, resultado);
    }

    @Test
    void naoPermitirPrecoNegativo() {

        assertThrows(IllegalArgumentException.class, () -> {
            new Produto("Mouse", -50, 1);
        });
    }
}