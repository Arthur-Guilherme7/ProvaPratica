package com.example.recuperacaoBiblioteca.Controller;

import com.example.recuperacaoBiblioteca.Model.LivrosModel;
import com.example.recuperacaoBiblioteca.Service.LivrosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin
public class LivrosController {

    @Autowired
    private LivrosService service;

    @GetMapping
    public List<LivrosModel> listarTodos() {
        return service.ListarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivrosModel> buscarPorId(@PathVariable Long id) {
        LivrosModel livro = service.BuscarPorId(id);
        if (livro != null) {
            return ResponseEntity.ok(livro);
        }
        // Retorna 404 se não encontrado (sem lançar exceção aqui)
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public LivrosModel salvar(@RequestBody LivrosModel livrosModel) {
        return service.Salvar(livrosModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LivrosModel> atualizar(@PathVariable Long id, @RequestBody LivrosModel livrosModel) {
        try {
            LivrosModel livrosM = service.Atualizar(id, livrosModel);
            return ResponseEntity.ok(livrosM);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // 404 caso o livro não exista
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            service.Deletar(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
}
