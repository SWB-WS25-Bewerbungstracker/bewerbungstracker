package com.bewerbungstracker.controller;

import com.bewerbungstracker.dto.JobofferDetails;
import com.bewerbungstracker.service.JobofferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials = "true")
@RequestMapping("/joboffer")
@RequiredArgsConstructor
public class JobofferController {
    private final JobofferService jobofferService;

    @GetMapping("/{id}")
    public JobofferDetails getJobofferDetailsById(@PathVariable Integer id) {
        return jobofferService.getJobofferDetails(id);
    }
}
