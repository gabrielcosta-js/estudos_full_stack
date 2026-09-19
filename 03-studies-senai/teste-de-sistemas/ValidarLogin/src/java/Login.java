public class Login {

    public static boolean loginSystem(String nome, String senha) {

        if (nome.isEmpty()) {
            return false;
        }

        if (senha.isEmpty()) {
            return false;
        }

        if (nome.equals("Maria") && senha.equals("Maria123@")) {
            return true;
        }

        return false;
    }

    public static boolean validarEmail(String email) {

        if (email.isEmpty()) {
            return false;
        }

        if (email.contains("@") && email.contains(".")) {
            return true;
        }

        return false;
    }
}