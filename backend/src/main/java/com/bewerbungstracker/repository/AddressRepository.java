package com.bewerbungstracker.repository;

import com.bewerbungstracker.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}
