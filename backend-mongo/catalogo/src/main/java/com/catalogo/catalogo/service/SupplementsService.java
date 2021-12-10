package com.catalogo.catalogo.service;

import com.catalogo.catalogo.Repository.SupplementRepository;
import com.catalogo.catalogo.model.Supplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SupplementsService {
    @Autowired
    SupplementRepository repository;

    public boolean existenciaProducto(String referencia){
        return repository.ExistenciaProducto(referencia);
    }

    public List<Supplements> getAll() {
        return repository.getAll();
    }

    public Optional<Supplements> getClothe(String reference) {
        return repository.getSupplement(reference);
    }

    public Supplements create(Supplements accesory) {
        Optional<Supplements> supplement = repository.getSupplement(accesory.getReference());
        if (accesory.getReference() == null) {
            return accesory;
        }

        else {
            if (supplement.isEmpty()) {
                return repository.create(accesory);
            }

            else {
                return accesory;
            }
        }
    }

    public Supplements update(Supplements accesory) {
        if (accesory.getReference() != null) {
            Optional<Supplements> accesoryDb = repository.getSupplement(accesory.getReference());
            if (!accesoryDb.isEmpty()) {

                if (accesory.getBrand()!= null) {
                    accesoryDb.get().setBrand(accesory.getBrand());
                }

                if (accesory.getCategory() != null) {
                    accesoryDb.get().setCategory(accesory.getCategory());
                }

                if (accesory.getDescription() != null) {
                    accesoryDb.get().setDescription(accesory.getDescription());
                }
                if (accesory.getPrice() != 0.0) {
                    accesoryDb.get().setPrice(accesory.getPrice());
                }
                if (accesory.getQuantity() != 0) {
                    accesoryDb.get().setQuantity(accesory.getQuantity());
                }
                if (accesory.getPhotography() != null) {
                    accesoryDb.get().setPhotography(accesory.getPhotography());
                }
                accesoryDb.get().setAvailability(accesory.isAvailability());
                repository.update(accesoryDb.get());
                return accesoryDb.get();
            }
            else {
                return accesory;
            }
        }
        else {
            return accesory;
        }
    }

    public boolean delete(String reference) {
        Optional<Supplements> supplement = repository.getSupplement(reference);
        if(!supplement.isEmpty()){
            repository.delete(supplement.get());
            return true;
        }else{
            return false;
        }
    }

}
