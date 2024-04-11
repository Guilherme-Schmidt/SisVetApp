package org.example;

public class Animal {

    private String nome;
    private int idade;
    private String sexo;
    private double peso;
    private String raca;
    private String alergia;
    private String cor;
    private String especie;

    public Animal(String nome, int idade, String sexo, double peso, String raca, String alergia, String cor, String especie) {
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
        this.peso = peso;
        this.raca = raca;
        this.alergia = alergia;
        this.cor = cor;
        this.especie = especie;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public double getPeso() {
        return peso;
    }

    public void setPeso(double peso) {
        this.peso = peso;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public String getAlergia() {
        return alergia;
    }

    public void setAlergia(String alergia) {
        this.alergia = alergia;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    @Override
    public String toString() {
        return "Animal{" +
                "nome='" + nome + '\'' +
                ", idade=" + idade +
                ", sexo='" + sexo + '\'' +
                ", peso=" + peso +
                ", raca='" + raca + '\'' +
                ", alergia='" + alergia + '\'' +
                ", cor='" + cor + '\'' +
                ", especie='" + especie + '\'' +
                '}';
    }
}
