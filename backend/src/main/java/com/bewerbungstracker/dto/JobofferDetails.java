package com.bewerbungstracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class JobofferDetails {
    private Integer jobofferid;
    private String joboffername;
    private String companyname;
    private LocalDateTime nextapptdate;
}
