package com.bewerbungstracker.address;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AddressConverter {
    public Address toEntity(AddressInputDTO input) {
        Address address = new Address();
        address.setStreet(input.getAddressStreet());
        address.setStreetno(input.getAddressStreetNumber());
        address.setCity(input.getAddressCity());
        address.setZip(input.getAddressZipCode());
        address.setCountry(input.getAddressCountry());
    return address;
    }
}
