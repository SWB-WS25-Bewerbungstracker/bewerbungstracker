package com.bewerbungstracker.joboffer;

import com.bewerbungstracker.appointment.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobofferRepository extends JpaRepository<Joboffer, Integer> {

    // Alle Joboffers für die Kartenansicht
    @Query("""
            SELECT new com.bewerbungstracker.joboffer.JobofferCardDTO(
                    jo.id,
                    jo.jobtitle,
                    jo.companyname,
                    MIN(a.appointmentdate)
                )
                FROM Joboffer jo
                LEFT JOIN Appointment a ON a.joboffer = jo AND a.appointmentdate > CURRENT_TIMESTAMP
                WHERE jo.appuser.email = ?1
                GROUP BY jo.id, jo.jobtitle, jo.companyname
                ORDER BY jo.id
           """)
    List<JobofferCardDTO> getAllJoboffers(String email);

    @Query("SELECT jo FROM Joboffer jo WHERE jo.id=:id")
    Joboffer getJobofferById(@Param("id") Integer id);

    @Query("SELECT appt FROM Appointment appt WHERE appt.joboffer.id=:id ORDER BY appt.appointmentdate ASC")
    List<Appointment> getAppointmentsByJobofferId(@Param("id") Integer id);

    @Query("""
            SELECT DISTINCT new com.bewerbungstracker.joboffer.CompanySelectDTO(
                        jo.companyname
                        )
                        FROM Joboffer jo
                        WHERE jo.appuser.email = ?1
                        ORDER BY jo.companyname ASC
            """)
    List<CompanySelectDTO> getCompanySelection(String email);
}
