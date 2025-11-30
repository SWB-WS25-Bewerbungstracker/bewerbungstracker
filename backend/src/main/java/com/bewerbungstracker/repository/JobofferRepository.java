package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Appointment;
import com.bewerbungstracker.entity.Joboffer;
import com.bewerbungstracker.joboffercardview.JobofferCardViewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobofferRepository extends JpaRepository<Joboffer, Integer> {

    // Alle Joboffers für die Kartenansicht
    @Query("""
            SELECT new com.bewerbungstracker.joboffercardview.JobofferCardViewDTO(
                    jo.id,
                    jo.jobtitle,
                    c.id,
                    c.companyname,
                    MIN(a.appointmentdate)
                )
                FROM Joboffer jo
                LEFT JOIN jo.company c
                LEFT JOIN Appointment a ON a.joboffer = jo AND a.appointmentdate > CURRENT_TIMESTAMP
                WHERE jo.appuser.email = ?1
                GROUP BY jo.id, jo.jobtitle, c.id, c.companyname
                ORDER BY jo.id
           """)
    List<JobofferCardViewDTO> getAllJoboffers(String email);

    @Query("SELECT jo FROM Joboffer jo WHERE jo.id=:id")
    Joboffer getJobofferById(@Param("id") Integer id);

    @Query("SELECT appt FROM Appointment appt WHERE appt.joboffer.id=:id ORDER BY appt.appointmentdate ASC")
    List<Appointment> getAppointmentsByJobofferId(@Param("id") Integer id);
}
