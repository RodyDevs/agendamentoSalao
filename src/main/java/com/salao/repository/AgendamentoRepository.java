package com.salao.repository;

import com.salao.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    // Métodos personalizados podem ser adicionados aqui
}
