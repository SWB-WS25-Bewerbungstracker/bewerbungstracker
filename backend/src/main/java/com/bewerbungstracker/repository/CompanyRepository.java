package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.CompanyData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyDataRepository extends JpaRepository<CompanyData, Integer> {}
