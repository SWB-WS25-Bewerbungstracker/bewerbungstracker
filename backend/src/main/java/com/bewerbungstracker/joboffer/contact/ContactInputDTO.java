package com.bewerbungstracker.joboffer.contact;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContactInputDTO {
    //private Integer contactId;
    private String contactFirstName;
    private String contactLastName;
    private String contactEmail;
    private String contactPhoneNumber;
}
