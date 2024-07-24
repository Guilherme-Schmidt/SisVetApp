package org.sisvetapp.Controller;

import org.sisvetapp.Entity.Compra;
import org.sisvetapp.Service.Compra.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
public class CompraController {

    private static final Logger logger = Logger.getLogger(CompraController.class.getName());

    @Autowired
    private CompraService compraService;

    @GetMapping("/listarCompras")
    public ResponseEntity<List<Compra>> listarCompras() throws IOException {
        List<Compra> compras = compraService.listAllCompras();
        return new ResponseEntity<>(compras, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compra> getCompraById(@PathVariable Long id) {
        Optional<Compra> compra = compraService.findById(id);
        return compra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/compras")
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

    @GetMapping("/listarComprasPorCliente/{idCliente}")
    public ResponseEntity<List<Compra>> listarComprasPorCliente(@PathVariable Long idCliente) {
        try {
            List<Compra> compras = compraService.findComprasByClienteId(idCliente);
            return ResponseEntity.ok(compras);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/deletarCompra/{id}")
    public ResponseEntity<Void> deleteCompra(@PathVariable Long id) {
        compraService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/proprietario/{idCliente}")
    public List<Compra> getComprasByProprietarioId(@PathVariable Long idCliente) {
        return compraService.findByProprietarioId(idCliente);
    }


}
