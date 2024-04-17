package org.example;

public interface APICliente {
    public void addCliente();
    public void listarClientes();
    public void listarCliente(int idCliente);
    public void alterarCliente(Cliente clienteAlterado);
    public void excluirCliente(int idCliente);
    public void addAnimalCliente(int idCliente, int idAnimal);
    public void excluirAnimalCliente(int idCliente, int idAnimal);
    public void listarAnimalCliente(int idCliente);
}
