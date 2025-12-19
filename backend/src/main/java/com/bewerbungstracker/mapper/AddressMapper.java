package com.bewerbungstracker.mapper;

import com.bewerbungstracker.entity.Address;
import com.bewerbungstracker.jobofferinputview.JobofferInputDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    @Mappings({
            @Mapping(target = "id", source = "addressId"),
            @Mapping(target = "street", source = "addressStreet"),
            @Mapping(target = "streetno", source = "addressStreetNumber"),
            @Mapping(target = "city", source = "addressCity"),
            @Mapping(target = "zip", source = "addressZipCode"),
            @Mapping(target = "country", source = "addressCountry")
    })
    Address fromJobofferInput(JobofferInputDTO dto);
}
