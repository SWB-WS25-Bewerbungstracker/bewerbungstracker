package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Joboffer;
import com.bewerbungstracker.dto.JobofferDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobofferRepository extends JpaRepository<Joboffer, Integer> {

    // Alle Joboffers für die Kartenansicht
    @Query("SELECT " +
                "jo.id, " +
                "jo.jobtitle, " +
                "jo.company.companyname, " +
                "(SELECT MIN(a.appointmentdate) FROM Appointment a WHERE a.joboffer = jo AND a.appointmentdate>CURRENT_TIMESTAMP)" +
            "FROM Joboffer jo ")
    List<JobofferDetails> getAllJoboffers();

    @Query("SELECT jo FROM Joboffer jo WHERE jo.id=:id")
    Joboffer getJobofferById(@Param("id") Integer id);
}
