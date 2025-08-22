document.addEventListener('DOMContentLoaded', function() {
    const agendamentoForm = document.getElementById('agendamentoForm');
    const agendamentosTable = document.getElementById('agendamentosTable');

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
