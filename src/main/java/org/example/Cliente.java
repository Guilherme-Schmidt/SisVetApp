package org.example;

import java.util.LinkedList;
import java.util.List;

public class Cliente {
    private int idCliente;
    private String nome;
    private String sexo;
    private String rua;
    private int numero;
    private String cidade;
    private String email;
    private String telefone;

    private List<Animal> animais = new LinkedList<Animal>();

    public Cliente(int idCliente,String nome, String sexo, String rua, int numero, String cidade, String email, String telefone) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.sexo = sexo;
        this.rua = rua;
        this.numero = numero;
        this.cidade = cidade;
        this.email = email;
        this.telefone = telefone;
    }

    public int getidCliente() {
        return idCliente;
    }

    public void setId(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public void getAnimais() {
        System.out.println(animais);
    }

    public void setAnimais(Animal animal) {
        animais.add(animal);
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "nome='" + nome + '\'' +
                ", sexo='" + sexo + '\'' +
                ", rua='" + rua + '\'' +
                ", numero=" + numero +
                ", cidade='" + cidade + '\'' +
                ", email='" + email + '\'' +
                ", telefone='" + telefone + '\'' +
                '}';
    }
}
