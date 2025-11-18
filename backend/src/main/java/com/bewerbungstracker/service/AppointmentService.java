package com.bewerbungstracker.service;

import com.bewerbungstracker.entity.Appointment;
import com.bewerbungstracker.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public List<Appointment> getAppointmentsByJobofferId(Integer id) {
        return appointmentRepository.getAppointmentsByJobofferId(id);
    }

    public LocalDateTime getEarliestAppointment(List<Appointment> appointments) {
        return appointments.stream().map(Appointment::getAppointmentdate)
                .min(LocalDateTime::compareTo).orElse(null);
    }
}
