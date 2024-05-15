package org.sisvetapp.Service.Animal;

import org.sisvetapp.Entity.Animal;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface AnimalService {

    List<Animal> listAllAnimal() throws IOException;

    Optional<Animal> listByIdAnimal(int idAnimal) throws IOException;

    void saveAnimal(Animal Animal, int idCliente);
    void updateAnimal(Animal animal);
    void deleteAnimal(int idAnimal);
}
