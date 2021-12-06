package com.catalogo.catalogo.Repository;

import com.catalogo.catalogo.CrudRepository.SupplementCrudRepository;
import com.catalogo.catalogo.model.Supplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SupplementRepository {
    @Autowired
    SupplementCrudRepository crud;

    public List<Supplements> getAll(){
        return (List<Supplements>) crud.findAll();
    }

    public Optional<Supplements> getSupplement(String reference){
        return crud.findById(reference);
    }

    public Supplements create(Supplements supplements){
        return crud.save(supplements);
    }

    public void update(Supplements supplements){
        crud.save(supplements);
    }

    public void delete(Supplements supplements){
        crud.delete(supplements);
    }
}
