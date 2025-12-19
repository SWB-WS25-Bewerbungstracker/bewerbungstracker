package com.bewerbungstracker.mapper;

import com.bewerbungstracker.entity.Contact;
import com.bewerbungstracker.jobofferinputview.JobofferInputDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    @Mappings({
            @Mapping(target = "id", source = "contactId"),
            @Mapping(target = "firstname", source = "contactFirstName"),
            @Mapping(target = "lastname", source = "contactLastName"),
            @Mapping(target = "email", source = "contactEmail"),
            @Mapping(target = "phoneno", source = "contactPhoneNumber")
    })
    Contact fromJobofferInput(JobofferInputDTO dto);
}
