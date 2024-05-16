package org.sisvetapp.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.LinkedHashMap;

import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Service.Cliente.ClienteService;
import org.sisvetapp.api.ClienteAPIRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
public class ClienteController implements ClienteAPIRest {

    private ClienteService clienteService;

    @Autowired
    public void setClienteService(ClienteService clienteService)
    {
        this.clienteService = clienteService;
    }

    @GetMapping("/listarClientes")
    public ResponseEntity<List<Cliente>> listarClientes() throws IOException {
        List<Cliente> clientes = clienteService.listAllCliente();
        return new ResponseEntity<List<Cliente>>(clientes, HttpStatus.OK);
    }

    @GetMapping("/listarCliente/{idCliente}")
    public ResponseEntity<Cliente> listarCliente(int idCliente) throws IOException {
        Optional<Cliente> clienteEncontrado = clienteService.listByIdCliente(idCliente);
        if (clienteEncontrado.isPresent())
            return new ResponseEntity<Cliente>(clienteEncontrado.get(), HttpStatus.OK);
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente Não Encontrado");
    }

    @DeleteMapping("/excluirCliente/{idCliente}")
    public void excluirCliente(@PathVariable int idCliente) throws IOException {
        Optional<Cliente> clienteEncontrado = clienteService.listByIdCliente(idCliente);
        if (clienteEncontrado.isPresent()) {
            clienteService.deleteCliente(idCliente);

            throw new ResponseStatusException(HttpStatus.OK, "Cliente Excluído");
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente Não Encontrado");
    }

    @PutMapping("/editarCliente/{idCliente}")
    public String editarCliente(@PathVariable int idCliente, @RequestBody Cliente clienteAlterado) throws IOException {
        Optional<Cliente> clienteEncontrado = clienteService.listByIdCliente(idCliente);
        if (clienteEncontrado.isPresent()) {
            clienteAlterado.setIdCliente(idCliente); // Defina o ID do cliente no objeto clienteAlterado
            clienteService.updateCliente(clienteAlterado);
            return "Cliente Alterado com sucesso";
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente Não Encontrado");
        }
    }


    @PostMapping("/cadastrarCliente")
    public String cadastrarCliente(@RequestBody Cliente novoCliente) throws IOException {
        Optional<Cliente> clienteEncontrado = clienteService.listByIdCliente(novoCliente.getIdCliente());
        if (!clienteEncontrado.isPresent()) {
            clienteService.saveCliente(novoCliente);
            throw new ResponseStatusException(HttpStatus.OK, "Cliente Cadastrado");
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente Já Existente");
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Object> handleNotFoundException(ResponseStatusException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", ex.getReason());
        body.put("status", ex.getStatusCode());
        return new ResponseEntity<>(body, ex.getStatusCode());
    }
}
