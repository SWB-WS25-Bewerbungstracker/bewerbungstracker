package com.bewerbungstracker.joboffer;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class JobofferDTO {
    private Joboffer joboffer;
    private List<AppointmentCleanView> appointments;
}
