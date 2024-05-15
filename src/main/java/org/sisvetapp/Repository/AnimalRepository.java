package org.sisvetapp.Repository;

import org.sisvetapp.Entity.Animal;
import org.springframework.data.repository.CrudRepository;

public interface AnimalRepository extends CrudRepository<Animal, Integer> {
}
