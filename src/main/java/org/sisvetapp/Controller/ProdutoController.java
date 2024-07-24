package org.sisvetapp.Controller;

import org.sisvetapp.Entity.Animal;
import org.sisvetapp.Entity.Produtos;
import org.sisvetapp.Service.Cliente.ClienteService;
import org.sisvetapp.Service.Produto.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
public class ProdutoController {

    private static final Logger logger = Logger.getLogger(ProdutoController.class.getName());


    @Autowired
    private ProdutoService produtoService;

    public void setProdutoService(ProdutoService produtoService)
    {
        this.produtoService = produtoService;
    }


    @GetMapping("/listarProdutos")
    public ResponseEntity<List<Produtos>> listarProdutos() throws IOException {
        List<Produtos> produtos = produtoService.listAllProdutos();
        return new ResponseEntity<>(produtos, HttpStatus.OK);
    }

    @GetMapping("/listarProduto/{idProduto}")
    public ResponseEntity<Produtos> listarProduto(@PathVariable(name = "idProduto", required = false) Integer idProduto) throws IOException {
        if (idProduto == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product ID is missing");
        }

        Optional<Produtos> produtoEncontrado = produtoService.listByIdProduto(idProduto);

        if (produtoEncontrado.isPresent()) {
            return new ResponseEntity<>(produtoEncontrado.get(), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto Não Encontrado");
        }
    }

    @PostMapping("/cadastrarProdutos")
    public String cadastrarProdutos(@RequestBody Produtos novoProduto) throws IOException {
        Optional<Produtos> produtoEncontrado = produtoService.findByNome(novoProduto.getNome());

        if (produtoEncontrado.isPresent()) {
            Produtos produtoExistente = produtoEncontrado.get();
            produtoExistente.setQuantidade(produtoExistente.getQuantidade() + 1);
            produtoService.saveProduto(produtoExistente);
            throw new ResponseStatusException(HttpStatus.OK, "Quantidade do produto incrementada com sucesso!");
        } else {
            novoProduto.setQuantidade(1); // define uma quantidade padrão de 1
            produtoService.saveProduto(novoProduto);
            throw new ResponseStatusException(HttpStatus.OK, "Produto cadastrado com sucesso!");
        }
    }

    @DeleteMapping("/deletarProduto/{idProduto}")
    public String excluirProduto(@PathVariable int idProduto) throws IOException {
        Optional<Produtos> produtoEncontrado = produtoService.findByIdProduto(idProduto);

        if (produtoEncontrado.isPresent()) {
            Produtos produtoExistente = produtoEncontrado.get();

            if (produtoExistente.getQuantidade() > 1) {
                produtoExistente.setQuantidade(produtoExistente.getQuantidade() - 1);
                produtoService.saveProduto(produtoExistente);
                return "Quantidade do produto decrementada com sucesso!";
            } else {
                produtoService.deleteProduto(idProduto);
                return "Produto excluído com sucesso!";
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
    }

    @PutMapping("/incrementar/{idProduto}")
    public ResponseEntity<Produtos> incrementarQuantidade(@PathVariable int idProduto) {
        logger.info("Incrementando quantidade do produto com ID: " + idProduto);
        try {
            Produtos updatedProduto = produtoService.incrementarQuantidade(idProduto);
            return ResponseEntity.ok(updatedProduto);
        } catch (Exception e) {
            logger.severe("Erro ao incrementar quantidade do produto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
