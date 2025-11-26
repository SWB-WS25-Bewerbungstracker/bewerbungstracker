package com.bewerbungstracker.joboffercardview;

import com.bewerbungstracker.entity.Joboffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobofferCardViewRepository extends JpaRepository<Joboffer, Integer> {
    // Alle Joboffers für die Kartenansicht
    @Query("SELECT " +
            "jo.id, " +
            "jo.jobtitle, " +
            "jo.company.companyname, " +
            "(SELECT MIN(a.appointmentdate) FROM Appointment a WHERE a.joboffer = jo AND a.appointmentdate>CURRENT_TIMESTAMP)" +
            "FROM Joboffer jo ")
    List<JobofferCardViewDTO> getAllJoboffers();
}
