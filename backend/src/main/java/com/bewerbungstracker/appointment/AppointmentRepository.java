package com.bewerbungstracker.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("""
        SELECT new com.bewerbungstracker.appointment.AppointmentDetailDTO(
            appt.id,
            appt.appointmentdate, 
            appt.appointmentname, 
            appt.joboffer.id, 
            appt.joboffer.jobtitle, 
            appt.joboffer.companyname)
        FROM Appointment appt
        """)
    List<AppointmentDetailDTO> getAppointmentDetails();


    @Query("""
        SELECT appt FROM Appointment appt
        WHERE appt.joboffer.appuser.email = ?1 AND appt.joboffer.id = ?2
    """)
    List<Appointment> getAppointmentsByJoboffer(String email, Integer jobofferId);
}
