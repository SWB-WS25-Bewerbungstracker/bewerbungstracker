package com.bewerbungstracker.joboffercardview;

import com.bewerbungstracker.entity.Joboffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobofferCardViewRepository extends JpaRepository<Joboffer, Integer> {
    // Alle Joboffers für die Kartenansicht
    @Query("""
            SELECT new com.bewerbungstracker.joboffercardview.JobofferCardViewDTO(
                    jo.id,
                    jo.jobtitle,
                    jo.company.id,
                    jo.company.companyname,
                    MIN(a.appointmentdate)
                )
                FROM Joboffer jo
                LEFT JOIN Appointment a ON a.joboffer = jo AND a.appointmentdate > CURRENT_TIMESTAMP
                GROUP BY jo.id, jo.jobtitle, jo.company, jo.company.companyname
                ORDER BY jo.id
           """)
    List<JobofferCardViewDTO> getAllJoboffers();
}
