import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CarrinhoTest2 {

    @Test
    void adicionarItem() {

        Carrinho carrinho = new Carrinho();

        carrinho.adicionarItem(50);

        assertEquals(1, carrinho.quantidadeItens());
    }

    @Test
    void removerItem() {

        Carrinho carrinho = new Carrinho();

        carrinho.adicionarItem(50);
        carrinho.adicionarItem(30);

        carrinho.removerItem(50);

        assertEquals(1, carrinho.quantidadeItens());
    }

    @Test
    void calcularValorTotal() {

        Carrinho carrinho = new Carrinho();

        carrinho.adicionarItem(50);
        carrinho.adicionarItem(30);
        carrinho.adicionarItem(20);

        double resultado = carrinho.calcularTotal();

        assertEquals(100, resultado);
    }
}