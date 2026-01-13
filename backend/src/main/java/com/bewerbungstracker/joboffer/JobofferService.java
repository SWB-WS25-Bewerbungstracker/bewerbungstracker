package com.bewerbungstracker.joboffer;


import com.bewerbungstracker.address.Address;
import com.bewerbungstracker.address.AddressService;
import com.bewerbungstracker.appointment.Appointment;
import com.bewerbungstracker.appointment.AppointmentCleanView;
import com.bewerbungstracker.appointment.AppointmentService;
import com.bewerbungstracker.appuser.Appuser;
import com.bewerbungstracker.appuser.AppuserRepository;
import com.bewerbungstracker.joboffer.contact.Contact;
import com.bewerbungstracker.joboffer.contact.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JobofferService {
    private final JobofferRepository jobofferRepository;
    private final AppuserRepository appuserRepository;
    private final AppointmentService appointmentService;
    private final AddressService addressService;
    private final ContactService contactService;
    private final JobofferConverter jobofferConverter;

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
    //Gibt Liste aller Firmen in der Datenbank als DTO zurück
    public List<CompanySelectDTO> getCompanies(String email) {
        return jobofferRepository.getCompanySelection(email);
    }

    public void saveJobofferInput(JobofferNestedInputDTO jobofferInput, String userEmail) {
        Address address = addressService.createAddress(jobofferInput.getCompanyAddress());
        Contact contact = null;
        Joboffer joboffer = new Joboffer();

        Appuser appuser = appuserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found: " + userEmail));

        if(jobofferInput.getCompanyName() == null) {
            throw new IllegalArgumentException("Company name cannot be null or empty");
        }
        if (jobofferInput.getContact() != null) {
            contact = contactService.createContact(jobofferInput.getContact());
        }

        joboffer = jobofferConverter.toEntity(joboffer, jobofferInput, address, contact);
        joboffer.setAppuser(appuser);
        jobofferRepository.save(joboffer);

        //Save Appointments
        for(AppointmentCleanView a : jobofferInput.getAppointments()) {
            appointmentService.createAppointment(a, joboffer);
        }
    }

    public void editJoboffer (JobofferNestedInputDTO input, String email) {
        Joboffer joboffer = jobofferRepository.getJobofferById(input.getJobofferId());
        Integer contactId = null;
        Integer addressId = null;

        if (joboffer.getContact() != null) {
            contactId = joboffer.getContact().getId();
        }
        Contact contact = contactService.editContact(input.getContact(), contactId);
        if(joboffer.getAddress() != null) {
            addressId = joboffer.getAddress().getId();
        }
        Address address = addressService.editAddress(input.getCompanyAddress(), addressId);

        joboffer = jobofferConverter.toEntity(joboffer, input, address, contact);


        Set<Integer> incomingIds = input.getAppointments().stream()
                .map(AppointmentCleanView::getAppointmentId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        List<Appointment> existingAppointments = appointmentService.getAllAppointmentsByJoboffer(email,  joboffer.getId());
        //Check if existing Appointment was deleted and delete it
        for (Appointment a : existingAppointments) {
            if (!incomingIds.contains(a.getId())) {
                log.debug("Deleted Appointment: " + a.getId() + ", " + a.getAppointmentname());
                //TODO: delete Appoinmtent
            }
        }

        for(AppointmentCleanView appointment : input.getAppointments()) {
            if(appointment.getAppointmentId() == null) {
                appointmentService.createAppointment(appointment, joboffer);
            } else  {
                appointmentService.updateAppointment(appointment);
            }
        }
        jobofferRepository.save(joboffer);
    }
}
