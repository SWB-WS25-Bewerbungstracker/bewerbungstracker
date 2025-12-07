package com.bewerbungstracker.joboffercardview;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/joboffer")
@RequiredArgsConstructor
public class JobofferCardViewController {
    private final JobofferCardViewService jobofferCardViewService;

    @GetMapping
    public List<JobofferCardViewDTO> getAllJoboffers() {
        return jobofferCardViewService.getAllJoboffers();
    }
}