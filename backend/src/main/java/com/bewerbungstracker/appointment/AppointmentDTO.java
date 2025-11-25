package com.bewerbungstracker.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AppointmentDTO {

    Integer appointmentID;

    LocalDateTime appointmentdate;

    String appointmentname;
}
