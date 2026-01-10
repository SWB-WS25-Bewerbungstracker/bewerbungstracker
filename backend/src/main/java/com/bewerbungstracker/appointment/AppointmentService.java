package com.bewerbungstracker.appointment;


import com.bewerbungstracker.joboffer.Joboffer;
import com.bewerbungstracker.joboffer.JobofferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final JobofferRepository jobofferRepository;
    private final AppointmentConverter appointmentConverter;

    public List<AppointmentDetailDTO> getAllAppointments() {
        return appointmentRepository.getAppointments();
    }

    public Appointment createAppointment (AppointmentCleanView dto, Joboffer joboffer) {
        Appointment appointment = appointmentConverter.toEntity(dto, joboffer);
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment createAppointment (AppointmentInputDTO dto, String email) {
        Joboffer joboffer = jobofferRepository.findById(dto.getJobofferID()).orElseThrow(
                () -> new IllegalArgumentException("Joboffer not found: " + dto.getJobofferID()));

        if(!joboffer.getAppuser().getEmail().equals(email)) {                       //is User not the Owner of theis Joboffer
            throw new IllegalArgumentException("Email already exists: " + email);
        }
        Appointment appointment = appointmentConverter.toEntity(dto, joboffer);
        return appointmentRepository.save(appointment);
    }

}
