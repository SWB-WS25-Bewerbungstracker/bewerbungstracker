package com.bewerbungstracker.company;

import com.bewerbungstracker.address.Address;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final CompanyConverter companyConverter;

    //Gibt die Namen aller Firmen aus der Datenbank zurück
    public List<String> getCompanyNames() {
        return companyRepository.findAll().stream().map(Company::getCompanyname).collect(Collectors.toList());
    }

    //Gibt Liste aller Firmen in der Datenbak als DTO zurück
    public List<CompanyDTO> getCompany() {
        return companyRepository.findAll().stream().map(c -> new CompanyDTO(
                c.getId(),
                c.getCompanyname())
        ).collect(Collectors.toList());
    }

    public Company getCompanyById(Integer id) {
        return companyRepository.getCompanyById(id);
    }

    public Company createCompany(String companyName, Integer empcount, String logo, Address address ){
        if(companyName == null || companyName.isEmpty()) {
            throw new IllegalArgumentException("Company name cannot be null or empty");
        }
        Company company = companyConverter.toEntity(companyName, empcount, logo, address);
        return companyRepository.save(company);
    }
}

