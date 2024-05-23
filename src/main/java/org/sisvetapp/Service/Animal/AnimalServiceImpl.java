package org.sisvetapp.Service.Animal;



import org.sisvetapp.Entity.Animal;
import org.sisvetapp.Entity.Cliente;
import org.sisvetapp.Repository.AnimalRepository;
import org.sisvetapp.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

    @Service
    public class AnimalServiceImpl implements AnimalService {

        @Autowired
        private AnimalRepository animalRepository;

        @Autowired
        private ClienteRepository clienteRepository;

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
            Optional<Cliente> clienteOptional = clienteRepository.findById(idCliente);
            if (clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                animal.setProprietario(cliente);
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


