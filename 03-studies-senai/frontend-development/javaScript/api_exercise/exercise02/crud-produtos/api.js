export async function getProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        return response.json();
    } catch (error) {
        console.error('Erro ao buscar produto', error);
    }
} 

export async function postProdutos(produtosDataPost) {
    try {
         const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(produtosDataPost)
         });

         if (response.ok) {
            console.error(response)
            return;
         }

    } catch (error) {
        console.error('Erro ao enviar produto', error);
    }
}

export async function putProdutos(id, produtosDataPut) {
    try {
         const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(produtosDataPut)
         });

         if (response.ok) {
            console.error(response)
            return;
         }

    } catch (error) {
        console.error('Erro ao atualizar produto', error);
    }
}

export async function deleteProdutos(id, produtosDataDelete) {
    try {
         const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(produtosDataDelete)
         });

         if (response.ok) {
            console.error(response)
            return;
         }

    } catch (error) {
        console.error('Erro ao Deletar produto', error);
    }
}