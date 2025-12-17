package com.bewerbungstracker.joboffer.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContactConverter {
    Contact toEntity(String firstname, String lastname,  String email, String phoneNo) {
        Contact contact = new Contact();
        contact.setFirstname(firstname);
        contact.setLastname(lastname);
        contact.setEmail(email);
        contact.setPhoneno(phoneNo);
        return contact;
    }
}
