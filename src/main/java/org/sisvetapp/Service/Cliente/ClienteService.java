package org.sisvetapp.Service.Cliente;

import org.sisvetapp.Entity.Cliente;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface ClienteService {

    List<Cliente> listAllCliente() throws IOException;

    Optional<Cliente> listByIdCliente(int idCliente) throws IOException;

    void saveCliente(Cliente cliente);
    void updateCliente(Cliente cliente);
    void deleteCliente(int idCliente);

}
