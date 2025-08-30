package com.salao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.salao.model.Cliente;
import com.salao.repository.ClienteRepository;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos() {
        try {
            System.out.println("Recebida requisição para listar clientes");
            List<Cliente> clientes = clienteRepository.findAll();
            System.out.println("Quantidade de clientes encontrados: " + clientes.size());
            if (clientes.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("mensagem", "Nenhum cliente encontrado");
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.ok(clientes);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("mensagem", "Erro ao buscar clientes: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrarCliente(@RequestBody Cliente cliente) {
        Map<String, String> response = new HashMap<>();
        
        try {
            // Validações
            if (cliente.getNome() == null || cliente.getNome().trim().isEmpty()) {
                response.put("mensagem", "O nome é obrigatório.");
                return ResponseEntity.badRequest().body(response);
            }

            if (cliente.getTelefone() == null || cliente.getTelefone().trim().isEmpty()) {
                response.put("mensagem", "O telefone é obrigatório.");
                return ResponseEntity.badRequest().body(response);
            }

            // Limpa campos vazios
            cliente.setNome(cliente.getNome().trim());
            cliente.setTelefone(cliente.getTelefone().trim());
            
            if (cliente.getEmail() != null) {
                String email = cliente.getEmail().trim();
                cliente.setEmail(email.isEmpty() ? null : email);
            }

            // Verifica email duplicado se não for nulo
            if (cliente.getEmail() != null && !cliente.getEmail().trim().isEmpty()) {
                Cliente existente = clienteRepository.findByEmail(cliente.getEmail().trim());
                if (existente != null) {
                    response.put("mensagem", "Este email já está cadastrado.");
                    return ResponseEntity.badRequest().body(response);
                }
            }

            // Salva o cliente e retorna sucesso
            Cliente novoCliente = clienteRepository.save(cliente);
            response.put("mensagem", "Cliente cadastrado com sucesso!");
            return ResponseEntity.ok(novoCliente);

        } catch (Exception e) {
            response.put("mensagem", "Erro ao cadastrar cliente.");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        
        try {
            if (!clienteRepository.existsById(id)) {
                response.put("mensagem", "Cliente não encontrado.");
                return ResponseEntity.status(404).body(response);
            }

            try {
                clienteRepository.deleteById(id);
                response.put("mensagem", "Cliente excluído com sucesso!");
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                response.put("mensagem", "Este cliente não pode ser excluído pois possui agendamentos.");
                return ResponseEntity.status(400).body(response);
            }
        } catch (Exception e) {
            response.put("mensagem", "Erro ao excluir cliente.");
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return clienteRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> {
                        Map<String, String> response = new HashMap<>();
                        response.put("mensagem", "Cliente não encontrado.");
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("mensagem", "Erro ao buscar cliente.");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        Map<String, String> response = new HashMap<>();
        
        try {
            if (!clienteRepository.existsById(id)) {
                response.put("mensagem", "Cliente não encontrado.");
                return ResponseEntity.notFound().build();
            }

            cliente.setId(id);
            Cliente clienteAtualizado = clienteRepository.save(cliente);
            response.put("mensagem", "Cliente atualizado com sucesso!");
            return ResponseEntity.ok(clienteAtualizado);
            
        } catch (Exception e) {
            response.put("mensagem", "Erro ao atualizar cliente.");
            return ResponseEntity.badRequest().body(response);
        }
    }
}
