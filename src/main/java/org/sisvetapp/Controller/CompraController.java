package org.sisvetapp.Controller;

import org.sisvetapp.Entity.Compra;
import org.sisvetapp.Service.Compra.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/compras")
public class CompraController {

    private static final Logger logger = Logger.getLogger(CompraController.class.getName());

    @Autowired
    private CompraService compraService;

    @GetMapping
    public List<Compra> getAllCompras() {
        return compraService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compra> getCompraById(@PathVariable Long id) {
        Optional<Compra> compra = compraService.findById(id);
        return compra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Compra> createCompra(@RequestBody Compra compra) {
        logger.info("Received compra: " + compra);
        try {
            Compra savedCompra = compraService.save(compra);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCompra);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompra(@PathVariable Long id) {
        compraService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/proprietario/{idCliente}")
    public List<Compra> getComprasByProprietarioId(@PathVariable Long idCliente) {
        return compraService.findByProprietarioId(idCliente);
    }
}
