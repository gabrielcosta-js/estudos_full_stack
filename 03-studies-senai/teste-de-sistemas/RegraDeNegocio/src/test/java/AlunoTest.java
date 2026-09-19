import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AlunoTest {

    @Test
    void calcularMedia() {

        double resultado = Aluno.calcularMedia(8, 7, 9);

        assertEquals(8, resultado);
    }

    @Test
    void alunoAprovado() {

        double media = Aluno.calcularMedia(8, 7, 9);

        boolean resultado = Aluno.estaAprovado(media);

        assertTrue(resultado);
    }

    @Test
    void alunoReprovado() {

        double media = Aluno.calcularMedia(5, 6, 4);

        boolean resultado = Aluno.estaAprovado(media);

        assertFalse(resultado);
    }
}