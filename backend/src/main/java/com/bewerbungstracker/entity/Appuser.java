package com.bewerbungstracker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "appuser")
@Entity
@Data
public class Appuser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private Integer id;

    @Column(name = "userfname")
    private String firstname;

    @Column(name = "userlname")
    private String lastname;

    @Column(name = "useremail")
    private String email;

    @ManyToOne
    @JoinColumn(name = "useraddress")
    private Address address;
}
