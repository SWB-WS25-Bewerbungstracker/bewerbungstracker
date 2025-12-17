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
    public Contact createContact(String firstname, String lastname,  String email, String phoneNo){
        Contact contact;
        //Frontend gives blank strings: If everything is blank nothing is saved.
        if(firstname.isBlank() && lastname.isBlank() && email.isBlank() && phoneNo.isBlank()){
            return null;
        }

        //Instead of blank strings safe null in Entity
        firstname = (firstname.isBlank() ? null : firstname);
        lastname = (lastname.isBlank() ? null : lastname);
        email = (email.isBlank() ? null : email);
        phoneNo = (phoneNo.isBlank() ? null : phoneNo);

        contact = contactConverter.toEntity(firstname, lastname, email, phoneNo);
        return contactRepository.save(contact);
    }
}
