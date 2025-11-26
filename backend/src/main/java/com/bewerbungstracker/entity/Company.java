package com.bewerbungstracker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name="company")
@Entity
@Data
public class Company {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "companyid")
    private Integer id;

    @Column
    private String companyname;

    @Column
    private Integer empcount;

    @Column
    private String logo;

    @OneToOne
    @JoinColumn(name = "companyaddress")
    private Address address;
}
