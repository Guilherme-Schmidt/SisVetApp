package org.sisvetapp.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="admin")
@Getter
@Setter

public class Administrador {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;
    private String nome;
    private String email;
    private String senha;
}
