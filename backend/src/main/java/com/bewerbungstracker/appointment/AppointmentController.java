package com.bewerbungstracker.appointment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping
    public List<AppointmentDetailDTO> getAllAppointments(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("email");
        return appointmentService.getAllAppointmentsWithDetails(email);
    }

    @PostMapping
    public ResponseEntity<String> saveAppointment(@RequestBody AppointmentInputDTO input,
                                                  @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("email");
        appointmentService.createAppointment(input, email);
        return ResponseEntity.ok().body("Appointment successfully created!");
    }
}
