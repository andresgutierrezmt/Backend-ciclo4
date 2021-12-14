package com.catalogo.catalogo.CrudRepository;

import com.catalogo.catalogo.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderCrudRepository extends MongoRepository<Order,Integer> {
    @Query("{'salesMan.zone': ?0}")
    List<Order> findByZone(String zone);

    @Query("{status: ?0}")
    List<Order> findByStatus(String status);

    Optional<Order> findTopByOrderByIdDesc();

    @Query("{registerDay: ?0, salesMan.id: ?1}")
    List<Order> findByRegisterDayAndSalesManId(Date registerDay, int salesManId);
}
