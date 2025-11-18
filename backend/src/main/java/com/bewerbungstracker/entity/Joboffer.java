package com.bewerbungstracker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "joboffer")
@Entity
@Data
public class Joboffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jobofferid")
    private Integer id;

    @Column
    private String jobtitle;

    @Column
    private String description;

    @Column
    private Integer wagemin;

    @Column
    private Integer wagemax;

    @Column
    private Integer rating;

    @Column
    private String notes;

    @ManyToOne
    private Contact contact;

    @ManyToOne
    @JoinColumn(name = "company")
    private Company company;

    /*
    @ManyToOne
    private Appuser appuser;
    */
}
