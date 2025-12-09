package com.bewerbungstracker.joboffercardview;


import com.bewerbungstracker.repository.JobofferRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class JobofferCardViewService {
    private final JobofferRepository jobofferCardViewRepository;

    public List<JobofferCardViewDTO> getAllJoboffers(String email) {
        System.out.println("Email vom Token: " + email);
        List<JobofferCardViewDTO> result = jobofferCardViewRepository.getAllJoboffers(email);
        System.out.println("Size: " + result.size());
        return result;
    }
}
