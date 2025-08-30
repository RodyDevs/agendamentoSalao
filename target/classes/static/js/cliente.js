function cadastrarCliente(event) {
    event.preventDefault();
    
    const cliente = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value
    };
    
    console.log('Enviando dados do cliente:', cliente);
    
    fetch('/api/clientes/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(response => {
        console.log('Status da resposta:', response.status);
        if (!response.ok) {
            return response.text().then(text => {
                console.error('Erro detalhado:', text);
                throw new Error(text || 'Erro ao cadastrar cliente');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta do servidor:', data);
        alert('Cliente cadastrado com sucesso!');
        document.getElementById('formCliente').reset();
    })
    .catch(error => {
        console.error('Erro completo:', error);
        alert('Erro ao cadastrar cliente: ' + error.message);
    });
}
