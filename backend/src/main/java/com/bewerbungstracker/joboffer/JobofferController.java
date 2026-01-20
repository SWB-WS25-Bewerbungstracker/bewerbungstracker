package com.bewerbungstracker.joboffer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/joboffer")
@RequiredArgsConstructor
public class JobofferController {
    private final JobofferService jobofferService;
    public static final String EMAIL = "email";

    @GetMapping
    public List<JobofferCardDTO> getAllJoboffers(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString(EMAIL);
        return jobofferService.getAllJoboffers(email);
    }

    @GetMapping("/{id}")
    public JobofferDTO getJobofferById(@PathVariable Integer id) {
        return jobofferService.getJobofferById(id);
    }

    @GetMapping("/companies")
    public List<CompanySelectDTO> getCompanies(@AuthenticationPrincipal Jwt jwt) {
        return jobofferService.getCompanies(jwt.getClaimAsString(EMAIL));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteJobofferById(@PathVariable Integer id) {
        log.info("Controller: Joboffer löschen Request erhalten für Id: {}", id);
        jobofferService.deleteJobofferById(id);
        log.info("Controller: Joboffer {} erfolgreich gelöscht", id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(path = "/inputForm", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postJobofferInfo(@RequestBody JobofferNestedInputDTO jobofferInfo,
                                                   @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString(EMAIL);
        log.info("jobofferInfo: {} user: {}", jobofferInfo, email);
        jobofferService.saveJobofferInput(jobofferInfo, email);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Bewerbung erfolgreich erstellt!");
    }

    @PutMapping(path = "/editForm", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> putJobofferInfo(@RequestBody JobofferNestedInputDTO jobofferInfo,
                                                   @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString(EMAIL);
        log.info("jobofferInfo: {} user: {}", jobofferInfo, email);
        jobofferService.editJoboffer(jobofferInfo, email);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Bewerbung erfolgreich erstellt!");
    }
}
