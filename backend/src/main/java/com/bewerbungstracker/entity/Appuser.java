package com.bewerbungstracker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "appuser")
@Entity
@Data
public class Appuser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String firstname;

    @Column
    private String lastname;

    @Column
    private String email;

    @ManyToOne
    @JoinColumn(name = "useraddress")
    private Address address;
}
