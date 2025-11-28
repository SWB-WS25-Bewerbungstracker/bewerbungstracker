package com.bewerbungstracker.jobofferinputview;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class JobofferInputDTO {
    // Joboffer related information
    private String jobofferName;
    private String jobofferDescription;
    private Integer salaryMinimum;
    private Integer salaryMaximum;
    private String personalNotes;
    //private String perks;

    // Company related information
    private Integer companyId;
    private String companyName;
    private Integer numberOfEmployees;

    // Company address information
    private String addressStreet;
    private String addressStreetNumber;
    private String addressPostcode;
    private String addressCity;
    private String addressCountry;
    //private String distanceLength;
    //private String distanceTime;

    // Contact related information
    private String contactFirstName;
    private String contactLastName;
    private String contactEmail;
    private String contactPhoneNumber;

    // Appointment related information
    private String appointmentDate;
    private String appointmentTime;
}
