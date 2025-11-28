package com.bewerbungstracker.singlejobofferview;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/joboffer")
@RequiredArgsConstructor
public class SingleJobofferViewController {
    private final SingleJobofferViewService singleJobofferViewService;



    @GetMapping("/{id}")
    public SingleJobofferViewDetails getJobofferDetailsById(@PathVariable Integer id) {
        return singleJobofferViewService.getJobofferDetails(id);
    }
}
