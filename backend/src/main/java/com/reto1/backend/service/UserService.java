package com.reto1.backend.service;

import com.reto1.backend.model.User;
import com.reto1.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository repositorio;

    public List<User> findAll(){
        return repositorio.getAll();
    }

    public Optional<User> findEmail(String email){
        return repositorio.findEmail(email);
    }

    public Optional<User> getUser(int id){
        return repositorio.findUser(id);
    }

    public boolean existenciaEmail(String email){
        return repositorio.existenciaEmail(email);
    }

    public User save(User user){
        if(user.getId() == null){
            if(existenciaEmail(user.getEmail())){
                return user;
            }
            else{
                return repositorio.save(user);
            }
        }
        else{
            return user;
        }
    }

    public User Autenticar(String email, String password){
        Optional<User> user = repositorio.AuntenticarUsuario(email, password);
        if(user.isEmpty()){
            User usuario = new User(email,password,"NO DEFINIDO");
            return  usuario;
        }else{
            return user.get();
        }
    }
}
