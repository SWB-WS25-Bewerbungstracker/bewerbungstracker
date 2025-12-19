package com.bewerbungstracker.mapper;

import com.bewerbungstracker.entity.Appointment;
import com.bewerbungstracker.singlejobofferview.AppointmentCleanView;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    @Mappings({
            @Mapping(target = "joboffer", ignore = true),
            @Mapping(target = "appointmentdate", source = "appointmentDate"),
            @Mapping(target = "appointmentname", source = "appointmentName")
    })
    Appointment fromCleanView(AppointmentCleanView view);
}
