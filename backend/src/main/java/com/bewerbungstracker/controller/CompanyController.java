package com.bewerbungstracker.controller;


import com.bewerbungstracker.dto.CompanyDTO;
import com.bewerbungstracker.entity.Company;
import com.bewerbungstracker.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//REST Schnittstelle für Company
@RestController
// https://spring.io/guides/gs/rest-service-cors#global-cors-configuration
// Um Zugriff von anderem Port zu erlauben
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials="true")
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    //Stellt Namen aller Firmen bereit
    @GetMapping("/names")
    public List<String> names() {
        return companyService.getCompanyNames();
    }

    //Stellt Firmendaten bereit
    @GetMapping()
    public List<CompanyDTO> companies() {
        return companyService.getCompany();
    }

    @GetMapping("/{id}")
    public Company companyById(@PathVariable Integer id) {
        return companyService.getCompanyById(id);
    }
}
