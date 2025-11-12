package com.bewerbungstracker.controller;


import com.bewerbungstracker.service.CompanyDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyDataController {
    private final CompanyDataService companyDataService;
    // https://spring.io/guides/gs/rest-service-cors#global-cors-configuration
    // Um Zugriff von anderem Port zu erlauben
    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("/names")
    public List<String> names(@RequestParam(required = false, defaultValue = "World") String name) {
        return companyDataService.getCompanyNames();
    }
}
