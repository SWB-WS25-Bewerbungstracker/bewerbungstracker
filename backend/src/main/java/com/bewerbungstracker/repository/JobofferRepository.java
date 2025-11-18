package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Joboffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobofferRepository extends JpaRepository<Joboffer, Integer> {

    @Query("SELECT jo FROM Joboffer jo WHERE jo.id=:id")
    Joboffer getJobofferById(@Param("id") Integer id);
}
