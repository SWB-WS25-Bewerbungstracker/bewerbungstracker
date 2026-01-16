package com.bewerbungstracker.joboffer;

import com.bewerbungstracker.appointment.Appointment;
import com.bewerbungstracker.address.Address;
import com.bewerbungstracker.appuser.Appuser;
import com.bewerbungstracker.joboffer.contact.Contact;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Table(name = "joboffer")
@Entity
@Data
public class Joboffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jobofferid")
    private Integer id;

    @Column(nullable = false)
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

    @Column(nullable = false)
    private String companyname;

    @Column
    private Integer empcount;

    @Column
    private String logo;

    @OneToOne
    @JoinColumn(name = "companyaddress")
    private Address address;

    @ManyToOne (cascade = CascadeType.REMOVE)
    @JoinColumn(name = "contact", referencedColumnName = "contactid")
    private Contact contact;

    /*@ManyToOne
    @JoinColumn(name = "company")
    private Company company;*/

    @ManyToOne()
    @JoinColumn(name = "appuser")
    private Appuser appuser;

    @OneToMany(mappedBy = "joboffer", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Appointment> appointments;
}
