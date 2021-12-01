package com.reto1.backend.interfaz;

import com.reto1.backend.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface InterfaceUser extends CrudRepository<User,Integer>{
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
}
