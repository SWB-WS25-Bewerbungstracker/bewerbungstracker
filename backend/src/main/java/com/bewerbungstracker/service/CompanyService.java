package com.bewerbungstracker.service;

import com.bewerbungstracker.dto.CompanyDTO;
import com.bewerbungstracker.entity.Company;
import com.bewerbungstracker.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

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
}

