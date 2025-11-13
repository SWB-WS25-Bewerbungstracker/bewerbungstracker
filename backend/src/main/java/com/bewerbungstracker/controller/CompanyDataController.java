package com.bewerbungstracker.controller;


import com.bewerbungstracker.service.CompanyDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials="true")
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyDataController {
    private final CompanyDataService companyDataService;
    // https://spring.io/guides/gs/rest-service-cors#global-cors-configuration
    // Um Zugriff von anderem Port zu erlauben
    @GetMapping("/names")
    public List<String> names() {
        return companyDataService.getCompanyNames();
    }
}
