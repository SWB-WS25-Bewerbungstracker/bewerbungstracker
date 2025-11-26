package com.bewerbungstracker.service;

import com.bewerbungstracker.entity.Appointment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    public Appointment getEarliestAppointment(List<Appointment> appointments) {
        return appointments.stream()
                .filter(a -> a.getAppointmentdate() != null)
                .min(Comparator.comparing(Appointment::getAppointmentdate))
                .orElse(null);
    }
}
