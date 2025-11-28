package com.bewerbungstracker.jobofferinputview;

import com.bewerbungstracker.entity.Joboffer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/joboffer")
@RequiredArgsConstructor
public class JobofferInputViewController {
    private final JobofferInputViewService jobofferInputViewService;

    @PostMapping(path = "/inputForm", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String postJobofferInfo(@RequestBody JobofferInputDTO jobofferInfo) {            //should return success page
        log.debug("jobofferInfo: {}", jobofferInfo);
        Joboffer test = jobofferInputViewService.saveJobofferInput(jobofferInfo);
        return test.toString();
    }
}
