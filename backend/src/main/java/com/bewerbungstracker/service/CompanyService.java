package com.bewerbungstracker.service;

import com.bewerbungstracker.entity.CompanyData;
import com.bewerbungstracker.repository.CompanyDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyDataService {
    private final CompanyDataRepository companyDataRepository;

    public List<String> getCompanyNames() {
        return companyDataRepository.findAll().stream().map(CompanyData::getCompanyname).collect(Collectors.toList());
    }
}
