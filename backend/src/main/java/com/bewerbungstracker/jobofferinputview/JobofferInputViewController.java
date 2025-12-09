package com.bewerbungstracker.jobofferinputview;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/joboffer")
@RequiredArgsConstructor
public class JobofferInputViewController {
    private final JobofferInputViewService jobofferInputViewService;

    @PostMapping(path = "/inputForm", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postJobofferInfo(@RequestBody JobofferInputDTO jobofferInfo,
            @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("email");
        log.info("jobofferInfo: {} user: {}", jobofferInfo, email);
        jobofferInputViewService.saveJobofferInput(jobofferInfo, email);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Bewerbung erfolgreich erstellt!");
    }
}
