// Forma padrão da Api o Get
async function getTasks() {
  try {
    // Link da APi pro Get, await faz esperar a resposta
    const response = await fetch('http://localhost:3000/tasks');
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar tarefa: ', error);
  }
}

async function getUsers() {
  try {
    const response = await fetch('http://localhost:3000/users');
    return response.json();

  } catch (error) {
    console.error('Erro ao buscar o usuário', error)
  }
}

// Post //////////////////////////////////////////////////////
async function PostTasks(postTaskData) {
    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {'ContentType' : 'application/json'},
            body: JSON.stringify(postTaskData)
        })

        if (!response.ok) {
            console.error(response)
            return;
        }

        return response.json();
    } catch (error) {
        console.error('Erro ao criar o usuário', error)
    }
}

async function postUsers(postUsersData) {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postUsersData),
    });

    if (!response.ok) {
      console.error(response);
      return;
    }

    return response.json();
  } catch (error) {
    console.error("Error ao criar o usuário: ", error);
  }
}

// PUT ///////////////////////////////////////////////////////////
async function putTaks(id, putTaskData) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {'ContentType' : 'application/json'},
            body: JSON.stringify(putTaskData)
        })

        if (!response.ok) {
            console.error(response.statusText);
        }

        return response.json();
    } catch (error) {
        console.error('Erro ao atualizar a Tarefa', error)
    }
}

async function putUsers(id, putUsersData){
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {'ContentType' : 'application/json'},
            body: JSON.stringify(putUsersData)
        })

        if (!response.ok){
            console.error(response.statusText);
            return
        }

        return response.json();
    } catch (error) {
        console.error('Erro ao atualizar o usuário', error);
    }
}

// Delete ////////////////////////////////////
async function deleteTaks(id) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok){
            console.error(response.statusText);
        }
        return response.json();
    } catch (error) {
        console.error('Erro ao deletar a tarefa', error);
    }
}

async function deleteUsers(id) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok){
            console.error(response.statusText);
        }
        return response.json();
    } catch (error) {
        console.error('Erro ao deletar o usuário', error);
    }
}