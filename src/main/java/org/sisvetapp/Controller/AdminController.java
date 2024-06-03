package org.sisvetapp.Controller;


import org.sisvetapp.Entity.Administrador;
import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Repository.AdminRespository;
import org.sisvetapp.Service.Administrador.AdminService;
import org.sisvetapp.api.AdminAPIRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class AdminController implements AdminAPIRest {

    private AdminService adminService;

    @Autowired
    public void setAdminService(AdminService adminService) {
        this.adminService = adminService;
    }


    @GetMapping("/listarAdmins")
    public ResponseEntity<List<Administrador>> listarAdmins() throws IOException {
        List<Administrador> admins = adminService.listAllAdmin();
        return new ResponseEntity<List<Administrador>>(admins, HttpStatus.OK);
    }

    @GetMapping("/listarAdmin/{id}")
    public ResponseEntity<Administrador> listarAdmin(int id) throws IOException {
        Optional<Administrador> adminEncontrado = adminService.listByIdAdmin((int) id);

        if (adminEncontrado.isPresent())
            return new ResponseEntity<Administrador>(adminEncontrado.get(),HttpStatus.OK);
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Administrador Não Encontrado");
    }

    @PostMapping("/cadastrarAdmin")
    public String cadastrarAdmin(Administrador novoAdmin) throws IOException {
        Optional<Administrador> adminEncontrado = adminService.listByIdAdmin(novoAdmin.getId());

        if (!adminEncontrado.isPresent())
        {
            adminService.saveAdmin(novoAdmin);
            throw new ResponseStatusException(HttpStatus.OK,"Cliente Cadastrado");
        }
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Cliente Já Existente");
    }
}
