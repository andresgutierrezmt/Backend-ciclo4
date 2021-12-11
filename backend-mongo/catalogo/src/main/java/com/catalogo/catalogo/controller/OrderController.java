package com.catalogo.catalogo.controller;

import com.catalogo.catalogo.model.Order;
import com.catalogo.catalogo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/order") //Mapeado general para Order
public class OrderController {
    @Autowired
    private OrderService Service;

    @GetMapping("/all") //Mapeado para obtener todas las Ordernes
    public List<Order> getAll() {
        return Service.getAll();
    }

    @GetMapping("/{id}") //Mapeado para obtener una Ordern
    public Optional<Order> getOrder(@PathVariable("id") int id) {
        return Service.getOrder(id);
    }

    @GetMapping("/zona/{zona}") //Mapeado para obtener todas las Ordernes de una zona
    public List<Order> findByZone(@PathVariable("zona") String zone){
        return Service.findByZone(zone);
    }

    @GetMapping("/status/{status}") //Mapeado para obtener todas las Ordernes por estado "Aprobado" "Eliminado" ..etc
    public  List<Order> findByStatus(@PathVariable("status") String status){
        return Service.findByStatus(status);
    }

    @PostMapping("/new") //Mapeado para crear una Orden
    @ResponseStatus(HttpStatus.CREATED)
    public Order create(@RequestBody Order gadget) {
        return Service.save(gadget);
    }

    @PutMapping("/update") //Mapeado para actualizar una Orden
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order gadget) {
        return Service.update(gadget);
    }

    @DeleteMapping("/{id}") //Mapeado para eliminar una Orden
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return Service.delete(id);
    }
}
