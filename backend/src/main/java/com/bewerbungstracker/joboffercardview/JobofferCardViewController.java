package com.bewerbungstracker.joboffercardview;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
    public List<JobofferCardViewDTO> getAllJoboffers(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("email");
        return jobofferCardViewService.getAllJoboffers(email);
    }
}