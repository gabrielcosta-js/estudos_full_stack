import java.util.ArrayList;
import java.util.List;

public class Carrinho {

    private List<Double> itens = new ArrayList<>();

    public void adicionarItem(double valor) {
        itens.add(valor);
    }

    public void removerItem(double valor) {
        itens.remove(valor);
    }

    public double calcularTotal() {

        double total = 0;

        for (double valor : itens) {
            total += valor;
        }

        return total;
    }

    public int quantidadeItens() {
        return itens.size();
    }
}