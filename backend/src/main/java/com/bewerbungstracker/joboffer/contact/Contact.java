package com.bewerbungstracker.joboffer.contact;

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

    @Column(name = "contactfname")
    private String firstname;

    @Column(name = "contactlname")
    private String lastname;

    @Column (name = "contactemail")
    private String email;

    @Column (name = "contactphoneno")
    private String phoneno;
}
