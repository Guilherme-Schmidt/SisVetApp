package org.sisvetapp.Service.Cliente;

import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Repository.AnimalRepository;
import org.sisvetapp.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    private final AnimalRepository animalRepository;

    public ClienteServiceImpl(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @Override
    public List<Cliente> listAllCliente() {

        List<Cliente> clientes = new ArrayList<>();
        clienteRepository.findAll().forEach(clientes::add);

        return clientes;
    }

    @Override
    public Optional<Cliente> listByIdCliente(int idCliente) {

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
        Optional<Cliente> clienteOptional = clienteRepository.findById(idCliente);
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            // Exclua os animais associados a este cliente
            animalRepository.deleteByProprietario(cliente);
            // Exclua o cliente
            clienteRepository.deleteById(idCliente);
        } else {
            throw new RuntimeException("Cliente não encontrado para o ID fornecido: " + idCliente);
        }
    }

    @Override
    public void deleteClienteAndAnimais(int idCliente) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(idCliente);
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            // Exclua os animais associados a este cliente
            animalRepository.deleteByProprietario(cliente);
            // Exclua o cliente
            clienteRepository.deleteById(idCliente);
        } else {
            throw new RuntimeException("Cliente não encontrado para o ID fornecido: " + idCliente);
        }
    }

}
