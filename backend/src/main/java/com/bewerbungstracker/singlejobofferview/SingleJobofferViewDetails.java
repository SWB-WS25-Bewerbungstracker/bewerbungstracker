package com.bewerbungstracker.singlejobofferview;

import com.bewerbungstracker.entity.Joboffer;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SingleJobofferViewDetails {
    private Joboffer joboffer;
    private List<AppointmentCleanView> appointments;
}
