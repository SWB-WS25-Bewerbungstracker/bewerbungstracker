package com.bewerbungstracker.company;

import com.bewerbungstracker.address.AddressInputDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CompanyInputDTO {
    private Integer companyId;
    private String companyName;
    private Integer companyEmployees;
    private String companyLogo;
    private AddressInputDTO companyAddress;
}
