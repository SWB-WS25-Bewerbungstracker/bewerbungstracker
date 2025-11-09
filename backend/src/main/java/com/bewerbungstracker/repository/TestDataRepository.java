package com.bewerbungstracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bewerbungstracker.entity.TestData;

public interface TestDataRepository extends JpaRepository<TestData, Long> {}