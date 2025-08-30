// Função global para formatar data
function formatarData(data) {
    if (!data) return '-';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const clienteForm = document.getElementById('clienteForm');
    const agendamentoForm = document.getElementById('agendamentoForm');
    
    // Verifica em qual página estamos
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index';
    const isAgendamentosPage = window.location.pathname === '/agendamento/lista';
    const isNovoAgendamentoPage = window.location.pathname === '/agendamento/novo';

    // Função para carregar clientes
    async function carregarClientes() {
        try {
            const response = await fetch('/api/clientes');
            if (!response.ok) {
                throw new Error('Erro ao carregar clientes');
            }
            const clientes = await response.json();
            
            const table = document.getElementById('clientesTable');
            if (!table) return;
            
            const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));
            tbody.innerHTML = '';
            
            if (clientes.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" class="text-center">Nenhum cliente cadastrado</td></tr>';
                return;
            }

            clientes.forEach(cliente => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.nome || '-'}</td>
                    <td>${cliente.telefone || '-'}</td>
                    <td>${cliente.email || '-'}</td>
                    <td>${cliente.cpf || '-'}</td>
                    <td>${cliente.endereco || '-'}</td>
                    <td>${formatarData(cliente.dataNascimento)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="excluirCliente(${cliente.id})">Excluir</button>
                        <button class="btn btn-primary btn-sm" onclick="editarCliente(${cliente.id})">Editar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            const table = document.getElementById('clientesTable');
            if (table) {
                const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));
                tbody.innerHTML = '<tr><td colspan="7" class="text-center">Erro ao carregar clientes</td></tr>';
            }
        }
    }

    // Função para carregar clientes no dropdown de agendamento
    async function carregarClientesParaAgendamento() {
        try {
            const response = await fetch('/api/clientes');
            if (!response.ok) {
                throw new Error('Erro ao carregar clientes');
            }
            const clientes = await response.json();
            
            const select = document.getElementById('cliente');
            if (!select) return;
            
            select.innerHTML = '<option value="">Selecione um cliente</option>';
            
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = cliente.nome;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            alert('Erro ao carregar lista de clientes.');
        }
    }

    // Carrega os clientes na página inicial
    if (isHomePage && document.getElementById('clientesTable')) {
        carregarClientes();
    }

    // Carrega os clientes no dropdown de agendamento
    if (isNovoAgendamentoPage && document.getElementById('cliente')) {
        carregarClientesParaAgendamento();
    }

    // Handler do formulário de cliente
    if (clienteForm) {
        clienteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                nome: document.getElementById('nome').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                email: document.getElementById('email').value.trim() || null,
                dataNascimento: document.getElementById('dataNascimento').value || null,
                cpf: document.getElementById('cpf').value.trim() || null,
                endereco: document.getElementById('endereco').value.trim() || null
            };

            if (!formData.nome) {
                alert('O nome é obrigatório.');
                return;
            }
            if (!formData.telefone) {
                alert('O telefone é obrigatório.');
                return;
            }

            try {
                const method = document.getElementById('clienteId') ? 'PUT' : 'POST';
                const url = method === 'PUT' ? 
                    `/api/clientes/${document.getElementById('clienteId').value}` : 
                    '/api/clientes';

                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                if (response.ok) {
                    alert(method === 'PUT' ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
                    this.reset();
                    if (document.getElementById('clienteId')) {
                        document.getElementById('clienteId').remove();
                        document.querySelector('#clienteForm button[type="submit"]').textContent = 'Cadastrar Cliente';
                    }
                    await carregarClientes();
                    return;
                }
                
                alert(data.mensagem || 'Erro ao processar cliente.');
            } catch (error) {
                alert('Erro ao processar cliente.');
            }
        });
    }

    // Handler do formulário de agendamento
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                cliente: {
                    id: document.getElementById('cliente').value
                },
                servico: document.getElementById('servico').value,
                data: document.getElementById('data').value,
                horario: document.getElementById('horario').value
            };

            if (!formData.cliente || !formData.servico || !formData.data || !formData.horario) {
                alert('Todos os campos são obrigatórios.');
                return;
            }

            try {
                const response = await fetch('/api/agendamentos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Agendamento realizado com sucesso!');
                    this.reset();
                    if (isAgendamentosPage) {
                        await carregarAgendamentos();
                    }
                    return;
                }

                alert(data.mensagem || 'Erro ao realizar agendamento.');
            } catch (error) {
                alert('Erro ao realizar agendamento.');
            }
        });
    }

    // Carrega agendamentos se estiver na página de agendamentos
    if (isAgendamentosPage && document.getElementById('agendamentosTable')) {
        carregarAgendamentos();
    }
});

// Funções globais
async function excluirCliente(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
        return;
    }

    try {
        const response = await fetch(`/api/clientes/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.mensagem || 'Cliente excluído com sucesso!');
            window.location.reload();
            return;
        }

        if (response.status === 404) {
            alert('Cliente não encontrado.');
            return;
        }

        const data = await response.json().catch(() => ({}));
        alert(data.mensagem || 'Erro ao excluir cliente.');
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente. Por favor, tente novamente.');
    }
}

async function editarCliente(id) {
    try {
        const response = await fetch(`/api/clientes/${id}`);
        const cliente = await response.json();
        
        if (!response.ok) {
            throw new Error('Cliente não encontrado');
        }

        // Preenche o formulário com os dados do cliente
        ['nome', 'telefone', 'email', 'cpf', 'endereco', 'dataNascimento'].forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.value = cliente[field] || '';
            }
        });

        // Adiciona o ID do cliente como campo hidden
        let idInput = document.getElementById('clienteId');
        if (!idInput) {
            idInput = document.createElement('input');
            idInput.type = 'hidden';
            idInput.id = 'clienteId';
            document.getElementById('clienteForm').appendChild(idInput);
        }
        idInput.value = id;

        // Atualiza o texto do botão
        const submitButton = document.querySelector('#clienteForm button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Atualizar Cliente';
        }

        // Scroll suave até o formulário
        document.getElementById('clienteForm')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        alert('Erro ao carregar dados do cliente');
    }
}

async function carregarAgendamentos() {
    try {
        const response = await fetch('/api/agendamentos');
        if (!response.ok) {
            throw new Error('Erro ao carregar agendamentos');
        }

        const agendamentos = await response.json();
        const tabela = document.getElementById('agendamentosTable');
        if (!tabela) return;

        const tbody = tabela.querySelector('tbody') || tabela.appendChild(document.createElement('tbody'));
        tbody.innerHTML = '';

        if (agendamentos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum agendamento encontrado</td></tr>';
            return;
        }

        agendamentos.sort((a, b) => {
            // Ordenar por data e horário
            const dataA = new Date(a.data + 'T' + a.horario);
            const dataB = new Date(b.data + 'T' + b.horario);
            return dataA - dataB;
        });

        agendamentos.forEach(agendamento => {
            const row = document.createElement('tr');
            // Garantir que temos os dados do cliente
            const nomeCliente = agendamento.cliente && agendamento.cliente.nome 
                ? agendamento.cliente.nome 
                : 'Cliente não especificado';
            
            row.innerHTML = `
                <td>${nomeCliente}</td>
                <td>${agendamento.servico || '-'}</td>
                <td>${formatarData(agendamento.data)}</td>
                <td>${agendamento.horario || '-'}</td>
                <td>
                    <button class="btn btn-danger" onclick="cancelarAgendamento(${agendamento.id})">Cancelar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
        alert('Erro ao carregar agendamentos.');
    }
}

async function cancelarAgendamento(id) {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) {
        return;
    }

    try {
        const response = await fetch(`/api/agendamentos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Agendamento cancelado com sucesso!');
            await carregarAgendamentos();
            return;
        }

        const data = await response.json();
        alert(data.mensagem || 'Erro ao cancelar agendamento.');
    } catch (error) {
        alert('Erro ao cancelar agendamento.');
    }
}