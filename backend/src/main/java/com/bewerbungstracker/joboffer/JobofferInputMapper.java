package com.bewerbungstracker.joboffer;

import com.bewerbungstracker.address.AddressInputDTO;
import com.bewerbungstracker.company.CompanyInputDTO;
import com.bewerbungstracker.joboffer.contact.ContactInputDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.bewerbungstracker.utilities.InputNormalizer.normalize;

@Component
@RequiredArgsConstructor
public class JobofferInputMapper {
    JobofferNestedInputDTO map(JobofferInputDTO input) {
        return JobofferNestedInputDTO.builder()
                .jobofferName(normalize(input.getJobofferName()))
                .jobofferDescription(normalize(input.getJobofferDescription()))
                .salaryMinimum(normalize(input.getSalaryMinimum()))
                .salaryMaximum(normalize(input.getSalaryMaximum()))
                .jobofferNotes(normalize(input.getJobofferNotes()))
                .company(new CompanyInputDTO(
                        normalize(input.getCompanyId()),
                        normalize(input.getCompanyName()),
                        normalize(input.getCompanyEmployees()),
                        normalize(input.getCompanyLogo()),
                        new AddressInputDTO(
                                normalize(input.getAddressStreet()),
                                normalize(input.getAddressStreetNumber()),
                                normalize(input.getAddressZipCode()),
                                normalize(input.getAddressCity()),
                                normalize(input.getAddressCountry())
                        )
                ))
                .contact(new ContactInputDTO(
                        normalize(input.getContactFirstName()),
                        normalize(input.getContactLastName()),
                        normalize(input.getContactEmail()),
                        normalize(input.getContactPhoneNumber())
                        )
                )
                .build();
    }
}
