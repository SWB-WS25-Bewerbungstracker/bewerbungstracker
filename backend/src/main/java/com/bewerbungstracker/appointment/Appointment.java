package com.bewerbungstracker.appointment;

import com.bewerbungstracker.joboffer.Joboffer;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Table(name = "appointment")
@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointmentid")
    private Integer id;

    @Column
    private LocalDateTime appointmentdate;

    @Column
    private String appointmentname;

    @ManyToOne
    @JoinColumn(name = "joboffer")
    private Joboffer joboffer;
}
