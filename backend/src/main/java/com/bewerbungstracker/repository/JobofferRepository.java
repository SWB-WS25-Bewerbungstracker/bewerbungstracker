package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Joboffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobofferRepository extends JpaRepository<Joboffer, Integer> {
}
