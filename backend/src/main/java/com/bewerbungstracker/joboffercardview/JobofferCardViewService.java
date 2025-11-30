package com.bewerbungstracker.joboffercardview;


import com.bewerbungstracker.repository.JobofferRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class JobofferCardViewService {
    private final JobofferRepository jobofferCardViewRepository;

    public List<JobofferCardViewDTO> getAllJoboffers() {
        return jobofferCardViewRepository.getAllJoboffers();
    }
}
