package com.reto1.backend.controller;

import com.reto1.backend.model.User;
import com.reto1.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class userWeb {
    @Autowired
    UserService service;

    @GetMapping("/all")
    public List<User> getAll(){
        return service.findAll();
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User registrar(@RequestBody User user){
        return service.save(user);
    }

    @GetMapping("/{email}/{password}")
    public User autenticarUsuario(@PathVariable("email") String email, @PathVariable("password") String password){
        return service.Autenticar(email, password);
    }

    @GetMapping("/{email}")
    public boolean existeEmail(@PathVariable("email") String email){
        return  service.existenciaEmail(email);
    }

    @GetMapping("/get/{email}")
    public Optional<User> obtenerEmail(@PathVariable("email") String email){
        return  service.findEmail(email);
    }

    @GetMapping("/get/{user}")
    public Optional<User> obtenerEmail(@PathVariable("userid") int userid){
        return  service.getUser(userid);
    }
}
