package com.salao.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import com.salao.repository.ClienteRepository;
import com.salao.repository.AgendamentoRepository;

@Controller
public class PaginaController {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private AgendamentoRepository agendamentoRepository;
    
    @GetMapping("/")
    public String index() {
        return "index";
    }
    
    @GetMapping("/listar")
    public String listar(Model model) {
        model.addAttribute("clientes", clienteRepository.findAll());
        return "listar";
    }
    
    @GetMapping("/cadastrar")
    public String cadastrar() {
        return "cadastrar";
    }
    
    @GetMapping("/agendamento/novo")
    public String novoAgendamento(Model model) {
        model.addAttribute("clientes", clienteRepository.findAll());
        return "agendamento/novo";
    }
    
    @GetMapping("/agendamento/lista")
    public String listarAgendamentos(Model model) {
        model.addAttribute("agendamentos", agendamentoRepository.findAll());
        return "agendamento/lista";
    }
}
