package com.bewerbungstracker.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class JobofferDetails {
    private Integer jobofferid;
    private String joboffername;
    private String companyname;
    // @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime nextapptdate;
}
