package com.bewerbungstracker.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AppointmentInputDTO {
    private Integer jobofferID;
    private LocalDateTime appointmentdate;
    private String appointmentname;
}
