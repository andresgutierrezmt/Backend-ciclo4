package com.reto1.backend.repository;

import com.reto1.backend.interfaz.InterfaceUser;
import com.reto1.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    @Autowired
    InterfaceUser crud;

    public List<User> getAll(){
        return (List<User>) crud.findAll();
    }

    public Optional<User> findUser(int id){
        return crud.findById(id);
    }

    public Optional<User> findEmail(String email){
        return crud.findByEmail(email);
    }

    public Optional<User> AuntenticarUsuario(String email, String password){
        return crud.findByEmailAndPassword(email, password);
    }

    public User save(User user){
        return crud.save(user);
    }

    public boolean existenciaEmail(String email){
        Optional<User> usuario = crud.findByEmail(email);
        if(usuario.isEmpty()){
            return false;
        }else{
            return true;
        }
    }
}
