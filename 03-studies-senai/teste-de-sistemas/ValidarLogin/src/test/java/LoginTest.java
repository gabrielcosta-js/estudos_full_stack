import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginTest {

    @Test
    void loginValido() {

        boolean resultado = Login.loginSystem("Maria", "Maria123@");

        assertTrue(resultado);
    }

    @Test
    void loginInvalido() {

        boolean resultado = Login.loginSystem("Maria", "SenhaErrada");

        assertFalse(resultado);
    }

    @Test
    void loginUsuarioVazio() {

        boolean resultado = Login.loginSystem("", "Maria123@");

        assertFalse(resultado);
    }

    @Test
    void loginSenhaVazia() {

        boolean resultado = Login.loginSystem("Maria", "");

        assertFalse(resultado);
    }

    @Test
    void cadastroEmailValido() {

        boolean resultado = Login.validarEmail("maria@gmail.com");

        assertTrue(resultado);
    }

    @Test
    void cadastroEmailInvalido() {

        boolean resultado = Login.validarEmail("maria@gmail");

        assertFalse(resultado);
    }
}