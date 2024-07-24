package org.sisvetapp.Service.Compra;

import jakarta.transaction.Transactional;
import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Entity.Compra;
import org.sisvetapp.Entity.Produtos;
import org.sisvetapp.Repository.CompraRepository;
import org.sisvetapp.Repository.ProdutoRepository;
import org.sisvetapp.Service.Cliente.ClienteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompraServiceImpl implements CompraService {

    private static final Logger logger = LoggerFactory.getLogger(CompraService.class);

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Compra> listAllCompras() {
        return compraRepository.findAll();
    }

    public Optional<Compra> findById(Long idCompra) {
        return compraRepository.findById(idCompra);
    }

    @Transactional
    public Compra save(Compra compra) {
        logger.info("Saving compra: " + compra);

        Produtos produto = compra.getProdutos();
        if (produto != null) {
            Optional<Produtos> optionalProduto = produtoRepository.findById(produto.getIdProduto());
            if (optionalProduto.isPresent()) {
                Produtos produtoBD = optionalProduto.get();
                logger.info("Produto carregado: " + produtoBD);

                if (produtoBD.getQuantidade() > 0) {
                    produtoBD.setQuantidade(produtoBD.getQuantidade() - 1);
                    logger.info("Atualizando produto com nova quantidade: " + produtoBD.getQuantidade());
                    produtoRepository.save(produtoBD);
                } else {
                    throw new RuntimeException("Produto fora de estoque.");
                }
            } else {
                throw new RuntimeException("Produto não encontrado.");
            }
        }

        Cliente cliente = compra.getProprietario();
        if (cliente != null) {
            // Lógica para atualizar cliente se necessário
            logger.info("Atualizando cliente: " + cliente);
        }

        Compra savedCompra = compraRepository.save(compra);
        logger.info("Compra salva: " + savedCompra);
        return savedCompra;
    }

    public List<Compra> findComprasByClienteId(Long idCliente) {
        return compraRepository.findByProprietario_IdCliente(idCliente);
    }

    public void deleteById(Long idCompra) {
        Optional<Compra> compraOptional = compraRepository.findById(idCompra);
        if (compraOptional.isPresent()) {
            compraRepository.deleteById(idCompra);
            logger.info("Compra excluída com sucesso: ID {}", idCompra);
        } else {
            throw new RuntimeException("Compra não encontrada para o ID fornecido: " + idCompra);
        }
    }

    public List<Compra> findByProprietarioId(Long idCliente) {
        return compraRepository.findByProprietario_IdCliente(idCliente);
    }
}
