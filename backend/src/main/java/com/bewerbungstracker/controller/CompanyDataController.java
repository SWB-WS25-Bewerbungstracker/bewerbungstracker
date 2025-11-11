package com.bewerbungstracker.controller;


import com.bewerbungstracker.service.CompanyDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyDataController {
    private final CompanyDataService companyDataService;

    @GetMapping("/names")
    public List<String> names() {
        return companyDataService.getCompanyNames();
    }
}
