export async function getAluno() {
    try {
        const response = await fetch('http://localhost:3000/alunos');
        return await response.json();
    } catch (error) {
        console.error('Erro ao puxar as informações: ', error)
    }
}

export async function postAluno(postDataAluno) {
    try {
        const response = await fetch('http://localhost:3000/alunos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postDataAluno)
        });

        if (!response.ok) {
            console.error(response);
            return;
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar as informações: ', error)
    }
}

export async function putAluno(id, putDataAluno) {
    try {
        const response = await fetch(`http://localhost:3000/alunos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(putDataAluno)
        });

        if (!response.ok) {
            console.error(response);
            return;
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar todas as informações: ', error)
    }
}

export async function patchAluno(id, patchDataAluno) {
    try {
        const response = await fetch(`http://localhost:3000/alunos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchDataAluno)
        });

        if (!response.ok) {
            console.error(response);
            return;
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar a informação: ', error)
    }
}

export async function deleteAluno(id) {
    try {
        const response = await fetch(`http://localhost:3000/alunos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error(response);
            return;
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao deletar as informações: ', error)
    }
}