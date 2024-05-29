package org.sisvetapp.Repository;

import jakarta.transaction.Transactional;
import org.sisvetapp.Entity.Animal;
import org.sisvetapp.Entity.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface AnimalRepository extends CrudRepository<Animal, Integer> {
    @Transactional
    void deleteByProprietario(Cliente cliente);
}
