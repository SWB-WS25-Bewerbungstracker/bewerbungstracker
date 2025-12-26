package com.bewerbungstracker.address;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final AddressConverter converter;

    public Address createAddress(AddressInputDTO dto) {
        Address address = null;
        if (dto != null) {
             address = converter.toEntity(dto);
            return addressRepository.save(address);
        }
       return null;
    }
}
