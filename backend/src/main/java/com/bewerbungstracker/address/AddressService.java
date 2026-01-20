package com.bewerbungstracker.address;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final AddressConverter converter;

    public Address createAddress(AddressInputDTO dto) {
        Address address = new Address();
        if (dto != null) {
             address = converter.toEntity(address, dto);
            return addressRepository.save(address);
        }
       return null;
    }

    public Address editAddress(AddressInputDTO input , Integer id) {
        Address address = null;
        if (id != null) {
            address = addressRepository.findById(id).orElseThrow(()
                    -> new IllegalArgumentException("Address id not found!"));
        }
        if (address == null && input != null) {
            address = createAddress(input);
        } else if(address != null && input == null){
            addressRepository.delete(address);
            address = null;
        } else if(address != null){
            address = converter.toEntity(address, input);
        }
        return address;
    }
}
