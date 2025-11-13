package com.bewerbungstracker.controller;


import com.bewerbungstracker.dto.CompanyDTO;
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

    /*
     * Retrieves the names of all companies
     */
    @GetMapping("/names")
    public List<String> names() {
        return companyService.getCompanyNames();
    }

    //GET Zugriff auf companies (ID+name)
    @GetMapping()
    public List<CompanyDTO> companies() {
        return companyService.getCompany();
    }
}
