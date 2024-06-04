package org.sisvetapp.api;

import org.sisvetapp.Entity.Animal;
import org.sisvetapp.Entity.Cliente;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

public interface ClienteAPIRest {

    @GetMapping("/listarClientes")
    public ResponseEntity<List<Cliente>> listarClientes() throws IOException;

    @GetMapping("/listarCliente/{idCliente}")
    public ResponseEntity<Cliente> listarCliente(@PathVariable int idCliente) throws IOException;

    @PostMapping("/cadastrarCliente")
    public String cadastrarCliente(@RequestBody Cliente novocliente) throws IOException;

    @PutMapping("/editarServidor/{idCliente}")
    public String editarCliente(@PathVariable int idCliente, @RequestBody Cliente cliente) throws IOException;

    @DeleteMapping("/excluirCliente/{idCliente}")
    public void excluirCliente(@PathVariable int idCliente) throws IOException;
}
