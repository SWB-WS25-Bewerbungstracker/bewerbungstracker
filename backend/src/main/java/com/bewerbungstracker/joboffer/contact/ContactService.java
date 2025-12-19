package com.bewerbungstracker.joboffer.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ContactService {
    private final ContactRepository contactRepository;
    private final ContactConverter contactConverter;
    public Contact createContact(ContactInputDTO input) {
        Contact contact;
        //Frontend gives blank strings: If everything is blank nothing is saved.
        if(input.getContactFirstName() == null && input.getContactLastName() == null && input.getContactEmail() == null && input.getContactPhoneNumber() == null){
            return null;
        }

        //Instead of blank strings safe null in Entity
        input.setContactFirstName((input.getContactFirstName()));
        input.setContactLastName((input.getContactLastName()));
        input.setContactEmail((input.getContactEmail()));
        input.setContactPhoneNumber((input.getContactPhoneNumber()));


        contact = contactConverter.toEntity(input);
        return contactRepository.save(contact);
    }
}
