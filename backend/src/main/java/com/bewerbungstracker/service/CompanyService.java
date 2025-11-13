package com.bewerbungstracker.service;

import com.bewerbungstracker.entity.Company;
import com.bewerbungstracker.repository.CompanyRepository;
import com.bewerbungstracker.dto.CompanyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

    public List<String> getCompanyNames() {
        return companyRepository.findAll().stream().map(Company::getCompanyname).collect(Collectors.toList());
    }

    public List<CompanyDTO> getCompany() {
        return companyRepository.findAll().stream().map(c -> new CompanyDTO(
                c.getId(),
                c.getCompanyname())
        ).collect(Collectors.toList());
    }
}

