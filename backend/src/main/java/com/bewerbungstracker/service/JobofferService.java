package com.bewerbungstracker.service;

import com.bewerbungstracker.dto.AppointmentCleanView;
import com.bewerbungstracker.dto.JobofferDetails;
import com.bewerbungstracker.dto.SingleJobofferDetails;
import com.bewerbungstracker.entity.Appointment;
import com.bewerbungstracker.entity.Joboffer;
import com.bewerbungstracker.repository.JobofferRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class JobofferService {
    private final JobofferRepository jobofferRepository;
    private final AppointmentService appointmentService;

    public List<JobofferDetails> getAllJoboffers() {
        return jobofferRepository.getAllJoboffers();
    }

    public SingleJobofferDetails getJobofferDetails(Integer offerid) {
        Joboffer joboffer = jobofferRepository.getJobofferById(offerid);

        if (joboffer == null) {
            return null;
        }

        List<Appointment> appointments = appointmentService.getAppointmentsByJobofferId(offerid);

        List<AppointmentCleanView> appointmentCleanViews = new ArrayList<>();
        for (Appointment appointment : appointments) {
            appointmentCleanViews.add(new AppointmentCleanView(appointment));
        }

        return new SingleJobofferDetails(joboffer, appointmentCleanViews);
    }


}
