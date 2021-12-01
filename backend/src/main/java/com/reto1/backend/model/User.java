package com.reto1.backend.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 11)
    Integer id ;
    @NonNull
    @Column(name = "user_email", length = 50)
    String email;
    @NonNull
    @Column(name = "user_password", length = 50)
    String password;
    @NonNull
    @Column(name = "user_name", length = 80)
    String name;
}
