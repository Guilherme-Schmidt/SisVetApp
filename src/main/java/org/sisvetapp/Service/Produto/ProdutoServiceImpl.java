package org.sisvetapp.Service.Produto;

import org.sisvetapp.Entity.Produtos;
import org.sisvetapp.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoServiceImpl implements ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;
    @Override
    public List<Produtos> listAllProdutos() throws IOException {
        List<Produtos> produtos = new ArrayList<>();
        produtoRepository.findAll().forEach(produtos::add);

        return produtos;
    }

    public Optional<Produtos> findByNome(String nome) {
        return produtoRepository.findByNome(nome);
    }

    @Override
    public Optional<Produtos> findByIdProduto(int idProduto) {
        return produtoRepository.findById(idProduto);
    }

    @Override
    public void deleteProduto(int idProduto) {
        produtoRepository.deleteById(idProduto);
    }


    @Override
    public Optional<Produtos> listByIdProduto(int idProduto) throws IOException {
        return produtoRepository.findById(idProduto);
    }

    @Override
    public void saveProduto(Produtos produto) throws IOException {
        produtoRepository.save(produto);
    }

    @Override
    public Produtos incrementarQuantidade(int idProduto) throws IOException {
        Optional<Produtos> optionalProduto = produtoRepository.findById(idProduto);
        if (optionalProduto.isPresent()) {
            Produtos produto = optionalProduto.get();
            produto.setQuantidade(produto.getQuantidade() + 1);
            return produtoRepository.save(produto);
        } else {
            throw new IOException("Produto não encontrado com ID: " + idProduto);
        }
    }


}
