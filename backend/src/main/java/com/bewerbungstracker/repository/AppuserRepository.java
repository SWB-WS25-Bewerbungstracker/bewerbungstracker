package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Appuser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppuserRepository extends JpaRepository<Appuser, Integer> {
}
