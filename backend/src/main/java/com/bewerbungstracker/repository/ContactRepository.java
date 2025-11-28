package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

}
