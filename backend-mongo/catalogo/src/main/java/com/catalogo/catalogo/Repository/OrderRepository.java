package com.catalogo.catalogo.Repository;

import com.catalogo.catalogo.CrudRepository.OrderCrudRepository;
import com.catalogo.catalogo.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OrderRepository {
    @Autowired
    OrderCrudRepository crud ;

    public List<Order> getAll() {
        return (List<Order>) crud.findAll();
    }

    public Optional<Order> getOrder(int id){
        return crud.findById(id);
    }

    public List<Order> findByZone(String zone){
        return crud.findByZone(zone);
    }

    public  List<Order> findByStatus(String status){
        return crud.findByStatus(status);
    }

    public Order create(Order order){
        return crud.save(order);
    }

    public void update(Order order){
        crud.save(order);
    }

    public  void  delete(Order order){
        crud.delete(order);
    }

    public Optional<Order> lastId(){
        return crud.findTopByOrderByIdDesc();
    }
}