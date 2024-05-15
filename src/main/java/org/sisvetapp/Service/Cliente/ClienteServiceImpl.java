package org.sisvetapp.Service.Cliente;


import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public List<Cliente> listAllCliente() throws IOException {

        List<Cliente> clientes = new ArrayList<>();
        clienteRepository.findAll().forEach(clientes::add);

        return clientes;
    }

    @Override
    public Optional<Cliente> listByIdCliente(int idCliente) throws IOException {

        return clienteRepository.findById(idCliente);
    }

    @Override
    public void saveCliente(Cliente cliente) {
        clienteRepository.save(cliente);
    }

    @Override
    public void updateCliente(Cliente cliente) {
        Optional<Cliente> clienteEncontrado = clienteRepository.findById(cliente.getIdCliente());

        clienteEncontrado.ifPresent(
                p-> {
                    clienteRepository.save(cliente);
                }
        );
    }
    @Override
    public void deleteCliente(int idCliente) {
        Optional<Cliente> clienteEncontrado = clienteRepository.findById(idCliente);

        clienteEncontrado.ifPresent(
                p-> {
                    clienteRepository.delete(clienteEncontrado.get());
                }
        );
    }
}
