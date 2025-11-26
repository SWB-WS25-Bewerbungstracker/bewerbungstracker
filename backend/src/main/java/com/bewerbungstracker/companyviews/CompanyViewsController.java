package com.bewerbungstracker.companyviews;


import com.bewerbungstracker.entity.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//REST Schnittstelle für Company
@RestController
// https://spring.io/guides/gs/rest-service-cors#global-cors-configuration
// Um Zugriff von anderem Port zu erlauben
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyViewsController {
    private final CompanyViewsService companyViewsService;

    //Stellt Namen aller Firmen bereit
    @GetMapping("/names")
    public List<String> names() {
        return companyViewsService.getCompanyNames();
    }

    //Stellt Firmendaten bereit
    @GetMapping()
    public List<CompanyDTO> companies() {
        return companyViewsService.getCompany();
    }

    @GetMapping("/{id}")
    public Company companyById(@PathVariable Integer id) {
        return companyViewsService.getCompanyById(id);
    }
}
