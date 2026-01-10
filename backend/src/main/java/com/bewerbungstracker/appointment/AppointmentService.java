package com.bewerbungstracker.appointment;


import com.bewerbungstracker.joboffer.Joboffer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AppointmentConverter appointmentConverter;

    public List<AppointmentDetailDTO> getAllAppointments() {
        return appointmentRepository.getAppointments();
    }

    public Appointment createAppointment (AppointmentCleanView dto, Joboffer joboffer) {
        Appointment appointment = appointmentConverter.toEntity(dto, joboffer);
        return appointmentRepository.save(appointment);
    }
}
