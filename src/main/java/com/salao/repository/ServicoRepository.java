package com.salao.repository;

import com.salao.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    // Métodos personalizados podem ser adicionados aqui
}
