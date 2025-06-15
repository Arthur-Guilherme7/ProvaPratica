package com.example.recuperacaoBiblioteca.Service;

import com.example.recuperacaoBiblioteca.Model.BibliotecarioModel;
import com.example.recuperacaoBiblioteca.Repository.BibliotecarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BibliotecarioService {

    @Autowired
    private BibliotecarioRepository repository;

    public BibliotecarioModel Salvar(BibliotecarioModel bibliotecarioModel){
        return repository.save(bibliotecarioModel);
    }

    public List<BibliotecarioModel> ListarTodos(){
        return repository.findAll();
    }

    public BibliotecarioModel Atualizar(Long id, BibliotecarioModel bibliotecarioModel){
        BibliotecarioModel bibliotecario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bibliotecario não encontrado"));

        bibliotecario.setEmail(bibliotecarioModel.getEmail());
        bibliotecario.setNome(bibliotecarioModel.getNome());

        return repository.save(bibliotecario);
    }

    public void Deletar(Long id){
        repository.deleteById(id);
    }
}
