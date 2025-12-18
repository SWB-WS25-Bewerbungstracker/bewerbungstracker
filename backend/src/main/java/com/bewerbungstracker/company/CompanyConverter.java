package com.bewerbungstracker.company;

import com.bewerbungstracker.address.Address;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CompanyConverter {


    public Company toEntity(CompanyInputDTO input, Address address) {
        Company company = new Company();
        company.setCompanyname(input.getCompanyName());
        company.setEmpcount(input.getCompanyEmployees());
        company.setLogo(input.getCompanyLogo());
        company.setAddress(address);
        return company;
    }
}
