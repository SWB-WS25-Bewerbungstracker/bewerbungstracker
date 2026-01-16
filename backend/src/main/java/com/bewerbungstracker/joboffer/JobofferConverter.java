package com.bewerbungstracker.joboffer;

import com.bewerbungstracker.address.Address;
import com.bewerbungstracker.joboffer.contact.Contact;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JobofferConverter {
    public Joboffer toEntity(Joboffer joboffer, JobofferNestedInputDTO dto, Address address, Contact contact) {
        joboffer.setJobtitle(dto.getJobofferName());
        joboffer.setDescription(dto.getJobofferDescription());
        joboffer.setNotes(dto.getJobofferNotes());
        joboffer.setWagemin(dto.getSalaryMinimum());
        joboffer.setWagemax(dto.getSalaryMaximum());
        joboffer.setCompanyname(dto.getCompanyName());
        joboffer.setEmpcount(dto.getCompanyEmployees());
        joboffer.setLogo(dto.getCompanyLogo());
        joboffer.setAddress(address);
        joboffer.setContact(contact);
        return joboffer;
    }
}
