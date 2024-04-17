package org.example;

import javax.swing.*;
import java.awt.event.ActionListener;
import java.lang.ref.Cleaner;
import java.util.LinkedList;
import java.util.List;

public class SisVetApp implements APICliente, APIAnimal{
    List<Cliente> clientes = new LinkedList<Cliente>();
    List<Animal> animais = new LinkedList<>();

    public void addCliente(){
        int idCliente = Integer.parseInt(JOptionPane.showInputDialog("Digite o Código do Cliente"));
        String nome = JOptionPane.showInputDialog("Digite o Nome do Cliente");
        String sexo = JOptionPane.showInputDialog("Digite o Sexo do Cliente");
        String rua = JOptionPane.showInputDialog("Digite a Rua do Cliente");
        int numero = Integer.parseInt(JOptionPane.showInputDialog("Digite o Número do Cliente"));
        String cidade = JOptionPane.showInputDialog("Digite a Cidade do Cliente");
        String email = JOptionPane.showInputDialog("Digite o E-mail do Cliente");
        String telefone = JOptionPane.showInputDialog("Digite o Telefone do Cliente");

        Cliente cliente = new Cliente(idCliente, nome, sexo, rua, numero, cidade, email, telefone);
        // Supondo que "servidores" seja uma lista de clientes (List<Cliente>)
        clientes.add(cliente);

        // Exibindo os dados do cliente criado
        JOptionPane.showMessageDialog(null, "Cliente criado:\n" + cliente.toString());
    }

    public void listarClientes() {
        for (Cliente cliente : clientes) {
            System.out.println(cliente);
        }
    }

    public void listarCliente(int codigoCliente) {
        boolean encontrado = false;
        for (Cliente cliente : clientes) {
            if (cliente.getidCliente() == codigoCliente) {
                System.out.println(cliente);
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            System.out.println("O cliente com o código " + codigoCliente + " não está cadastrado.");
        }
    }

    public void alterarCliente(Cliente clienteAlterado) {
        boolean encontrado = false;
        for (Cliente cliente : clientes) {
            if (cliente.getidCliente() == clienteAlterado.getidCliente()) {
                clientes.remove(cliente); // Remove o cliente antigo
                clientes.add(clienteAlterado); // Adiciona o cliente alterado
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            System.out.println("O cliente com o código " + clienteAlterado.getidCliente() + " não está cadastrado.");
        } else {
            System.out.println("As informações do cliente com o código " + clienteAlterado.getidCliente() + " foram atualizadas.");
        }
    }

    public void excluirCliente(int codigoCliente) {
        boolean encontrado = false;
        for (Cliente cliente : clientes) {
            if (cliente.getidCliente() == codigoCliente) {
                clientes.remove(cliente);
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            System.out.println("O cliente com o código " + codigoCliente + " não está cadastrado.");
        } else {
            System.out.println("O cliente com o código " + codigoCliente + " foi excluído com sucesso.");
        }
    }

    @Override
    public void addAnimalCliente(int idCliente, int idAnimal) {
        boolean encontrado = false;

        for(Cliente cliente : clientes) {
            if (cliente.getIdCliente() == idCliente) {
                for (Animal animal : animais) {
                    if (animal.getIdAnimal() == idAnimal) {
                        cliente.setAnimais(animal);
                        encontrado = true;
                        break;
                    }
                }
            }
        }
        if (!encontrado) {
            System.out.println("O cliente informado não existe");
        }
        else{
            System.out.println("O curso "+idAnimal+" foi adicionado com sucesso no cliente "+idCliente);
        }
    }

    @Override
    public void excluirAnimalCliente(int idCliente, int idAnimal) {

    }

    @Override
    public void listarAnimalCliente(int idCliente) {

    }

    @Override

    public void addAnimal() {
        String nome = JOptionPane.showInputDialog("Digite o Nome do Animal");
        int idAnimal = Integer.parseInt(JOptionPane.showInputDialog("Digite o Código do Animal"));
        int idade = Integer.parseInt(JOptionPane.showInputDialog("Digite a Idade do Animal"));
        String sexo = JOptionPane.showInputDialog("Digite o Sexo do Animal");
        double peso = Double.parseDouble(JOptionPane.showInputDialog("Digite o Peso do Animal"));
        String raca = JOptionPane.showInputDialog("Digite a Raça do Animal");
        String alergia = JOptionPane.showInputDialog("Digite as Alergias do Animal");
        String cor = JOptionPane.showInputDialog("Digite a Cor do Animal");
        String especie = JOptionPane.showInputDialog("Digite a Espécie do Animal");

        Animal animal = new Animal(nome, idAnimal, idade, sexo, peso, raca, alergia, cor, especie);
        animais.add(animal);

        JOptionPane.showMessageDialog(null, "Animal criado:\n" + animal.toString());
    }

    public void listarAnimais() {
        for (Animal animal : animais) {
            System.out.println(animal);
        }
    }

    public void listarAnimal(int idAnimal) {
        boolean encontrado = false;
        for (Animal animal : animais) {
            if (animal.getIdAnimal()== idAnimal) {
                System.out.println(animal);
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            System.out.println("O animal com o código " + idAnimal + " não está cadastrado.");
        }
    }

    public void alterarAnimal(Animal animalAlterado) {
        boolean encontrado = false;
        for (Animal animal : animais) {
            if (animal.getIdAnimal() == animalAlterado.getIdAnimal()) {
                animais.remove(animal); // Remove o animal antigo
                animais.add(animalAlterado); // Adiciona o animal alterado
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            System.out.println("O animal com o código " + animalAlterado.getIdAnimal() + " não está cadastrado.");
        } else {
            System.out.println("As informações do animal com o código " + animalAlterado.getIdAnimal() + " foram atualizadas.");
        }
    }

    public void excluirAnimal(int idAnimal) {
        boolean encontrado = false;
        for (Animal animal : animais) {
            if (animal.getIdAnimal() == idAnimal) {
                animais.remove(animal);
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            System.out.println("O animal com o código " + idAnimal + " não está cadastrado.");
        } else {
            System.out.println("O animal com o código " + idAnimal + " foi excluído com sucesso.");
        }
    }

    @Override
    public void addClienteAnimal(int idAnimal, int idCliente) {
        boolean encontrado = false;
        for(Cliente cliente: clientes){
            if(cliente.getidCliente() == idCliente){

                cliente.setAnimais(null);
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            System.out.println("O cliente informado não existe");
        }
        else{
            System.out.println("O curso "+idAnimal+" foi adicionado com sucesso no cliente "+idCliente);
        }
    }

    @Override
    public void excluirClienteAnimal(int idAnimal, int idCliente) {

    }

    @Override
    public void listarClienteAnimal(int idAnimal) {

    }


    public static void main(String[] args) {
        SisVetApp app = new SisVetApp();
        app.addCliente();

        app.listarClientes();

        app.addAnimal();

        app.listarAnimais();

        app.addAnimalCliente(1,10);
        app.addAnimalCliente(1,20);
        app.addAnimalCliente(2,10);
        app.addAnimalCliente(2,20);
    }


}