package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Joboffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobofferRepository extends JpaRepository<Joboffer, Integer> {

    // Alle Joboffers für die Kartenansicht
    @Query("SELECT jo FROM Joboffer jo")
    List<Joboffer> getAllJoboffers();

    @Query("SELECT jo FROM Joboffer jo WHERE jo.id=:id")
    Joboffer getJobofferById(@Param("id") Integer id);
}
