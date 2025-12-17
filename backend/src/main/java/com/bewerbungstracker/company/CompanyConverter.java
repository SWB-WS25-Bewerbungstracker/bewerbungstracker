package com.bewerbungstracker.company;

import com.bewerbungstracker.address.Address;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CompanyConverter {


    public Company toEntity(String companyName, Integer empcount, String logo, Address address ) {
        Company company = new Company();
        company.setCompanyname(companyName);
        company.setEmpcount(empcount);
        company.setLogo(logo);
        company.setAddress(address);
        return company;
    }
}
