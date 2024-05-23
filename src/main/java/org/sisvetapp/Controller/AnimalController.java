package org.sisvetapp.Controller;

import org.sisvetapp.Entity.Animal;
import org.sisvetapp.Service.Animal.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController

public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping("/listarAnimais")
    public ResponseEntity<List<Animal>> listarAnimais() throws IOException {
        List<Animal> animais = animalService.listAllAnimal();
        return new ResponseEntity<>(animais, HttpStatus.OK);
    }

    @GetMapping("/listarAnimal/{idAnimal}")
    public ResponseEntity<Animal> listarAnimal(@PathVariable int idAnimal) throws IOException {
        Optional<Animal> animalEncontrado = animalService.listByIdAnimal(idAnimal);
        if (animalEncontrado.isPresent()) {
            return new ResponseEntity<>(animalEncontrado.get(), HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal Não Encontrado");
    }

    @PostMapping("/cadastrarAnimal")
    public String cadastrarAnimal(@RequestBody Animal novoAnimal) throws IOException {
        if (novoAnimal.getProprietario() == null || novoAnimal.getProprietario().getIdCliente() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID do cliente não fornecido no JSON");
        }
        Optional<Animal> animalExistente = animalService.listByIdAnimal(novoAnimal.getIdAnimal());
        if (animalExistente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Animal já existe");
        }
        animalService.saveAnimal(novoAnimal, novoAnimal.getProprietario().getIdCliente());
        return "Animal cadastrado com sucesso";
    }

    @PutMapping("/editarAnimal/{idAnimal}")
    public String editarAnimal(@PathVariable int idAnimal, @RequestBody Animal animalAlterado) throws IOException {
        Optional<Animal> animalEncontrado = animalService.listByIdAnimal(idAnimal);
        if (animalEncontrado.isPresent()) {
            animalService.updateAnimal(animalAlterado);
            return "Animal Alterado";
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal Não Encontrado");
        }
    }

    @DeleteMapping("/excluirAnimal/{idAnimal}")
    public String excluirAnimal(@PathVariable int idAnimal) throws IOException {
        Optional<Animal> animalEncontrado = animalService.listByIdAnimal(idAnimal);
        if (animalEncontrado.isPresent()) {
            animalService.deleteAnimal(idAnimal);
            return "Animal Excluído";
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal Não Encontrado");
        }
    }
}
