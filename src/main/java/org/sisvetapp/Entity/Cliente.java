package org.sisvetapp.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

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
