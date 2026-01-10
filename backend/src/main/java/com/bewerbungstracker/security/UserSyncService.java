package com.bewerbungstracker.security;

import com.bewerbungstracker.entity.Appuser;
import com.bewerbungstracker.repository.AppuserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserSyncService {
    @Autowired
    private AppuserRepository userRepository;

    @Transactional
    public void syncUser(Jwt jwt) {
        String email = jwt.getClaimAsString("email");
        String firstName = jwt.getClaimAsString("given_name");
        String lastName = jwt.getClaimAsString("family_name");

        if (email == null) {
            return;
        }

        // Check if user exists by email
        if (!userRepository.findByEmail(email).isPresent()) {
            Appuser newUser = new Appuser();
            newUser.setEmail(email);
            newUser.setFirstname(firstName != null ? firstName : "");
            newUser.setLastname(lastName != null ? lastName : "");
            // UserAddress can be null initially based on your schema
            userRepository.save(newUser);
        }
    }
}
