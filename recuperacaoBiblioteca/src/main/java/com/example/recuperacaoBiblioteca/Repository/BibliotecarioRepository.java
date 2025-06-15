package com.example.recuperacaoBiblioteca.Repository;

import com.example.recuperacaoBiblioteca.Model.BibliotecarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BibliotecarioRepository extends JpaRepository<BibliotecarioModel, Long> {
}
