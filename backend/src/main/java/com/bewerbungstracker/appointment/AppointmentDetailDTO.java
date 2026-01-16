package com.bewerbungstracker.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AppointmentDetailDTO {

    Integer appointmentID;

    LocalDateTime appointmentdate;

    String appointmentname;

    Integer jobofferID;

    String joboffername;

    String companyname;

    String contact;
}
