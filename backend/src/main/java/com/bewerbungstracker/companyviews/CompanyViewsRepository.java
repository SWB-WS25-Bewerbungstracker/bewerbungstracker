package com.bewerbungstracker.companyviews;

import com.bewerbungstracker.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanyViewsRepository extends JpaRepository<Company, Integer> {

    @Query("SELECT comp FROM Company comp WHERE comp.id=:id")
    Company getCompanyById(@Param("id") Integer id);
}
