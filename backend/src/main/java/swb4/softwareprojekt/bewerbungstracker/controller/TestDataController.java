package  swb4.softwareprojekt.bewerbungstracker.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swb4.softwareprojekt.bewerbungstracker.service.TestDataService;

import java.util.List;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestDataController {
    private final TestDataService testDataService;

    @GetMapping
    public List<Integer> test(){
        return  testDataService.getTestNumbers();
    }

}
