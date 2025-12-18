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
    public List<CompanySelectDTO> getCompany() {
        return companyRepository.findAll().stream().map(c -> new CompanySelectDTO(
                c.getId(),
                c.getCompanyname())
        ).collect(Collectors.toList());
    }

    public Company getCompanyById(Integer id) {
        return companyRepository.getCompanyById(id);
    }

    public Company createCompany(CompanyInputDTO input ){
        if(input.getCompanyName() == null || input.getCompanyName().isEmpty()) {
            throw new IllegalArgumentException("Company name cannot be null or empty");
        }
        //TODO: add input logic for adress and call here
        Company company = companyConverter.toEntity(input, null);
        return companyRepository.save(company);
    }
}

