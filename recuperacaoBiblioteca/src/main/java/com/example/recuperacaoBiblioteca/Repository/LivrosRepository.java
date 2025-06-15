package com.example.recuperacaoBiblioteca.Repository;

import com.example.recuperacaoBiblioteca.Model.LivrosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivrosRepository extends JpaRepository<LivrosModel, Long> {

}
