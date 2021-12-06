package com.catalogo.catalogo.Repository;

import com.catalogo.catalogo.CrudRepository.UserCrudRepository;
import com.catalogo.catalogo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    @Autowired
    UserCrudRepository crud;

    public List<User> findAll(){
        return (List<User>) crud.findAll();
    }

    public Optional<User> getUser(int id) {
        return crud.findById(id);
    }

    public Optional<User> getEmail(String email){
        return crud.findByEmail(email);
    }

    public Optional<User> AutenticarUsuario(String email, String password){
        return crud.findByEmailAndPassword(email,password);
    }

    public boolean ExistenciaEmail(String email){
        Optional<User> user = crud.findByEmail(email);
        if(user.isEmpty()){
            return false;
        }
        else{
            return true;
        }
    }

    public User save(User user){
        return crud.save(user);
    }

    public void update(User user){
        crud.save(user);
    }

    public void delete(User user){
        crud.delete(user);
    }
}
