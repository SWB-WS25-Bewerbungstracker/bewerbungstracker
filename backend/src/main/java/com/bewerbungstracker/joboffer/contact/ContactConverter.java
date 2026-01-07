package com.bewerbungstracker.joboffer.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContactConverter {
    Contact toEntity(Contact contact, ContactInputDTO input) {
        contact.setFirstname(input.getContactFirstName());
        contact.setLastname(input.getContactLastName());
        contact.setEmail(input.getContactEmail());
        contact.setPhoneno(input.getContactPhoneNumber());
        return contact;
    }
}
