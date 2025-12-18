package com.bewerbungstracker.company;

import lombok.AllArgsConstructor;
import lombok.Data;

//Datenklasse die and Frontend weitergegeben wird
@Data
@AllArgsConstructor
public class CompanySelectDTO {
    private Integer id;
    private String companyname;
}
