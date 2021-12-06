package com.catalogo.catalogo.CrudRepository;

import com.catalogo.catalogo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserCrudRepository extends MongoRepository<User,Integer>{
    //consultas en mongodb @Query
    @Query("{email:?0}")
    Optional<User> findByEmail(String email);
    @Query("{email:?0, password:?1}") //Consulta mongodb = {primera_variable:?posicion_0_en_funcion, segunda_variable:?posicion_1_en_funcion}
    Optional<User> findByEmailAndPassword(String email, String password);
}
