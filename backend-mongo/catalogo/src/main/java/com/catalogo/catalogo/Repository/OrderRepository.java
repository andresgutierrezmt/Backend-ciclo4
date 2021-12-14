package com.catalogo.catalogo.Repository;

import com.catalogo.catalogo.CrudRepository.OrderCrudRepository;
import com.catalogo.catalogo.model.Order;
import org.springframework.beans.factory.annotation.Autowired;;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Repository
public class OrderRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

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

    public List<Order> ordersSalesManByID(Integer id) {
        Query query = new Query();
        Criteria criterio = Criteria.where("salesMan.id").is(id);
        query.addCriteria(criterio);
        List<Order> orders = mongoTemplate.find(query, Order.class);
        return orders;
    }

    public List<Order> ordersSalesManByState(String state, Integer id) {
        Query query = new Query();
        Criteria criterio = Criteria.where("salesMan.id").is(id)
                .and("status").is(state);
        query.addCriteria(criterio);
        List<Order> orders = mongoTemplate.find(query,Order.class);
        return orders;
    }

    public List<Order> ordersSalesManByDate(String dateStr, Integer id) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Query query = new Query();
        Criteria criterio = Criteria.where("registerDay")
                .gte(LocalDate.parse(dateStr, dtf).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(dateStr, dtf).plusDays(1).atStartOfDay())
                .and("salesMan.id").is(id);
        query.addCriteria(criterio);
        List<Order> orders = mongoTemplate.find(query,Order.class);
        return orders;
    }

}