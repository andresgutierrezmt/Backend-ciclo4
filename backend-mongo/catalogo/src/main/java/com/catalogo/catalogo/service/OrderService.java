package com.catalogo.catalogo.service;

import com.catalogo.catalogo.Repository.OrderRepository;
import com.catalogo.catalogo.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrderRepository repository;

    //Obtener todas las Ordenes
    public List<Order> getAll(){
        return repository.getAll();
    }

    //Obtener una Orden
    public Optional<Order> getOrder(int id){
        return repository.getOrder(id);
    }

    //Obtener todas las ordenes de una zona
    public List<Order> findByZone(String zone){
        return repository.findByZone(zone);
    }

    //Obtener todas las ordenes por un estatus
    public List<Order> findByStatus(String status){
        return repository.findByStatus(status);
    }

    //Create con autoincremento para mongodb -> Guardar Orden nueva
    public Order save (Order order){
        Optional<Order> OrdenMaxima = repository.lastId();
        if(order.getId() == null){
               if(OrdenMaxima.isEmpty()){
                   order.setId(1);
               }else{
                   order.setId(OrdenMaxima.get().getId() + 1);
               }
        }
        Optional<Order>verificar = repository.getOrder(order.getId());
        if(verificar.isEmpty()){
            return repository.create(order);
        }else{
            return order;
        }
    }

    //Actualizar una orden
    public Order update(Order order) {
        if (order.getId() != null) {
            Optional<Order> orderDb = repository.getOrder(order.getId());
            if (!orderDb.isEmpty()) {
                if (order.getStatus() != null) {
                    orderDb.get().setStatus(order.getStatus());
                }
                repository.update(orderDb.get());
                return orderDb.get();
            } else {
                return order;
            }
        } else {
            return order;
        }
    }

    //Eliminar una orden
    public boolean delete(int id){
        Optional<Order> ordenEliminar = repository.getOrder(id);
        if(!ordenEliminar.isEmpty()){
            repository.delete(ordenEliminar.get());
            return true;
        }
        else{
            return false;
        }
    }

    public List<Order> ordersSalesManByID(int id){
        return repository.ordersSalesManByID(id);
    }

    public List<Order> ordersSalesManByState(String state, Integer id){
        return repository.ordersSalesManByState(state, id);
    }

    public List<Order> ordersSalesManByDate(String dateStr, Integer id) {
        return repository.ordersSalesManByDate(dateStr,id);
    }

}
