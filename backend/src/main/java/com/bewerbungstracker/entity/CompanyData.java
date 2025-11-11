package com.bewerbungstracker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name="company")
@Entity
@Data
public class CompanyData {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String companyname;

    @Column
    private Integer empcount;

    @Column
    private String logo;

    @Column
    private Integer companyaddress;
}
