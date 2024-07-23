package org.sisvetapp.api;

import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Entity.Produtos;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

public interface ProdutoAPIRest {

    @GetMapping("/listarProdutos")
    public ResponseEntity<List<Produtos>> listarProdutos() throws IOException;

    @GetMapping("/listarProduto/{idProduto}")
    public ResponseEntity<Produtos> listarProduto(@PathVariable int idProduto) throws IOException;

    @PostMapping("/cadastrarProdutos")
    public String cadastrarProdutos(@RequestBody Produtos novoProdutos) throws IOException;

    @PutMapping("/editarProduto/{idProduto}")
    public String editarProduto(@PathVariable int idProduto, @RequestBody Cliente cliente) throws IOException;

}
