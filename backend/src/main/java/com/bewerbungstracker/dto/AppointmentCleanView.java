package com.bewerbungstracker.dto;

import com.bewerbungstracker.entity.Appointment;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class AppointmentCleanView {
    private Integer id;
    private LocalDateTime appointmentdate;
    private String appointmentname;

    public AppointmentCleanView(Appointment appointment) {
        this.id = appointment.getId();
        this.appointmentdate = appointment.getAppointmentdate();
        this.appointmentname = appointment.getAppointmentname();
    }
}
