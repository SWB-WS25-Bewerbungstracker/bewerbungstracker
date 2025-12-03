package com.bewerbungstracker.jobofferinputview;

import com.bewerbungstracker.entity.*;
import com.bewerbungstracker.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.function.Consumer;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class JobofferInputViewService {
    private final JobofferRepository jobofferRepository;
    private final CompanyRepository companyRepository;
    private final ContactRepository contactRepository;
    private final AddressRepository addressRepository;
    private final AppointmentRepository appointmentRepository;
    private final AppuserRepository appuserRepository;

    private static void assignIfNotNull(String value, Consumer<String> setter) {
        if (value != null && !value.isBlank()) {
            setter.accept(value);
        }
    }

    private static <T> void assignIfNotNull(T value, Consumer<T> setter) {
        if (value != null) {
            setter.accept(value);
        }
    }

    public void saveJobofferInput(JobofferInputDTO jobofferInput, String userEmail) {
        Joboffer joboffer = convertInputToJoboffer(jobofferInput);
        Appuser appuser = appuserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found: " + userEmail));
        joboffer.setAppuser(appuser);
        jobofferRepository.save(joboffer);
        convertInputToAppointment(jobofferInput, joboffer);
    }

    private Joboffer convertInputToJoboffer(JobofferInputDTO jobofferInput) {
        if (jobofferInput == null) {
            throw new IllegalArgumentException("Something went wrong storing Input! JobofferInputDTO is null");
        }
        if (jobofferInput.getJobofferName().isBlank()) {
            throw new IllegalArgumentException("Name for joboffer is required!");
        }

        Company company;
        if (jobofferInput.getCompanyId() != null) {
            company = companyRepository.findById(jobofferInput.getCompanyId()).orElse(null);
        } else {
            company = convertInputToCompany(jobofferInput);
            if (company != null) {
                companyRepository.save(company);
            }
        }

        Contact contact = convertInputToContact(jobofferInput);
        if (contact != null) {
            contactRepository.save(contact);
        }

        Joboffer joboffer = new Joboffer();

        assignIfNotNull(jobofferInput.getJobofferName(), joboffer::setJobtitle);
        assignIfNotNull(jobofferInput.getJobofferDescription(), joboffer::setDescription);
        assignIfNotNull(jobofferInput.getSalaryMinimum(), joboffer::setWagemin);
        assignIfNotNull(jobofferInput.getSalaryMaximum(), joboffer::setWagemax);
        assignIfNotNull(jobofferInput.getPersonalNotes(), joboffer::setNotes);
        assignIfNotNull(company, joboffer::setCompany);
        assignIfNotNull(contact, joboffer::setContact);
        log.info("joboffer value is {}", joboffer);

        return joboffer;
    }

    private Company convertInputToCompany(JobofferInputDTO jobofferInput) {
        Address address = convertInputToAddress(jobofferInput);

        if (jobofferInput.getCompanyName().isBlank()) {
            if (jobofferInput.getNumberOfEmployees() != null || address != null) {
                throw new IllegalArgumentException(
                        "Company name must be provided if other company-related information is given.");
            }
            return null;
        }

        if (address != null) {
            addressRepository.save(address);
        }

        Company company = new Company();

        assignIfNotNull(jobofferInput.getCompanyName(), company::setCompanyname);
        assignIfNotNull(jobofferInput.getNumberOfEmployees(), company::setEmpcount);
        assignIfNotNull(address, company::setAddress);

        return company;
    }

    private Address convertInputToAddress(JobofferInputDTO jobofferInput) {
        boolean allNull = jobofferInput.getAddressStreetNumber().isBlank() &&
                jobofferInput.getAddressStreet().isBlank() &&
                jobofferInput.getAddressCity().isBlank() &&
                jobofferInput.getAddressPostcode().isBlank();

        boolean allNotNull = !jobofferInput.getAddressStreetNumber().isBlank() &&
                !jobofferInput.getAddressStreet().isBlank() &&
                !jobofferInput.getAddressCity().isBlank() &&
                !jobofferInput.getAddressPostcode().isBlank();

        // If all values are null, then the address is null
        if (allNull) {
            return null;
        }

        // If only some values contain data, then throw error due to missing required
        // information
        if (!allNotNull) {
            throw new IllegalArgumentException(
                    "All address fields but country must be provided if other address related information is given.");
        }

        Address address = new Address();

        address.setStreetno(jobofferInput.getAddressStreetNumber());
        address.setStreet(jobofferInput.getAddressStreet());
        address.setCity(jobofferInput.getAddressCity());
        address.setZip(jobofferInput.getAddressPostcode());
        assignIfNotNull(jobofferInput.getAddressCountry(), address::setCountry);

        return address;
    }

    private Contact convertInputToContact(JobofferInputDTO jobofferInput) {
        if (jobofferInput.getContactFirstName().isBlank() &&
                jobofferInput.getContactLastName().isBlank() &&
                jobofferInput.getContactEmail().isBlank() &&
                jobofferInput.getContactPhoneNumber().isBlank()) {
            return null;
        }

        Contact contact = new Contact();

        assignIfNotNull(jobofferInput.getContactFirstName(), contact::setFirstname);
        assignIfNotNull(jobofferInput.getContactLastName(), contact::setLastname);
        assignIfNotNull(jobofferInput.getContactEmail(), contact::setEmail);
        assignIfNotNull(jobofferInput.getContactPhoneNumber(), contact::setPhoneno);

        return contact;
    }

    private void convertInputToAppointment(JobofferInputDTO jobofferInput, Joboffer joboffer) {
        if (jobofferInput.getAppointmentDate().isEmpty()) {
            return;
        }

        for (LocalDateTime appointmentToStore : jobofferInput.getAppointmentDate()) {
            Appointment appointment = new Appointment();

            appointment.setAppointmentdate(appointmentToStore);
            appointment.setJoboffer(joboffer);

            appointmentRepository.save(appointment);
        }
    }
}
