package org.sisvetapp.Entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Cliente")
public class Cliente {

    @Id
    private int idCliente;
    private String nome;
    private String sexo;
    private String rua;
    private int numero;
    private String cidade;
    private String email;
    private String telefone;


}
