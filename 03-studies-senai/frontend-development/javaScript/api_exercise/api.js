// Forma padrão da Api o Get
async function getTarefa() {
    try {
        // Link da APi pro Get, await faz esperar a resposta
        const response = await fetch('http://localhost:3000/task'); 

    } catch (error) {
         console.error('Erro ao buscar usuário: ', error)
    }
}