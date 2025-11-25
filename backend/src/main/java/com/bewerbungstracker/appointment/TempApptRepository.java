package com.bewerbungstracker.appointment;

import com.bewerbungstracker.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TempApptRepository extends JpaRepository<Appointment, Integer> {

    @Query("SELECT appt.id, appt.appointmentdate, appt.appointmentname FROM Appointment appt")
    List<AppointmentDTO> getAppointments();
}