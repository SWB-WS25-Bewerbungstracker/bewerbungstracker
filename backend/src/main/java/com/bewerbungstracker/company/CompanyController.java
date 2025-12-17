package com.bewerbungstracker.company;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//REST Schnittstelle für Company
@RestController
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
