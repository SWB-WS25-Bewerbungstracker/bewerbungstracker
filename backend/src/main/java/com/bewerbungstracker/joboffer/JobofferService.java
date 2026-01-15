package com.bewerbungstracker.joboffer;


import com.bewerbungstracker.appointment.Appointment;
import com.bewerbungstracker.appointment.AppointmentCleanView;
import com.bewerbungstracker.appointment.AppointmentService;
import com.bewerbungstracker.appuser.Appuser;
import com.bewerbungstracker.appuser.AppuserRepository;
import com.bewerbungstracker.company.Company;
import com.bewerbungstracker.company.CompanyRepository;
import com.bewerbungstracker.company.CompanyService;
import com.bewerbungstracker.joboffer.contact.Contact;
import com.bewerbungstracker.joboffer.contact.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JobofferService {
    private final JobofferRepository jobofferRepository;
    private final CompanyRepository companyRepository;
    private final AppuserRepository appuserRepository;
    private final CompanyService companyService;
    private final AppointmentService appointmentService;
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

    public void saveJobofferInput(JobofferNestedInputDTO jobofferInput, String userEmail) {
        Company company;
        Contact contact = null;
        Appuser appuser = appuserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found: " + userEmail));

        if(jobofferInput.getCompany().getCompanyId() != null) {
            company = companyRepository
                    .findById(jobofferInput.getCompany().getCompanyId())
                    .orElseThrow(()-> new IllegalArgumentException("Company not found: " + jobofferInput.getCompany().getCompanyId()));
        }
        else {
            company = companyService.createCompany(jobofferInput.getCompany());
        }
        if (jobofferInput.getContact() != null) {
            contact = contactService.createContact(jobofferInput.getContact());
        }

        Joboffer joboffer = jobofferConverter.toEntity(jobofferInput, company, contact);
        joboffer.setAppuser(appuser);
        jobofferRepository.save(joboffer);

        //Save Appointments
        for(AppointmentCleanView a : jobofferInput.getAppointments()) {
            appointmentService.createAppointment(a, joboffer);
        }
    }

    public void deleteJobofferById (Integer id) {
        Optional<Joboffer> joboffer = jobofferRepository.findById(id);
        if (joboffer.isPresent()) { jobofferRepository.delete(joboffer.get());}

        List<Appointment> appointments = jobofferRepository.getAppointmentsByJobofferId(id);
        for (Appointment appointment : appointments) {
            // appointmentService.deleteAppointment(appointment); // Noch nicht implementiert
            log.debug("Deleted Appointment: " + appointment.getId() + ", " + appointment.getAppointmentname());
        }
    }
}
