package org.sisvetapp.api;

import org.sisvetapp.Entity.Administrador;
import org.sisvetapp.Entity.Cliente;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;

public interface AdminAPIRest {
    @GetMapping("/listarAdmins")
    public ResponseEntity<List<Administrador>> listarAdmins() throws IOException;

    @GetMapping("/listarAdmin/{id}")
    public ResponseEntity<Administrador> listarAdmin(@PathVariable int id) throws IOException;

    @PostMapping("/cadastrarAdmin")
    public String cadastrarAdmin(@RequestBody Administrador novoAdmin) throws IOException;
}
