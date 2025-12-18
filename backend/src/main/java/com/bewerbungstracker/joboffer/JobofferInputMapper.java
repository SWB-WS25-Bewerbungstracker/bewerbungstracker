package com.bewerbungstracker.joboffer;

import com.bewerbungstracker.address.AddressInputDTO;
import com.bewerbungstracker.company.CompanyInputDTO;
import com.bewerbungstracker.joboffer.contact.ContactInputDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JobofferInputMapper {
    JobofferNestedInputDTO map(JobofferInputDTO input) {
        return JobofferNestedInputDTO.builder()
                .jobofferName(input.getJobofferName())
                .jobofferDescription(input.getJobofferDescription())
                .salaryMinimum(input.getSalaryMinimum())
                .salaryMaximum(input.getSalaryMaximum())
                .jobofferNotes(input.getJobofferNotes())
                .company(new CompanyInputDTO(
                        input.getCompanyId(),
                        input.getCompanyName(),
                        input.getCompanyEmployees(),
                        input.getCompanyLogo(),
                        new AddressInputDTO(
                                input.getAddressStreet(),
                                input.getAddressStreetNumber(),
                                input.getAddressZipCode(),
                                input.getAddressCity(),
                                input.getAddressCountry()
                        )
                ))
                .contact(new ContactInputDTO(
                        input.getContactFirstName(),
                        input.getContactLastName(),
                        input.getContactEmail(),
                        input.getContactPhoneNumber()
                        )
                )
                .build();
    }
}
