package java;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculadoraTest {

    @Test
    public void testarSoma() {

        float n1 = 2.0f;
        float n2 = -5.0f;

        float resultado = Calculadora.somar(n1, n2);

        assertEquals(-3.0f, resultado, 0.0001f);
    }

    @Test
    public void testarSubtracao() {

        float n1 = 2.0f;
        float n2 = 5.0f;

        float resultado = Calculadora.subtrair(n1, n2);

        assertEquals(-3.0f, resultado, 0.0001f);
    }

    @Test
    public void testarMultiplicacao() {

        float n1 = 2.0f;
        float n2 = 5.0f;

        float resultado = Calculadora.multiplicar(n1, n2);

        assertEquals(10.0f, resultado, 0.0001f);
    }

    @Test
    public void testarDivisao() {

        float n1 = 2.0f;
        float n2 = 5.0f;

        float resultado = Calculadora.divisao(n1, n2);

        assertEquals(0.9f, resultado, 0.0001f);
    }
}