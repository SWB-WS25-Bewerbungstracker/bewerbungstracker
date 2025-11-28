package com.bewerbungstracker.singlejobofferview;

import com.bewerbungstracker.entity.Appointment;
import com.bewerbungstracker.entity.Joboffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SingleJobofferViewRepository extends JpaRepository<Joboffer, Integer> {
    @Query("SELECT jo FROM Joboffer jo WHERE jo.id=:id")
    Joboffer getJobofferById(@Param("id") Integer id);

    @Query("SELECT appt FROM Appointment appt WHERE appt.joboffer.id=:id ORDER BY appt.appointmentdate ASC")
    List<Appointment> getAppointmentsByJobofferId(@Param("id") Integer id);
}
