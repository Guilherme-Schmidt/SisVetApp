package org.sisvetapp.Repository;

import org.sisvetapp.Entity.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CompraRepository extends JpaRepository<Compra, Long> {
    List<Compra> findByProprietario_IdCliente(Long idCliente);
}
