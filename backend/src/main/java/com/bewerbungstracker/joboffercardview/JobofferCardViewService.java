package com.bewerbungstracker.joboffercardview;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class JobofferCardViewService {
    private final JobofferCardViewRepository jobofferCardViewRepository;

    public List<JobofferCardViewDTO> getAllJoboffers() {
        return jobofferCardViewRepository.getAllJoboffers();
    }
}
