package com.bewerbungstracker.address;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressInputDTO {
    //private Integer addressId; not sure if this is necessary
    private String addressStreet;
    private String addressStreetNumber;
    private String addressZipCode;
    private String addressCity;
    private String addressCountry;
}
