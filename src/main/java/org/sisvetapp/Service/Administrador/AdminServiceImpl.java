package org.sisvetapp.Service.Administrador;

import org.sisvetapp.Entity.Administrador;
import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Repository.AdminRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminRespository adminRespository;

    @Override
    public List<Administrador> listAllAdmin() throws IOException {
        List<Administrador> administradores = new ArrayList<>();
        adminRespository.findAll().forEach(administradores::add);
        return administradores;
    }

    @Override
    public Optional<Administrador> listByIdAdmin(int id) throws IOException {
        return Optional.empty();
    }

    @Override
    public void saveAdmin(Administrador administrador) {
        adminRespository.save(administrador);
    }
}
