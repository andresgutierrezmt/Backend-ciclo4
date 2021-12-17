package com.catalogo.catalogo.CrudRepository;

import com.catalogo.catalogo.model.Supplements;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SupplementCrudRepository extends MongoRepository<Supplements,String> {
    @Query("{'description': { '$regex':?0, $options: 'i' }}")
    List<Supplements> findByCharacterString(String description);

    @Query("{'price': { $lte:?0}}")
    List<Supplements> findByPrice(double price);
}
