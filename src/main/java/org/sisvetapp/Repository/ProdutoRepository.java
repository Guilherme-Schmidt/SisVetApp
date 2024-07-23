package org.sisvetapp.Repository;

import org.sisvetapp.Entity.Produtos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produtos, Integer> {
    Optional<Produtos> findByNome(String nome);
}
