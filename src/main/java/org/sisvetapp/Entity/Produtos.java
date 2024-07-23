package org.sisvetapp.Entity;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name="produtos")
@Table(name = "Produtos")
public class Produtos {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProduto;

    private String nome;
    private String descricao;
    private double preco;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    @Column(nullable = false, columnDefinition = "int default 0")
    private int quantidade = 0;

}
