import java.util.ArrayList;
import java.util.List;

public class Carrinho2 {

    private List<Produto> produtos = new ArrayList<>();

    public void adicionarProduto(Produto produto) {
        produtos.add(produto);
    }

    public void removerProduto(String nome) {
        produtos.removeIf(produto -> produto.getNome().equals(nome));
    }

    public int quantidadeProdutos() {
        return produtos.size();
    }

    public double calcularTotal() {

        double total = 0;

        for (Produto produto : produtos) {
            total += produto.getPreco() * produto.getQuantidade();
        }

        return total;
    }

    public double calcularTotalComDesconto() {

        double total = calcularTotal();

        if (total >= 200) {
            total = total - (total * 0.10);
        }

        return total;
    }
}