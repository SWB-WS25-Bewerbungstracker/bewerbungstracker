package com.bewerbungstracker.mapper;

import com.bewerbungstracker.entity.Company;
import com.bewerbungstracker.jobofferinputview.JobofferInputDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(
        componentModel = "spring",
        uses = AddressMapper.class
)
public interface CompanyMapper {

    @Mappings({
            @Mapping(target = "id", source = "companyId"),
            @Mapping(target = "companyname", source = "companyName"),
            @Mapping(target = "empcount", source = "companyEmployees"),
            @Mapping(target = "logo", source = "companyLogo"),
            @Mapping(target = "address", source = "dto")
    })
    Company fromJobofferInput(JobofferInputDTO dto);
}
