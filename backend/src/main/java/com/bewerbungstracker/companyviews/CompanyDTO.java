package com.bewerbungstracker.companyviews;

import lombok.AllArgsConstructor;
import lombok.Data;

//Datenklasse die and Frontend weitergegeben wird
@Data
@AllArgsConstructor
public class CompanyDTO {
    private Integer id;
    private String companyname;
}
