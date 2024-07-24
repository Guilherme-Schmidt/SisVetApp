package org.sisvetapp.Service.Cliente;

import org.sisvetapp.Entity.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteService {

    List<Cliente> listAllCliente();

    Optional<Cliente> listByIdCliente(int idCliente);

    void saveCliente(Cliente cliente);

    void updateCliente(Cliente cliente);

    void deleteCliente(int idCliente);

    void deleteClienteAndAnimais(int idCliente);
}