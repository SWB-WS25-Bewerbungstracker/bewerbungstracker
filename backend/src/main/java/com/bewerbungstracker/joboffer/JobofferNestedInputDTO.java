package com.bewerbungstracker.joboffer;

import com.bewerbungstracker.address.AddressInputDTO;
import com.bewerbungstracker.appointment.AppointmentCleanView;
import com.bewerbungstracker.joboffer.contact.ContactInputDTO;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
//@Builder
public class JobofferNestedInputDTO {
    private Integer jobofferId = null;
    private String jobofferName;
    private String jobofferDescription;
    //private Integer jobofferRating;
    private Integer salaryMinimum;
    private Integer salaryMaximum;
    private String jobofferNotes;
    //private String perks;
    private String companyName;
    private Integer companyEmployees;
    private String companyLogo;
    private AddressInputDTO companyAddress;
    private ContactInputDTO contact;

    private List<AppointmentCleanView> appointments = new ArrayList<>();
}
