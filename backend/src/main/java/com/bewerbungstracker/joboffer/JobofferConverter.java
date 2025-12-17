package com.bewerbungstracker.joboffer;

import com.bewerbungstracker.appointment.Appointment;
import com.bewerbungstracker.company.Company;
import com.bewerbungstracker.joboffer.contact.Contact;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JobofferConverter {
    public Joboffer toEntity(JobofferInputDTO dto, Company company, Contact contact) {
        Joboffer joboffer = new Joboffer();
        joboffer.setJobtitle(dto.getJobofferName());
        joboffer.setDescription(dto.getJobofferDescription());
        joboffer.setNotes(dto.getJobofferNotes());
        joboffer.setWagemin(dto.getSalaryMinimum());
        joboffer.setWagemax(dto.getSalaryMaximum());
        joboffer.setCompany(company);
        joboffer.setContact(contact);
        return joboffer;
    }
}
