public class Desconto {

    public static double calcularDesconto(double valor) {

        return valor - (valor * 0.10);
    }

    public static double calcularDescontoVIP(double valor) {

        return valor - (valor * 0.20);
    }
}