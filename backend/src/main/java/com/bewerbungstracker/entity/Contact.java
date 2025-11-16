package com.bewerbungstracker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "contact")
@Entity
@Data
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contactid")
    private Integer id;

    @Column
    private String firstname;

    @Column
    private String lastname;

    @Column
    private String email;

    @Column
    private String phoneno;
}
