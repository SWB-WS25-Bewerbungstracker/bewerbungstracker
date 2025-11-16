package com.bewerbungstracker.service;

import com.bewerbungstracker.dto.JobofferDetails;
import com.bewerbungstracker.entity.Appointment;
import com.bewerbungstracker.entity.Joboffer;
import com.bewerbungstracker.repository.JobofferRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class JobofferService {
    private final JobofferRepository jobofferRepository;
    private final CompanyService companyService;
    private final AppointmentService appointmentService;

    public JobofferDetails getJobofferDetails(Integer offerid) {
        Joboffer joboffer = jobofferRepository.getJobofferById(offerid);

        if (joboffer == null) {
            return null;
        }

        List<Appointment> appointments = appointmentService.getAppointmentsByJobofferId(offerid);
        System.out.println(appointments);
        LocalDateTime earliestAppt = appointmentService.getEarliestAppointment(appointments);

        return new JobofferDetails(joboffer.getId(), joboffer.getJobtitle(), joboffer.getCompany().getCompanyname(), earliestAppt);
    }


}
