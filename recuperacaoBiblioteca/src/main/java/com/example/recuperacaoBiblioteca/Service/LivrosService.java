package com.example.recuperacaoBiblioteca.Service;

import com.example.recuperacaoBiblioteca.Model.LivrosModel;
import com.example.recuperacaoBiblioteca.Repository.LivrosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivrosService {

    @Autowired
    private LivrosRepository repository;

    public LivrosModel Salvar(LivrosModel livrosModel){
        return repository.save(livrosModel);
    }

    public List<LivrosModel> ListarTodos(){
        return repository.findAll();
    }

    public LivrosModel BuscarPorId(Long id) {
        // Retorna Optional, e se não existir, retorna null (não lança exceção)
        Optional<LivrosModel> livro = repository.findById(id);
        return livro.orElse(null);
    }

    public LivrosModel Atualizar(Long id, LivrosModel livrosModel){
        LivrosModel livro = repository.findById(id)
                // Aqui sim lança exceção se não encontrar
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        // Atualiza apenas o bibliotecário vinculado ao livro
        livro.setBibliotecario(livrosModel.getBibliotecario());

        return repository.save(livro);
    }

    public void Deletar(Long id){
        repository.deleteById(id);
    }
}
