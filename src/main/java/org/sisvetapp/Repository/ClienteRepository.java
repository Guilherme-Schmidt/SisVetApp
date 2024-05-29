package org.sisvetapp.Repository;

import jakarta.transaction.Transactional;
import org.sisvetapp.Entity.Cliente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente,Integer> {


}
