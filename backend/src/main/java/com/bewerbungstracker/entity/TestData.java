package com.bewerbungstracker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name="test_table")
@Entity
@Data
public class TestData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="value")
    private Integer testNumber;
}
