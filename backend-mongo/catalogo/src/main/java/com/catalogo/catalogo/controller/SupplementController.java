package com.catalogo.catalogo.controller;

import com.catalogo.catalogo.model.Supplements;
import com.catalogo.catalogo.service.SupplementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/supplements")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SupplementController {
    @Autowired
    SupplementsService service;

    @GetMapping("/all")
    public List<Supplements> getAll() {
        return service.getAll();
    }

    @GetMapping("/productExists/{reference}")
    public boolean productExists(@PathVariable("reference") String referencia){
        return service.existenciaProducto(referencia);
    }

    @GetMapping("/{reference}")
    public Optional<Supplements> getClothe(@PathVariable("reference") String reference) {
        return service.getClothe(reference);
    }

    @GetMapping("/description/{description}")
    public List<Supplements> findByCharacterString(@PathVariable("description") String description){
        return service.findByCharacterString(description);
    }

    @GetMapping("/price/{price}")
    public List<Supplements> findByPrice(@PathVariable("price") double price){
        return service.findByPrice(price);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Supplements create(@RequestBody Supplements gadget) {
        return service.create(gadget);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Supplements update(@RequestBody Supplements gadget) {
        return service.update(gadget);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference) {
        return service.delete(reference);
    }
}
