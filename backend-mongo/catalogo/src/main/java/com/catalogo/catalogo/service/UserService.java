package com.catalogo.catalogo.service;

import com.catalogo.catalogo.Repository.UserRepository;
import com.catalogo.catalogo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Author: IYMH - Andres C Gutierrez Gonzalez
 */

@Service
public class UserService {

    @Autowired
    UserRepository repository;

    public List<User> getAll(){
        return repository.findAll();
    }

    public Optional<User> getUser(int id){
        return repository.getUser(id);
    }

    public boolean ExistenciaEmail(String email){
        return repository.ExistenciaEmail(email);
    }

    public User Autenticar (String email, String password){
        Optional<User> user = repository.AutenticarUsuario(email, password);
        if(user.isEmpty()){
            return new User(null, null, null, null, null, null, null, null, null, null, null);
        } else {
            return user.get();
        }
    }

    //Metodo para salvar un uuario sin colocar Id
    public User registrar(User user){
        Optional<User> UserMax= repository.UserIdMax();
        if (user.getId() == null) {
            if(UserMax.isEmpty()){
                user.setId(1);
            }else {
                user.setId(UserMax.get().getId() + 1);
            }
        }
        Optional<User>verificar = repository.getUser(user.getId());
        if(verificar.isEmpty()){
            if(!repository.ExistenciaEmail(user.getEmail())){
                return repository.save(user);
            }else {
                return user;
            }
        }else {
            return user;
        }
    }

    public User update(User user) {
        Optional<User> obtenerid = repository.getEmail(user.getEmail());

        if(user.getId() == null){
            user.setId(obtenerid.get().getId());
        }

        Optional<User> userDb = repository.getUser(user.getId());
            if (!userDb.isEmpty()) {
                if (user.getIdentification() != null) {
                    userDb.get().setIdentification(user.getIdentification());
                }
                if (user.getName() != null) {
                    userDb.get().setName(user.getName());
                }
                if (user.getBirthtDay() != null) {
                    userDb.get().setBirthtDay(user.getBirthtDay());
                }
                if (user.getMonthBirthtDay() != null) {
                    userDb.get().setMonthBirthtDay(user.getMonthBirthtDay());
                }
                if (user.getAddress() != null) {
                    userDb.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null) {
                    userDb.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null) {
                    userDb.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    userDb.get().setPassword(user.getPassword());
                }
                if (user.getZone() != null) {
                    userDb.get().setZone(user.getZone());
                }
                if (user.getType() != null) {
                    userDb.get().setType(user.getType());
                }
                repository.update(userDb.get());
                return userDb.get();
            } else {
                return user;
            }
    }

    public boolean delete(int userid){
        Optional<User> eliminar= repository.getUser(userid);
        if(!eliminar.isEmpty()){
            repository.delete(eliminar.get());
            return true;
        }else{
            return false;
        }
    }

}
