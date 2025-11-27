package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
}
