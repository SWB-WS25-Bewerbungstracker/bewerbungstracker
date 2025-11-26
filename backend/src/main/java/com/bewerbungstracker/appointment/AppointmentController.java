package com.bewerbungstracker.appointment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final TempAppointmentService tempAppointmentService;

    @GetMapping
    public List<AppointmentDTO> getAllAppointments() {
        return tempAppointmentService.getAllAppointments();
    }

}
