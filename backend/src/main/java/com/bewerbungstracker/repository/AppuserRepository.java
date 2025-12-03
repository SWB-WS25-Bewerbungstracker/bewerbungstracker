package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Appuser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AppuserRepository extends JpaRepository<Appuser, Integer> {
    Optional<Appuser> findByEmail(String email);
}
