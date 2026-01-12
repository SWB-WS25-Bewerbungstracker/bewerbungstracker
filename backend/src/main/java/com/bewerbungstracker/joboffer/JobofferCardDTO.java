package com.bewerbungstracker.joboffer;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class JobofferCardDTO {
    private Integer jobofferid;
    private String joboffername;
    private String companyname;
    // @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime nextapptdate;
}
