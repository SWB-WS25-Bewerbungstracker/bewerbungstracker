package com.bewerbungstracker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "address")
@Entity
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addressid")
    private Integer id;

    @Column
    private String street;

    @Column
    private String streetno;

    @Column
    private String city;

    @Column
    private String zip;

    @Column
    private String country;
}
