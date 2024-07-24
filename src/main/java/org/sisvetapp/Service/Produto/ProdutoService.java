package org.sisvetapp.Service.Produto;

import org.sisvetapp.Entity.Produtos;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface ProdutoService  {
    List<Produtos> listAllProdutos() throws IOException;


    Optional<Produtos> listByIdProduto(int idProduto) throws IOException;

    void saveProduto(Produtos produto) throws IOException;

    Optional<Produtos> findByNome(String nome);


    Optional<Produtos> findByIdProduto(int idProduto);

    void deleteProduto(int idProduto);

    Produtos incrementarQuantidade(int idProduto) throws IOException;
}
