package com.bewerbungstracker.joboffer.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContactConverter {
    Contact toEntity(ContactInputDTO input) {
        Contact contact = new Contact();
        contact.setFirstname(input.getContactFirstName());
        contact.setLastname(input.getContactLastName());
        contact.setEmail(input.getContactEmail());
        contact.setPhoneno(input.getContactPhoneNumber());
        return contact;
    }
}
