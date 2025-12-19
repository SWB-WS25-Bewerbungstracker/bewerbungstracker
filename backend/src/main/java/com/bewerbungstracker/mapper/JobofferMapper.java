package com.bewerbungstracker.mapper;

import com.bewerbungstracker.entity.Joboffer;
import com.bewerbungstracker.jobofferinputview.JobofferInputDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(
        componentModel = "spring",
        uses = {
                CompanyMapper.class,
                ContactMapper.class,
                AppointmentMapper.class
        }
)
public interface JobofferMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "jobtitle", source = "jobofferName"),
            @Mapping(target = "description", source = "jobofferDescription"),
            @Mapping(target = "wagemin", source = "salaryMinimum"),
            @Mapping(target = "wagemax", source = "salaryMaximum"),
            @Mapping(target = "notes", source = "personalNotes"),
            @Mapping(target = "rating", ignore = true),

            @Mapping(target = "company", source = "dto"),
            @Mapping(target = "contact", source = "dto")
    })
    Joboffer fromInput(JobofferInputDTO dto);
}
