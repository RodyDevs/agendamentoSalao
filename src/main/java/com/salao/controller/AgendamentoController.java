package com.salao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

import com.salao.model.Agendamento;
import com.salao.model.Cliente;
import com.salao.repository.AgendamentoRepository;
import com.salao.repository.ClienteRepository;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Agendamento> listarTodos() {
        try {
            List<Agendamento> agendamentos = agendamentoRepository.findAll();
            for (Agendamento agendamento : agendamentos) {
                if (agendamento.getCliente() != null && agendamento.getCliente().getId() != null) {
                    // Busca o cliente completo do banco
                    Cliente cliente = clienteRepository.findById(agendamento.getCliente().getId()).orElse(null);
                    if (cliente != null) {
                        // Atualiza o cliente no agendamento com todos os dados
                        Cliente clienteCompleto = new Cliente();
                        clienteCompleto.setId(cliente.getId());
                        clienteCompleto.setNome(cliente.getNome());
                        clienteCompleto.setTelefone(cliente.getTelefone());
                        clienteCompleto.setEmail(cliente.getEmail());
                        clienteCompleto.setCpf(cliente.getCpf());
                        clienteCompleto.setEndereco(cliente.getEndereco());
                        clienteCompleto.setDataNascimento(cliente.getDataNascimento());
                        agendamento.setCliente(clienteCompleto);
                    }
                }
            }
            return agendamentos;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Agendamento agendamento) {
        try {
            // Validar se o cliente foi fornecido
            if (agendamento.getCliente() == null || agendamento.getCliente().getId() == null) {
                Map<String, String> response = new HashMap<>();
                response.put("mensagem", "Cliente não especificado");
                return ResponseEntity.badRequest().body(response);
            }

            // Buscar o cliente completo
            Cliente cliente = clienteRepository.findById(agendamento.getCliente().getId())
                .orElse(null);

            if (cliente == null) {
                Map<String, String> response = new HashMap<>();
                response.put("mensagem", "Cliente não encontrado");
                return ResponseEntity.badRequest().body(response);
            }

            // Setar o cliente completo no agendamento
            agendamento.setCliente(cliente);

            // Salvar o agendamento
            Agendamento novoAgendamento = agendamentoRepository.save(agendamento);
            
            // Garantir que o cliente está presente na resposta
            novoAgendamento.setCliente(cliente);
            
            return ResponseEntity.ok(novoAgendamento);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("mensagem", "Erro ao criar agendamento: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        return agendamentoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!agendamentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        agendamentoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> atualizar(@PathVariable Long id, @RequestBody Agendamento agendamento) {
        if (!agendamentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        agendamento.setId(id);
        Agendamento atualizado = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(atualizado);
    }
}
