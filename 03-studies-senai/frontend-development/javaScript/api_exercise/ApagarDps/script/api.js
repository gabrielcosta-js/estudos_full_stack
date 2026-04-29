export async function getPensamento() {
    try {
         const response = await fetch('');

         if (!response.ok){
            console.error(response);
            return;
         }

         return response.json();
    } catch (error) {
        console.error("Erro no get Pensamentos", error);
    }
}
export async function postPensamento(postPensamentodata) {
    try {
        const response = await fetch(' ', {

        })
    } catch (error) {
        console.error("Erro no post Pensameto")
    }
}