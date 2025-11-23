package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("SELECT appt FROM Appointment appt WHERE appt.joboffer.id=:id ORDER BY appt.appointmentdate ASC")
    List<Appointment> getAppointmentsByJobofferId(@Param("id") Integer id);
}
