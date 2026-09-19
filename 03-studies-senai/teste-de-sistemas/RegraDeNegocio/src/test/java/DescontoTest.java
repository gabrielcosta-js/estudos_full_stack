import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DescontoTest {

    @Test
    void descontoDezPorcento() {

        double resultado = Desconto.calcularDesconto(100);

        assertEquals(90, resultado);
    }

    @Test
    void descontoClienteVIP() {

        double resultado = Desconto.calcularDescontoVIP(100);

        assertEquals(80, resultado);
    }
}