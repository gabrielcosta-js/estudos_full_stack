import java.util.Scanner;

public class Calculadora {
    public static int menu(){
        Scanner sc = new Scanner(System.in);
        System.out.println("O que você desejar fazer nesta maravilhosa calculdora?");
        System.out.println("01-Somar");
        System.out.println("02-Subtrair");
        System.out.println("03-Multiplicar");
        System.out.println("04-Dividir");
        int opcao = sc.nextInt();
        return opcao;
    }
    public static void erro() {
        System.out.println("Essa opção não existe! ");
    }
public static void main(String[] args) {


    int opcao;
    do {
        opcao = menu();
        switch (opcao){
            case 1:
                somar();
                break;
            case 2:
                subtrair();
                break;
            case 3:
                multiplicar();
                break;
            case 4:
                divisao();
                break;
            default:
                erro();
        }
    } while (opcao != 0);

}
}
