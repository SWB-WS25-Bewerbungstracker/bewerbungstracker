package com.bewerbungstracker.joboffer;

import com.bewerbungstracker.appointment.AppointmentCleanView;
import com.bewerbungstracker.company.CompanyInputDTO;
import com.bewerbungstracker.joboffer.contact.ContactInputDTO;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
//@Builder
public class JobofferNestedInputDTO {
    private String jobofferName;
    private String jobofferDescription;
    //private Integer jobofferRating;
    private Integer salaryMinimum;
    private Integer salaryMaximum;
    private String jobofferNotes;
    //private String perks;
    private CompanyInputDTO company;
    private ContactInputDTO contact;

    //@Builder.Default
    private List<AppointmentCleanView> appointments = new ArrayList<>();
}
