package com.bewerbungstracker.jobofferinputview;

import com.bewerbungstracker.singlejobofferview.AppointmentCleanView;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class JobofferInputDTO {
    // Joboffer related information
    private String jobofferName;
    private String jobofferDescription;
    //private Integer jobofferRating;
    private Integer salaryMinimum;
    private Integer salaryMaximum;
    private String personalNotes;
    //private String perks;

    // Company related information
    private Integer companyId;
    private String companyName;
    private Integer companyEmployees;
    private String companyLogo;

    // Company address information
    private Integer addressId;
    private String addressStreet;
    private String addressStreetNumber;
    private String addressZipCode;
    private String addressCity;
    private String addressCountry;
    //private String distanceLength;
    //private String distanceTime;

    // Contact related information
    private Integer contactId;
    private String contactFirstName;
    private String contactLastName;
    private String contactEmail;
    private String contactPhoneNumber;

    // Appointment related information
    private List<AppointmentCleanView> appointments;
}
