package com.salao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.salao.model.Agendamento;
import com.salao.repository.AgendamentoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Agendamento> criar(@RequestBody Agendamento agendamento) {
        Agendamento novoAgendamento = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(novoAgendamento);
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
