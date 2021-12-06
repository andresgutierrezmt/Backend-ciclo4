package com.catalogo.catalogo.CrudRepository;

import com.catalogo.catalogo.model.Supplements;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupplementCrudRepository extends MongoRepository<Supplements,String> {

}
