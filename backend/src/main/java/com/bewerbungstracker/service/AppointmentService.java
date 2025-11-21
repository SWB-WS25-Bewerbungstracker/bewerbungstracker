package com.bewerbungstracker.service;

import com.bewerbungstracker.entity.Appointment;
import com.bewerbungstracker.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public List<Appointment> getAppointmentsByJobofferId(Integer id) {
        return appointmentRepository.getAppointmentsByJobofferId(id);
    }

    public Appointment getEarliestAppointment(List<Appointment> appointments) {
        return appointments.stream()
                .filter(a -> a.getAppointmentdate() != null)
                .min(Comparator.comparing(Appointment::getAppointmentdate))
                .orElse(null);
    }
}
