package com.bewerbungstracker.joboffer;


import com.bewerbungstracker.address.Address;
import com.bewerbungstracker.address.AddressRepository;
import com.bewerbungstracker.appointment.Appointment;
import com.bewerbungstracker.appointment.AppointmentCleanView;
import com.bewerbungstracker.appointment.AppointmentRepository;
import com.bewerbungstracker.appointment.AppointmentService;
import com.bewerbungstracker.appuser.Appuser;
import com.bewerbungstracker.appuser.AppuserRepository;
import com.bewerbungstracker.company.Company;
import com.bewerbungstracker.company.CompanyRepository;
import com.bewerbungstracker.company.CompanyService;
import com.bewerbungstracker.joboffer.contact.Contact;
import com.bewerbungstracker.joboffer.contact.ContactRepository;
import com.bewerbungstracker.joboffer.contact.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JobofferService {
    private final JobofferRepository jobofferRepository;
    private final CompanyRepository companyRepository;
    private final ContactRepository contactRepository;
    private final AddressRepository addressRepository;
    private final AppointmentRepository appointmentRepository;
    private final AppuserRepository appuserRepository;
    private final CompanyService companyService;
    private final AppointmentService appointmentService;
    private final ContactService contactService;
    private final JobofferConverter jobofferConverter;
    private final JobofferInputMapper jobofferInputMapper;

    public List<JobofferCardDTO> getAllJoboffers(String email) {
        System.out.println("Email vom Token: " + email);
        List<JobofferCardDTO> result = jobofferRepository.getAllJoboffers(email);
        System.out.println("Size: " + result.size());
        return result;
    }

    public JobofferDTO getJobofferById(Integer offerid) {
        Joboffer joboffer = jobofferRepository.getJobofferById(offerid);

        if (joboffer == null) {
            return null;
        }

        List<Appointment> appointments = jobofferRepository.getAppointmentsByJobofferId(offerid);

        List<AppointmentCleanView> appointmentCleanViews = new ArrayList<>();
        for (Appointment appointment : appointments) {
            appointmentCleanViews.add(new AppointmentCleanView(appointment));
        }

        return new JobofferDTO(joboffer, appointmentCleanViews);
    }

    public void saveJobofferInput(JobofferNestedInputDTO jobofferInput, String userEmail) {
        //Joboffer joboffer = convertInputToJoboffer(jobofferInput);
        Company company;

        Appuser appuser = appuserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found: " + userEmail));
        //JobofferNestedInputDTO input = jobofferInputMapper.map(jobofferInput);
        JobofferNestedInputDTO input = jobofferInput;

        if(input.getCompany().getCompanyId() != null) {
            company = companyRepository
                    .findById(input.getCompany().getCompanyId())
                    .orElseThrow(()-> new IllegalArgumentException("Company not found: " + input.getCompany().getCompanyId()));
        }
        else {
            company = companyService.createCompany(input.getCompany());
        }
        Contact contact = contactService.createContact(input.getContact());

        Joboffer joboffer = jobofferConverter.toEntity(input, company, contact);
        joboffer.setAppuser(appuser);
        jobofferRepository.save(joboffer);

        //Save Appointments
        /*for(AppointmentCleanView a : jobofferInput.getAppointments()) {
            appointmentService.createAppointment(a, joboffer);
        }*/
        //convertInputToAppointment(jobofferInput, joboffer);
    }
/*
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

    private Joboffer convertInputToJoboffer(JobofferInputDTO jobofferInput) {
        if (jobofferInput == null) {
            throw new IllegalArgumentException("Something went wrong storing Input! JobofferInputDTO is null");
        }
        if (jobofferInput.getJobofferName().isBlank()) {
            throw new IllegalArgumentException("Name for joboffer is required!");
        }
*/
        /* -- Keeping Code in case requirements are changed, remove once they are set --
        Company company;
        if (jobofferInput.getCompanyId() != null) {
            company = companyRepository.findById(jobofferInput.getCompanyId()).orElse(null);
        } else {
            company = convertInputToCompany(jobofferInput);
            if (company != null) {
                companyRepository.save(company);
            }
        }
        */
/*
        Company company = convertInputToCompany(jobofferInput);
        companyRepository.save(company);


        Contact contact = convertInputToContact(jobofferInput);
        if (contact != null) {
            contactRepository.save(contact);
        }

        Joboffer joboffer = new Joboffer();
        Objects.requireNonNull(jobofferInput.getJobofferName());
        assignIfNotNull(jobofferInput.getJobofferName(), joboffer::setJobtitle);
        assignIfNotNull(jobofferInput.getJobofferDescription(), joboffer::setDescription);
        assignIfNotNull(jobofferInput.getSalaryMinimum(), joboffer::setWagemin);
        assignIfNotNull(jobofferInput.getSalaryMaximum(), joboffer::setWagemax);
        assignIfNotNull(jobofferInput.getJobofferNotes(), joboffer::setNotes);
        assignIfNotNull(company, joboffer::setCompany);
        assignIfNotNull(contact, joboffer::setContact);
        log.info("joboffer value is {}", joboffer);

        return joboffer;
    }

    private Company convertInputToCompany(JobofferInputDTO jobofferInput) {
        Address address = convertInputToAddress(jobofferInput);

        if (jobofferInput.getCompanyName().isBlank()) {
            throw new IllegalArgumentException("Company name must be provided.");
        }

        if (address != null) {
            addressRepository.save(address);
        }

        Company company = new Company();

        assignIfNotNull(jobofferInput.getCompanyName(), company::setCompanyname);
        assignIfNotNull(jobofferInput.getCompanyEmployees(), company::setEmpcount);
        assignIfNotNull(address, company::setAddress);

        return company;
    }

    private Address convertInputToAddress(JobofferInputDTO jobofferInput) { */
        /* -- Keeping Code in case requirements are changed, remove once they are set --

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
        */

        // If all information is blank, don't create new address entity
/*        if (jobofferInput.getAddressStreetNumber().isBlank() &&
                jobofferInput.getAddressStreet().isBlank() &&
                jobofferInput.getAddressCity().isBlank() &&
                jobofferInput.getAddressZipCode().isBlank() &&
                jobofferInput.getAddressCountry().isBlank()) {
            return null;
        }

        Address address = new Address();

        assignIfNotNull(jobofferInput.getAddressStreetNumber(), address::setStreetno);
        assignIfNotNull(jobofferInput.getAddressStreet(), address::setStreet);
        assignIfNotNull(jobofferInput.getAddressCity(), address::setCity);
        assignIfNotNull(jobofferInput.getAddressZipCode(), address::setZip);
        assignIfNotNull(jobofferInput.getAddressCountry(), address::setCountry);

        return address;
    }

    private Contact convertInputToContact(JobofferInputDTO jobofferInput) {
        // If all information is blank, don't create new contact entity
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
        for (AppointmentCleanView appointmentToStore : jobofferInput.getAppointments()) {
            appointmentRepository.save(appointmentDTOToEntity(appointmentToStore, joboffer));
        }
    }

    private Appointment appointmentDTOToEntity(AppointmentCleanView appointmentToStore, Joboffer joboffer) {
        Appointment appointment = new Appointment();

        appointment.setAppointmentdate(appointmentToStore.getAppointmentDate());
        appointment.setAppointmentname(appointmentToStore.getAppointmentName());
        appointment.setJoboffer(joboffer);

        return appointment;
    }*/
}
