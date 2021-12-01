package com.catalogo.catalogo.service;

import com.catalogo.catalogo.Repository.UserRepository;
import com.catalogo.catalogo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository repository;

    public List<User> getAll(){
        return repository.findAll();
    }

    public Optional<User> getUser(String id){
        return repository.getUser(id);
    }

    public User registrar(User user){
        if(user.getId().isEmpty()){
            if(repository.ExistenciaEmail(user.getEmail())){
                return user;
            }
            else
                return repository.save(user);
        }
        else
            return user;
    }

    public boolean ExistenciaEmail(String email){
        return repository.ExistenciaEmail(email);
    }

    public User Autenticar (String email, String password){
        Optional<User> user = repository.AutenticarUsuario(email, password);
        if(user.isEmpty()){
            return new User(email, password, "NO DEFINIDO");
        } else {
            return user.get();
        }
    }
}
