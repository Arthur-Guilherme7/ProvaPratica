package com.example.recuperacaoBiblioteca.Controller;

import com.example.recuperacaoBiblioteca.Model.BibliotecarioModel;
import com.example.recuperacaoBiblioteca.Service.BibliotecarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/bibliotecarios")
public class BibliotecarioController {

    @Autowired
     BibliotecarioService service;

    @GetMapping
    public List<BibliotecarioModel>listarTodos(){
        return service.ListarTodos();
    }

    @PostMapping
    public BibliotecarioModel salvar(@RequestBody BibliotecarioModel bibliotecarioModel){
        return service.Salvar(bibliotecarioModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BibliotecarioModel> atualizar(@PathVariable Long id, @RequestBody BibliotecarioModel bibliotecarioModel){
        try {
            BibliotecarioModel bibliotecarioM = service.Atualizar(id, bibliotecarioModel);
            return ResponseEntity.ok(bibliotecarioM);
        }catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        try {
            service.Deletar(id);
            return ResponseEntity.noContent().build();
        }catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

}
