package com.bewerbungstracker.document;

import com.bewerbungstracker.joboffer.Joboffer;
import jakarta.persistence.*;
import lombok.Data;

@Table(name = "document")
@Entity
@Data
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "documentid")
    private Integer id;

    @Column
    private String filename;

    @Column
    private String filetype;

    @Column
    private String category;

    @ManyToOne
    @JoinColumn(name = "joboffer")
    private Joboffer joboffer;
}
