package com.bewerbungstracker.address;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Objects;
import java.util.stream.Stream;

@Data
@AllArgsConstructor
public class AddressInputDTO {
    //private Integer addressId; not sure if this is necessary
    private String addressStreet;
    private String addressStreetNumber;
    private String addressZipCode;
    private String addressCity;
    private String addressCountry;

    public boolean isEmpty() {
        return Stream.of(
                addressStreet,
                addressStreetNumber,
                addressZipCode,
                addressCity,
                addressCountry
        ).allMatch(Objects::isNull);
    }

}

