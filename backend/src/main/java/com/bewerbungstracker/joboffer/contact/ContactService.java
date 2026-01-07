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
        Contact contact = new Contact();
        contact = contactConverter.toEntity(contact, input);
        return contactRepository.save(contact);
    }

    public Contact editContact(ContactInputDTO input, Integer id) {
        Contact contact = null;
        //if contact already exists set contact
        if (id != null) {
            contact = contactRepository.findById(id).orElseThrow(
                    ()-> new IllegalArgumentException("Contact not Found: " + id)
            );
        }

        if (input == null && contact != null) { //contact data was deleted
            contactRepository.delete(contact);
            contact = null;
        } else if (input != null && contact == null) {  //contact created
            contact = createContact(input);
        } else if (input != null && contact != null) {  //contact updated
            contactConverter.toEntity(contact, input);
        }

        return contact;
    }
}
