package com.bewerbungstracker.appointment;

import com.bewerbungstracker.joboffer.Joboffer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AppointmentConverter {
    Appointment toEntity(AppointmentCleanView dto, Joboffer joboffer ) {
        Appointment appointment = new Appointment();
        appointment.setAppointmentdate(dto.getAppointmentDate());
        appointment.setAppointmentname(dto.getAppointmentName());
        appointment.setJoboffer(joboffer);
        return appointment;
    }
}
