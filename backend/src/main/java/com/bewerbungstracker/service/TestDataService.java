package com.bewerbungstracker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.bewerbungstracker.entity.TestData;
import com.bewerbungstracker.repository.TestDataRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestDataService{
    private final TestDataRepository testDataRepository;

    public List<Integer> getTestNumbers() {
        return testDataRepository.findAll().stream().map(TestData::getTestNumber).collect(Collectors.toList());
    }
}