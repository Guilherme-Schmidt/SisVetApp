package org.sisvetapp.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity(name="compra")
@Table(name = "Compras")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompra;
    private LocalDate data;
    private Double preco;

    @Enumerated(EnumType.STRING)
    private Pagamento pagamento;

    @ManyToOne
    @JoinColumn(name = "idCliente")
    private Cliente proprietario;

    @ManyToOne
    @JoinColumn(name = "idProduto")
    private Produtos produtos;

}
