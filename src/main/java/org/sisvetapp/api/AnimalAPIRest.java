package org.sisvetapp.api;

import org.sisvetapp.Entity.Animal;
import org.sisvetapp.Entity.Cliente;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

public interface AnimalAPIRest {


    @GetMapping("/listarAnimais")
    public ResponseEntity<List<Animal>> listarAnimais() throws IOException;

    @GetMapping("/listarAnimal/{idAnimal}")
    public ResponseEntity<Animal> listarAnimal(@PathVariable int idAnimal) throws IOException;

    @PostMapping("/cadastrarAnimal")
    public String cadastrarAnimal(@RequestBody Animal novoanimal) throws IOException;

    @PutMapping("/editarAnimal/{idAnimal}")
    public String editarAnimal(@PathVariable int idAnimal, @RequestBody Animal animal) throws IOException;

    @DeleteMapping("/excluirAnimal/{idAnimal}")
    public void excluirAnimal(@PathVariable int idAnimal) throws IOException;
}
