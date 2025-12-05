package com.bewerbungstracker.jobofferinputview;

import com.bewerbungstracker.entity.Joboffer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/joboffer")
@RequiredArgsConstructor
public class JobofferInputViewController {
    private final JobofferInputViewService jobofferInputViewService;

    @PostMapping(path = "/inputForm", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postJobofferInfo(@RequestBody JobofferInputDTO jobofferInfo) {            //should return success page
        log.debug("jobofferInfo: {}", jobofferInfo);
        jobofferInputViewService.saveJobofferInput(jobofferInfo);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Bewerbung erfolgreich erstellt!");
    }
}
