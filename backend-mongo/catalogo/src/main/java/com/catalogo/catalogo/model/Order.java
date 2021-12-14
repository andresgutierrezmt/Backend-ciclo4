package com.catalogo.catalogo.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"id","registerDay","status","salesMan","products","quantities"})
public class Order implements Serializable {

    public static String PENDING = "pendiente";
    public static String APROVED = "Aprobada";
    public static  String REJECTED = "Rechazada";

    @Id
    private Integer id;
    private Date registerDay;
    private String status;
    private User salesMan;
    private Map<String,Supplements> products;
    private Map<String, Integer> quantities;
}
