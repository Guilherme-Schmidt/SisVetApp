package org.sisvetapp.Controller;

import org.sisvetapp.Entity.Animal;
import org.sisvetapp.Service.Animal.AnimalService;
import org.sisvetapp.api.AnimalAPIRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class AnimalController implements AnimalAPIRest {

   private AnimalService animalService;

   @Autowired
   public void setAnimalService(AnimalService animalService) {
       this.animalService = animalService;
   }

    @GetMapping("/listarAnimais")
    public ResponseEntity<List<Animal>> listarAnimais() throws IOException {
        List<Animal> animais = animalService.listAllAnimal();

        return new ResponseEntity<List<Animal>>(animais, HttpStatus.OK);
    }

    @GetMapping("/listarAnimal/{idAnimal}")
    public ResponseEntity<Animal> listarAnimal(int idAnimal) throws IOException {
        Optional<Animal> animalEncontrado = animalService.listByIdAnimal(idAnimal);

        if(animalEncontrado.isPresent()) {
            return new ResponseEntity<Animal>(animalEncontrado.get(), HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal Não Encontrado");
    }

    @PostMapping("/cadastrarAnimal")
    public String cadastrarAnimal(@RequestBody Animal novoAnimal) throws IOException {
        // Verifica se o animal já existe
        Optional<Animal> animalExistente = animalService.listByIdAnimal(novoAnimal.getIdAnimal());
        if (animalExistente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Animal já existe");
        }

        if (novoAnimal.getProprietario() == null || novoAnimal.getProprietario().getIdCliente() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID do cliente não fornecido no JSON");
        }


        // Salva o animal associado ao cliente
        try {
            int idCliente = novoAnimal.getProprietario().getIdCliente();
            animalService.saveAnimal(novoAnimal, idCliente);
            return "Animal cadastrado com sucesso";
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao cadastrar animal", e);
        }
    }


    @PutMapping("/editarAnimal/{idAnimal}")
    public String editarAnimal(@PathVariable int idAnimal,@RequestBody Animal animalAlterado) throws IOException {
        Optional<Animal> animalEncontrado = animalService.listByIdAnimal(idAnimal);
        if (animalEncontrado.isPresent()) {
            animalService.updateAnimal(animalAlterado);
            throw new ResponseStatusException(HttpStatus.OK, "Animal Alterado");
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal Não Encontrado");
    }

    @DeleteMapping("/excluirAnimal/{idAnimal}")
    public void excluirAnimal(int idAnimal) throws IOException {
        Optional<Animal> animalEncontrado = animalService.listByIdAnimal(idAnimal);
        if (animalEncontrado.isPresent()) {
            animalService.deleteAnimal(idAnimal);
            throw new ResponseStatusException(HttpStatus.OK, "Animal Excluído");
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal Não Encontrado");
    }
}
