package org.sisvetapp.Service.Administrador;

import org.sisvetapp.Entity.Administrador;
import org.sisvetapp.Entity.Cliente;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface AdminService {


    List<Administrador> listAllAdmin() throws IOException;

    Optional<Administrador> listByIdAdmin(int id) throws IOException;

    void saveAdmin(Administrador administrador);
}
