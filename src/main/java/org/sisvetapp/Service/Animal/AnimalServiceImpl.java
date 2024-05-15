package org.sisvetapp.Service.Animal;

import org.sisvetapp.Entity.Animal;
import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Repository.AnimalRepository;
import org.sisvetapp.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnimalServiceImpl implements AnimalService {

        private final AnimalRepository animalRepository;
        private final ClienteRepository clienteRepository;

        @Autowired
        public AnimalServiceImpl(AnimalRepository animalRepository, ClienteRepository clienteRepository) {
            this.animalRepository = animalRepository;
            this.clienteRepository = clienteRepository;
        }

        @Override
        public List<Animal> listAllAnimal() {
            return (List<Animal>) animalRepository.findAll();
        }

        @Override
        public Optional<Animal> listByIdAnimal(int idAnimal) {
            return animalRepository.findById(idAnimal);
        }

        @Override
        public void saveAnimal(Animal animal, int idCliente) {
            // Obtenha o cliente associado ao ID
            Optional<Cliente> clienteOptional = clienteRepository.findById(idCliente);

            // Verifique se o cliente existe
            if (clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                // Associe o cliente ao animal
                animal.setProprietario(cliente);
                // Salve o animal no banco de dados
                animalRepository.save(animal);
            } else {
                throw new RuntimeException("Cliente não encontrado para o ID fornecido: " + idCliente);
            }
        }

        @Override
        public void updateAnimal(Animal animal) {
            animalRepository.save(animal);
        }

        @Override
        public void deleteAnimal(int idAnimal) {
            animalRepository.deleteById(idAnimal);
        }
    }

