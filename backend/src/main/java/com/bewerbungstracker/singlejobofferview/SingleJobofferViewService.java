package com.bewerbungstracker.singlejobofferview;

import com.bewerbungstracker.entity.Appointment;
import com.bewerbungstracker.entity.Joboffer;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SingleJobofferViewService {
    private final SingleJobofferViewRepository singleJobofferViewRepository;

    public SingleJobofferViewDetails getJobofferDetails(Integer offerid) {
        Joboffer joboffer = singleJobofferViewRepository.getJobofferById(offerid);

        if (joboffer == null) {
            return null;
        }

        List<Appointment> appointments = singleJobofferViewRepository.getAppointmentsByJobofferId(offerid);

        List<AppointmentCleanView> appointmentCleanViews = new ArrayList<>();
        for (Appointment appointment : appointments) {
            appointmentCleanViews.add(new AppointmentCleanView(appointment));
        }

        return new SingleJobofferViewDetails(joboffer, appointmentCleanViews);
    }


}
