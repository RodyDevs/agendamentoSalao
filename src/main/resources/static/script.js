document.addEventListener('DOMContentLoaded', function() {
    const clienteForm = document.getElementById('clienteForm');
    const agendamentoForm = document.getElementById('agendamentoForm');
    const agendamentosTable = document.getElementById('agendamentosTable');
    const clientesGrid = document.getElementById('clientesGrid');

    // Carregar lista de clientes ao iniciar
    if (clientesGrid) {
        carregarClientes();
    }
    
    if (clienteForm) {
        clienteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                nome: document.getElementById('nome').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value || null,
                dataNascimento: document.getElementById('dataNascimento').value || null,
                cpf: document.getElementById('cpf').value || null,
                endereco: document.getElementById('endereco').value || null
            };

            try {
                if (!formData.nome || !formData.telefone) {
                    alert('Nome e telefone são obrigatórios.');
                    return;
                }

                const response = await fetch('/api/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Cliente cadastrado com sucesso!');
                    clienteForm.reset();
                    await carregarClientes();
                } else {
                    const errorData = await response.text();
                    alert('Erro ao cadastrar cliente: ' + (errorData || 'Por favor, tente novamente.'));
                }
            } catch (error) {
                alert('Erro ao cadastrar cliente: Verifique sua conexão e tente novamente.');
            }
        });
    }

    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                cliente: document.getElementById('cliente').value,
                servico: document.getElementById('servico').value,
                data: document.getElementById('data').value,
                horario: document.getElementById('horario').value
            };

            try {
                const response = await fetch('/api/agendamentos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Agendamento realizado com sucesso!');
                    window.location.href = '/listar';
                } else {
                    alert('Erro ao realizar agendamento');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao realizar agendamento');
            }
        });
    }

    if (agendamentosTable) {
        carregarAgendamentos();
    }
});

async function carregarAgendamentos() {
    try {
        const response = await fetch('/api/agendamentos');
        const agendamentos = await response.json();
        
        const tbody = document.querySelector('#agendamentosTable tbody');
        tbody.innerHTML = '';
        
        agendamentos.forEach(agendamento => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${agendamento.cliente}</td>
                <td>${agendamento.servico}</td>
                <td>${agendamento.data}</td>
                <td>${agendamento.horario}</td>
                <td>
                    <button onclick="excluirAgendamento(${agendamento.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
    }
}

async function excluirAgendamento(id) {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        try {
            const response = await fetch(`/api/agendamentos/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Agendamento excluído com sucesso!');
                carregarAgendamentos();
            } else {
                alert('Erro ao excluir agendamento');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir agendamento');
        }
    }
}

// Função para carregar clientes
async function carregarClientes() {
    try {
        const response = await fetch('/api/clientes');
        if (!response.ok) {
            return;
        }
        const clientes = await response.json();
        
        const clientesGrid = document.getElementById('clientesGrid');
        if (!clientesGrid) {
            return;
        }
        
        clientesGrid.innerHTML = '';
        
        if (clientes.length === 0) {
            clientesGrid.innerHTML = '<p class="no-clients">Nenhum cliente cadastrado.</p>';
            return;
        }
        
        clientes.forEach(cliente => {
            const clienteCard = document.createElement('div');
            clienteCard.className = 'cliente-card';
            
            // Formata a data de nascimento
            let dataNascimento = 'Não informado';
            if (cliente.dataNascimento) {
                const data = new Date(cliente.dataNascimento);
                if (!isNaN(data.getTime())) {
                    const dia = data.getDate().toString().padStart(2, '0');
                    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
                    const ano = data.getFullYear();
                    dataNascimento = `${dia}/${mes}/${ano}`;
                }
            }
            
            clienteCard.innerHTML = `
                <h3>${cliente.nome}</h3>
                <div class="cliente-info">
                    <div>
                        <div class="info-label">Telefone</div>
                        <div class="info-value">${cliente.telefone || 'Não informado'}</div>
                    </div>
                    <div>
                        <div class="info-label">Data de Nascimento</div>
                        <div class="info-value">${dataNascimento}</div>
                    </div>
                    <div>
                        <div class="info-label">Email</div>
                        <div class="info-value">${cliente.email || 'Não informado'}</div>
                    </div>
                    <div>
                        <div class="info-label">CPF</div>
                        <div class="info-value">${cliente.cpf || 'Não informado'}</div>
                    </div>
                    <div>
                        <div class="info-label">Endereço</div>
                        <div class="info-value">${cliente.endereco || 'Não informado'}</div>
                    </div>
                </div>
                <div class="cliente-acoes">
                    <button class="btn-editar" onclick="editarCliente(${cliente.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
                </div>
            `;
            
            clientesGrid.appendChild(clienteCard);
        });
    } catch (error) {
        console.error('Erro ao carregar clientes:', error);
    }
}

// Função para excluir cliente
async function excluirCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        try {
            const response = await fetch(`/api/clientes/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Cliente excluído com sucesso!');
                carregarClientes();
            } else {
                alert('Erro ao excluir cliente');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir cliente');
        }
    }
}

// Função para editar cliente
function editarCliente(id) {
    // Implementar a lógica de edição posteriormente
    alert('Funcionalidade de edição será implementada em breve!');
}
