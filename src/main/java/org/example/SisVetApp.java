package org.example;

import javax.swing.*;
import java.util.LinkedList;
import java.util.List;

public class SisVetApp {
    List<Cliente> clientes = new LinkedList<Cliente>();
    List<Animal> animais = new LinkedList<>();

    public void addCliente(){
        int id = Integer.parseInt(JOptionPane.showInputDialog("Digite o Código do Cliente"));
        String nome = JOptionPane.showInputDialog("Digite o Nome do Cliente");
        String sexo = JOptionPane.showInputDialog("Digite o Sexo do Cliente");
        String rua = JOptionPane.showInputDialog("Digite a Rua do Cliente");
        int numero = Integer.parseInt(JOptionPane.showInputDialog("Digite o Número do Cliente"));
        String cidade = JOptionPane.showInputDialog("Digite a Cidade do Cliente");
        String email = JOptionPane.showInputDialog("Digite o E-mail do Cliente");
        String telefone = JOptionPane.showInputDialog("Digite o Telefone do Cliente");

        Cliente cliente = new Cliente(id, nome, sexo, rua, numero, cidade, email, telefone);
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
            if (cliente.getId() == codigoCliente) {
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
            if (cliente.getId() == clienteAlterado.getId()) {
                clientes.remove(cliente); // Remove o cliente antigo
                clientes.add(clienteAlterado); // Adiciona o cliente alterado
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            System.out.println("O cliente com o código " + clienteAlterado.getId() + " não está cadastrado.");
        } else {
            System.out.println("As informações do cliente com o código " + clienteAlterado.getId() + " foram atualizadas.");
        }
    }

    public void excluirCliente(int codigoCliente) {
        boolean encontrado = false;
        for (Cliente cliente : clientes) {
            if (cliente.getId() == codigoCliente) {
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


    public static void main(String[] args) {
        SisVetApp app = new SisVetApp();
        app.addCliente();
    }


}