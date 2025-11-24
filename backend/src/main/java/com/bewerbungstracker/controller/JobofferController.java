package com.bewerbungstracker.controller;

import com.bewerbungstracker.dto.JobofferDetails;
import com.bewerbungstracker.dto.SingleJobofferDetails;
import com.bewerbungstracker.service.JobofferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/joboffer")
@RequiredArgsConstructor
public class JobofferController {
    private final JobofferService jobofferService;

    @GetMapping
    public List<JobofferDetails> getAllJoboffers() {
        return jobofferService.getAllJoboffers();
    }

    @GetMapping("/{id}")
    public SingleJobofferDetails getJobofferDetailsById(@PathVariable Integer id) {
        return jobofferService.getJobofferDetails(id);
    }
}
