    package org.sisvetapp;

    import org.sisvetapp.Entity.Animal;
    import org.sisvetapp.Entity.Cliente;
    import org.sisvetapp.Service.Animal.AnimalService;
    import org.sisvetapp.Service.Cliente.ClienteService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.boot.CommandLineRunner;

    import javax.swing.*;
    import java.io.IOException;
    import java.util.List;
    import java.util.Optional;

    @Configuration
    public class SisVetApplicationRunner implements CommandLineRunner {

        private final ClienteService clienteService;
        private final AnimalService animalService;

        @Autowired
        public SisVetApplicationRunner(ClienteService clienteService, AnimalService animalService) {
            this.clienteService = clienteService;
            this.animalService = animalService;
        }

        @Override
        public void run(String... args) throws Exception {
            exibirMenu();
        }

        private void exibirMenu() throws IOException {
            boolean sair = false;
            do {
                String opcaoMenuPrincipal = JOptionPane.showInputDialog(
                        "Escolha uma opção:\n" +
                                "1. Cliente\n" +
                                "2. Animal\n" +
                                "3. Sair"
                );
                switch (opcaoMenuPrincipal) {
                    case "1":
                        exibirMenuCliente();
                        break;
                    case "2":
                        exibirMenuAnimal();
                        break;
                    case "3":
                        sair = true;
                        break;
                    default:
                        JOptionPane.showMessageDialog(null, "Opção inválida.");
                        break;
                }
            } while (!sair);
        }

        private void exibirMenuCliente() throws IOException {
            boolean sairCliente = false;
            do {
                String opcao = JOptionPane.showInputDialog(
                        "Menu Cliente:\n" +
                                "1. Listar todos os clientes\n" +
                                "2. Listar cliente por ID\n" +
                                "3. Adicionar novo cliente\n" +
                                "4. Atualizar cliente\n" +
                                "5. Excluir cliente\n" +
                                "6. Voltar ao menu principal"
                );
                switch (opcao) {
                    case "1":
                        listAllClientes();
                        break;
                    case "2":
                        listByIdCliente();
                        break;
                    case "3":
                        saveCliente();
                        break;
                    case "4":
                        updateCliente();
                        break;
                    case "5":
                        deleteCliente();
                        break;
                    case "6":
                        sairCliente = true;
                        break;
                    default:
                        JOptionPane.showMessageDialog(null, "Opção inválida.");
                        break;
                }
            } while (!sairCliente);
        }

        private void exibirMenuAnimal() throws IOException {
            boolean sairAnimal = false;
            do {
                String opcao = JOptionPane.showInputDialog(
                        "Menu Animal:\n" +
                                "1. Listar todos os animais\n" +
                                "2. Listar animal por ID\n" +
                                "3. Adicionar novo animal\n" +
                                "4. Atualizar animal\n" +
                                "5. Excluir animal\n" +
                                "6. Voltar ao menu principal"
                );
                switch (opcao) {
                    case "1":
                        listAllAnimal();
                        break;
                    case "2":
                        listByIdAnimal();
                        break;
                    case "3":
                        saveAnimal();
                        break;
                    case "4":
                        updateAnimal();
                        break;
                    case "5":
                        deleteAnimal();
                        break;
                    case "6":
                        sairAnimal = true;
                        break;
                    default:
                        JOptionPane.showMessageDialog(null, "Opção inválida.");
                        break;
                }
            } while (!sairAnimal);
        }


        // Métodos CRUD para Cliente (sem alterações)
        private void listAllClientes() throws IOException {
            List<Cliente> clientes = clienteService.listAllCliente();

            if (!clientes.isEmpty()) {
                clientes.forEach(cliente -> {
                    System.out.println(cliente.getIdCliente());
                    System.out.println(cliente.getNome());
                    System.out.println(cliente.getEmail());
                    System.out.println(cliente.getSexo());
                    System.out.println(cliente.getCidade());
                    System.out.println(cliente.getRua());
                    System.out.println(cliente.getNumero());
                    System.out.println("##########");
                });
            } else {
                System.out.println("Tabela sem registros");
            }
        }

        private void listByIdCliente() throws IOException {
            int idCliente = Integer.parseInt(JOptionPane.showInputDialog("Digite o id do cliente: "));
            Optional<Cliente> cliente = clienteService.listByIdCliente(idCliente);

            if (cliente.isPresent()) {
                System.out.println("################");
                System.out.println(cliente.get().getIdCliente());
                System.out.println(cliente.get().getNome());
                System.out.println(cliente.get().getEmail());
                System.out.println(cliente.get().getSexo());
                System.out.println(cliente.get().getCidade());
                System.out.println(cliente.get().getRua());
                System.out.println(cliente.get().getNumero());
                System.out.println(cliente.get().getTelefone());
            } else {
                System.out.println("ID Não existe");
            }
        }

        private void saveCliente() throws IOException {
            int idCliente = Integer.parseInt(JOptionPane.showInputDialog("Digite o id do cliente: "));
            Optional<Cliente> cliente = clienteService.listByIdCliente(idCliente);

            if (!cliente.isPresent()) {
                Cliente novoCliente = new Cliente();
                novoCliente.setIdCliente(idCliente);

                String nome = (JOptionPane.showInputDialog("Digite o nome: "));
                novoCliente.setNome(nome);
                String email = (JOptionPane.showInputDialog("Digite o email: "));
                novoCliente.setEmail(email);
                String sexo = (JOptionPane.showInputDialog("Digite o sexo: "));
                novoCliente.setSexo(sexo);
                String cidade = (JOptionPane.showInputDialog("Digite o cidade: "));
                novoCliente.setCidade(cidade);
                String rua = (JOptionPane.showInputDialog("Digite o rua: "));
                novoCliente.setRua(rua);
                int numero = (Integer.parseInt(JOptionPane.showInputDialog("Digite o numero: ")));
                novoCliente.setNumero(numero);
                String telefone = (JOptionPane.showInputDialog("Digite o telefone: "));
                novoCliente.setTelefone(telefone);

                clienteService.saveCliente(novoCliente);
            } else {
                System.out.println("Cliente já existe!");
            }
        }

        private void updateCliente() throws IOException {
            boolean continuar = true;

            do {
                int idCliente = Integer.parseInt(JOptionPane.showInputDialog("Digite o id do cliente: "));
                Optional<Cliente> cliente = clienteService.listByIdCliente(idCliente);

                if (cliente.isPresent()) {
                    String opcao = JOptionPane.showInputDialog("Escolha o que deseja alterar:\n" +
                            "1. Nome\n" +
                            "2. Email\n" +
                            "3. Sexo\n" +
                            "4. Cidade\n" +
                            "5. Rua\n" +
                            "6. Número\n" +
                            "7. Telefone\n" +
                            "8. Sair");

                    int escolha = Integer.parseInt(opcao);

                    switch (escolha) {
                        case 1:
                            String nome = JOptionPane.showInputDialog("Digite o novo nome: ");
                            cliente.get().setNome(nome);
                            break;
                        case 2:
                            String email = JOptionPane.showInputDialog("Digite o novo email: ");
                            cliente.get().setEmail(email);
                            break;
                        case 3:
                            String sexo = JOptionPane.showInputDialog("Digite o novo sexo: ");
                            cliente.get().setSexo(sexo);
                            break;
                        case 4:
                            String cidade = JOptionPane.showInputDialog("Digite a nova cidade: ");
                            cliente.get().setCidade(cidade);
                            break;
                        case 5:
                            String rua = JOptionPane.showInputDialog("Digite a nova rua: ");
                            cliente.get().setRua(rua);
                            break;
                        case 6:
                            int numero = Integer.parseInt(JOptionPane.showInputDialog("Digite o novo número: "));
                            cliente.get().setNumero(numero);
                            break;
                        case 7:
                            String telefone = JOptionPane.showInputDialog("Digite o novo telefone: ");
                            cliente.get().setTelefone(telefone);
                            break;
                        case 8:
                            continuar = false; // Sai do loop e do método
                            break;
                        default:
                            JOptionPane.showMessageDialog(null, "Opção inválida.");
                            break;
                    }

                    // Se continuar for verdadeiro (ou seja, se não escolheu sair), atualiza os dados do cliente
                    if (continuar) {
                        clienteService.updateCliente(cliente.get());
                        JOptionPane.showMessageDialog(null, "Dados alterados:\n" + cliente);
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "Cliente não encontrado.");
                }
            } while (continuar);
        }

        private void deleteCliente() throws IOException {
            int idCliente = Integer.parseInt(JOptionPane.showInputDialog("Digite o id do cliente: "));
            Optional<Cliente> cliente = clienteService.listByIdCliente(idCliente);

            if (cliente.isPresent()) {
                clienteService.deleteCliente(idCliente);
            } else {
                System.out.println("Cliente não encontrado");
            }
        }

        // Métodos CRUD para Animal
        private void listAllAnimal() throws IOException {
            List<Animal> animais = animalService.listAllAnimal();

            if (!animais.isEmpty()) {
                animais.forEach(animal -> {
                    System.out.println("ID Animal: " + animal.getIdAnimal());
                    System.out.println("Nome: " + animal.getNome());
                    System.out.println("Idade: " + animal.getIdade());
                    System.out.println("Sexo: " + animal.getSexo());
                    System.out.println("Peso: " + animal.getPeso());
                    System.out.println("Raça: " + animal.getRaca());
                    System.out.println("Alergia: " + animal.getAlergia());
                    System.out.println("Cor: " + animal.getCor());
                    System.out.println("Espécie: " + animal.getEspecie());
                    System.out.println("##########");
                });
            } else {
                System.out.println("Tabela de animais sem registros");
            }
        }

        private void listByIdAnimal() throws IOException {
            int idAnimal = Integer.parseInt(JOptionPane.showInputDialog("Digite o id do animal: "));
            Optional<Animal> animal = animalService.listByIdAnimal(idAnimal);

            if (animal.isPresent()) {
                System.out.println("################");
                System.out.println("ID Animal: " + animal.get().getIdAnimal());
                System.out.println("Nome: " + animal.get().getNome());
                System.out.println("Idade: " + animal.get().getIdade());
                System.out.println("Sexo: " + animal.get().getSexo());
                System.out.println("Peso: " + animal.get().getPeso());
                System.out.println("Raça: " + animal.get().getRaca());
                System.out.println("Alergia: " + animal.get().getAlergia());
                System.out.println("Cor: " + animal.get().getCor());
                System.out.println("Espécie: " + animal.get().getEspecie());
            } else {
                System.out.println("ID Não existe");
            }
        }

        private void saveAnimal() throws IOException {
            int idAnimal = Integer.parseInt(JOptionPane.showInputDialog("Digite o id do animal: "));
            Optional<Animal> animal = animalService.listByIdAnimal(idAnimal);

            if (!animal.isPresent()) {
                Animal novoAnimal = new Animal();
                novoAnimal.setIdAnimal(idAnimal);

                String nome = JOptionPane.showInputDialog("Digite o nome: ");
                novoAnimal.setNome(nome);
                int idade = Integer.parseInt(JOptionPane.showInputDialog("Digite a idade: "));
                novoAnimal.setIdade(idade);
                String sexo = JOptionPane.showInputDialog("Digite o sexo: ");
                novoAnimal.setSexo(sexo);
                double peso = Double.parseDouble(JOptionPane.showInputDialog("Digite o peso: "));
                novoAnimal.setPeso(peso);
                String raca = JOptionPane.showInputDialog("Digite a raça: ");
                novoAnimal.setRaca(raca);
                String alergia = JOptionPane.showInputDialog("Digite a alergia: ");
                novoAnimal.setAlergia(alergia);
                String cor = JOptionPane.showInputDialog("Digite a cor: ");
                novoAnimal.setCor(cor);
                String especie = JOptionPane.showInputDialog("Digite a espécie: ");
                novoAnimal.setEspecie(especie);

                // Solicita o ID do cliente para associar ao animal
                int idCliente = Integer.parseInt(JOptionPane.showInputDialog("Digite o ID do cliente do animal: "));

                // Salva o animal
                animalService.saveAnimal(novoAnimal, idCliente);
            } else {
                System.out.println("Animal já existe!");
            }
        }

        private void updateAnimal() throws IOException {
            boolean continuar = true;

            do {
                int idAnimal = Integer.parseInt(JOptionPane.showInputDialog("Digite o id do animal: "));
                Optional<Animal> animal = animalService.listByIdAnimal(idAnimal);

                if (animal.isPresent()) {
                    String opcao = JOptionPane.showInputDialog("Escolha o que deseja alterar:\n" +
                            "1. Nome\n" +
                            "2. Idade\n" +
                            "3. Sexo\n" +
                            "4. Peso\n" +
                            "5. Raça\n" +
                            "6. Alergia\n" +
                            "7. Cor\n" +
                            "8. Espécie\n" +
                            "9. Sair");

                    int escolha = Integer.parseInt(opcao);

                    switch (escolha) {
                        case 1:
                            String nome = JOptionPane.showInputDialog("Digite o novo nome: ");
                            animal.get().setNome(nome);
                            break;
                        case 2:
                            int idade = Integer.parseInt(JOptionPane.showInputDialog("Digite a nova idade: "));
                            animal.get().setIdade(idade);
                            break;
                        case 3:
                            String sexo = JOptionPane.showInputDialog("Digite o novo sexo: ");
                            animal.get().setSexo(sexo);
                            break;
                        case 4:
                            double peso = Double.parseDouble(JOptionPane.showInputDialog("Digite o novo peso: "));
                            animal.get().setPeso(peso);
                            break;
                        case 5:
                            String raca = JOptionPane.showInputDialog("Digite a nova raça: ");
                            animal.get().setRaca(raca);
                            break;
                        case 6:
                            String alergia = JOptionPane.showInputDialog("Digite a nova alergia: ");
                            animal.get().setAlergia(alergia);
                            break;
                        case 7:
                            String cor = JOptionPane.showInputDialog("Digite a nova cor: ");
                            animal.get().setCor(cor);
                            break;
                        case 8:
                            String especie = JOptionPane.showInputDialog("Digite a nova espécie: ");
                            animal.get().setEspecie(especie);
                            break;
                        case 9:
                            continuar = false; // Sai do loop e do método
                            break;
                        default:
                            JOptionPane.showMessageDialog(null, "Opção inválida.");
                            break;
                    }

                    // Se continuar for verdadeiro (ou seja, se não escolheu sair), atualiza os dados do animal
                    if (continuar) {
                        animalService.updateAnimal(animal.get());
                        JOptionPane.showMessageDialog(null, "Dados alterados:\n" + animal);
                    }
                } else {
                    JOptionPane.showMessageDialog(null, "Animal não encontrado.");
                }
            } while (continuar);
        }

        private void deleteAnimal() throws IOException {
            int idAnimal = Integer.parseInt(JOptionPane.showInputDialog("Digite o id do animal: "));
            Optional<Animal> animal = animalService.listByIdAnimal(idAnimal);

            if (animal.isPresent()) {
                animalService.deleteAnimal(idAnimal);
            } else {
                System.out.println("Animal não encontrado");
            }
        }
    }
