package org.sisvetapp.Service.Compra;

import jakarta.transaction.Transactional;
import org.sisvetapp.Entity.Compra;
import org.sisvetapp.Entity.Produtos;
import org.sisvetapp.Repository.CompraRepository;
import org.sisvetapp.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public interface CompraService {


    Optional<Compra> findById(Long idCompra);

    Compra save(Compra compra);

    void deleteById(Long idCompra);

    List<Compra> findByProprietarioId(Long idCliente);

    List<Compra> listAllCompras();

    List<Compra> findComprasByClienteId(Long idCliente);
}
