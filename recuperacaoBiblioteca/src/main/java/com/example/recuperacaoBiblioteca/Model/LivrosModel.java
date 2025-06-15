package com.example.recuperacaoBiblioteca.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class LivrosModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_bibliotecario",referencedColumnName = "id")
    private BibliotecarioModel bibliotecario;

    private String titulo;

    private String genero;

    private String status = "Disponivel";

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data_cadastro;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BibliotecarioModel getBibliotecario() {
        return bibliotecario;
    }

    public void setBibliotecario(BibliotecarioModel bibliotecario) {
        this.bibliotecario = bibliotecario;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getData_cadastro() {
        return data_cadastro;
    }

    public void setData_cadastro(LocalDate data_cadastro) {
        this.data_cadastro = data_cadastro;
    }
}
