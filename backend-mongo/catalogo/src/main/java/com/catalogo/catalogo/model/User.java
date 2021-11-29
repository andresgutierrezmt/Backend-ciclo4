package com.catalogo.catalogo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

/**
 * Crear una coleccion en mongo db
 */

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@Document(collection= "user") //Como vamos a nombrar nuestra tabla (Base de datos)
public class User implements Serializable {
    @Id
    private String id;

    @NonNull
    @Field(name="user_email")
    private  String email;

    @NonNull
    @Field(name="user_password")
    private String password;

    @NonNull
    @Field(name="user_name")
    private String name;
}

