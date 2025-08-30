package com.salao.controller;

import com.salao.model.Cliente;

public class ResponseMessage {
    private String mensagem;
    private Cliente cliente;
    
    public ResponseMessage(String mensagem, Cliente cliente) {
        this.mensagem = mensagem;
        this.cliente = cliente;
    }
    
    public String getMensagem() {
        return mensagem;
    }
    
    public Cliente getCliente() {
        return cliente;
    }
}
