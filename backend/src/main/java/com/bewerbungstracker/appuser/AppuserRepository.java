package com.bewerbungstracker.appuser;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AppuserRepository extends JpaRepository<Appuser, Integer> {
    Optional<Appuser> findByEmail(String email);
}
