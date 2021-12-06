package com.catalogo.catalogo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Data
@AllArgsConstructor
//@NoArgsConstructor
@RequiredArgsConstructor
@Document(collection = "supplement")
public class Supplements implements Serializable {
    @Id
    private String reference;

    @Field(name="Brand")
    private String brand;

    @Field(name="Category")
    private String category;

    @Field(name="Objective")
    private String objetivo;

    @Field(name="Description")
    private String description;

    @Field(name="Availability")
    private boolean availability = true;

    @Field(name="Price")
    private double price;

    @Field(name="Quantity")
    private int quantity;

    @Field(name="Photography")
    private String photography;
}
