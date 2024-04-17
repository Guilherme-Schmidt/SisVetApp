package org.example;

public interface APIAnimal {
    public void addAnimal();
    public void listarAnimal(int idAnimal);
    public void listarAnimais();
    public void alterarAnimal(Animal animalAlterado);
    public void excluirAnimal(int idAnimal);
    public void addClienteAnimal( int idAnimal,int idCliente);
    public void excluirClienteAnimal(int idAnimal,int idCliente);
    public void listarClienteAnimal(int idAnimal);
}
