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
        contact = contactConverter.toEntity(input);
        return contactRepository.save(contact);
    }
}
