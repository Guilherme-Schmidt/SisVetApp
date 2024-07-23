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
public class CompraService {

    private static final Logger logger = Logger.getLogger(CompraService.class.getName());

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Compra> findAll() {
        return compraRepository.findAll();
    }

    public Optional<Compra> findById(Long idCompra) {
        return compraRepository.findById(idCompra);
    }

    @Transactional
    public Compra save(Compra compra) {
        logger.info("Saving compra: " + compra);

        // Carregar o produto da base de dados
        Produtos produto = compra.getProdutos();
        if (produto != null) {
            Optional<Produtos> optionalProduto = produtoRepository.findById(produto.getIdProduto());
            if (optionalProduto.isPresent()) {
                Produtos produtoBD = optionalProduto.get();
                logger.info("Produto carregado: " + produtoBD);
                logger.info("Produto quantidade: " + produtoBD.getQuantidade());

                if (produtoBD.getQuantidade() > 0) {
                    produtoBD.setQuantidade(produtoBD.getQuantidade() - 1);
                    produtoRepository.save(produtoBD);
                    return compraRepository.save(compra);
                } else {
                    throw new RuntimeException("Produto fora de estoque.");
                }
            } else {
                throw new RuntimeException("Produto não encontrado.");
            }
        } else {
            throw new RuntimeException("Produto não pode ser nulo.");
        }
    }


    public void deleteById(Long idCompra) {
        compraRepository.deleteById(idCompra);
    }

    public List<Compra> findByProprietarioId(Long idCliente) {
        return compraRepository.findByProprietario_IdCliente(idCliente);
    }
}
