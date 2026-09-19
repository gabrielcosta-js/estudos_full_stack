public class Aluno {

    public static double calcularMedia(double nota1, double nota2, double nota3) {

        return (nota1 + nota2 + nota3) / 3;
    }

    public static boolean estaAprovado(double media) {

        return media >= 7;
    }
}