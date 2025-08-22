package com.salao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.salao.model.Cliente;
import com.salao.repository.ClienteRepository;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente) {
        try {
            if (cliente.getNome() == null || cliente.getNome().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (cliente.getTelefone() == null || cliente.getTelefone().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            // Se o e-mail estiver vazio, defina como null para evitar problemas com unique constraint
            if (cliente.getEmail() != null && cliente.getEmail().trim().isEmpty()) {
                cliente.setEmail(null);
            }
            
            Cliente novoCliente = clienteRepository.save(cliente);
            return ResponseEntity.ok(novoCliente);
        } catch (Exception e) {
            e.printStackTrace(); // Log do erro no servidor
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        return clienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        if (!clienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cliente.setId(id);
        Cliente atualizado = clienteRepository.save(cliente);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!clienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        clienteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
