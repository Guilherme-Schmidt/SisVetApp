package org.sisvetapp.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Animal {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAnimal;
    private String nome;
    private int idade;
    private String sexo;
    private double peso;
    private String raca;
    private String alergia;
    private String cor;
    private String especie;

    @ManyToOne
    @JoinColumn(name = "idCliente")
    private Cliente proprietario;

}
