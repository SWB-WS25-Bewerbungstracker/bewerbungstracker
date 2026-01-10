package com.bewerbungstracker.appointment;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class AppointmentCleanView {
    private Integer id;
    private LocalDateTime appointmentDate;
    private String appointmentName;

    public AppointmentCleanView(Appointment appointment) {
        this.id = appointment.getId();
        this.appointmentDate = appointment.getAppointmentdate();
        this.appointmentName = appointment.getAppointmentname();
    }
}
