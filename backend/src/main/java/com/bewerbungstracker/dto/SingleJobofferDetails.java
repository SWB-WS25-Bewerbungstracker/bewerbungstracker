package com.bewerbungstracker.dto;

import com.bewerbungstracker.entity.Joboffer;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SingleJobofferDetails {
    private Joboffer joboffer;
    private List<AppointmentCleanView> appointments;
}
