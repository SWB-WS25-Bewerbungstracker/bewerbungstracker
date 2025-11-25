package com.bewerbungstracker.appointment;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TempAppointmentService {
    private final TempApptRepository appointmentRepository;

    public List<AppointmentDTO> getAllAppointments() {return appointmentRepository.getAppointments();}
}
