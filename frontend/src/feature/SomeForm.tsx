import {Stack, Typography, Button, Box} from "@mui/material"
import {useForm} from "react-hook-form";
import {FormInputText} from "./FormInputText.tsx";
import FormSection from "./FormSection.tsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema , type AddressFormValues, AddressForm } from "./AddressForm.tsx";
import applicationTrackerApi from "../services/api.ts";
import axios from "axios";

import { useState } from "react";
import AddAppointments from "../components/AddAppointments.tsx";
import {type Appointment, removeIdForNewAppointments} from "../functions/parseDate";
import {FormInputAutocomplete} from "./FormInputAutocomplete.tsx";
import {useCompanyData} from "../functions/getAllCompaniesAndId.tsx";

//Setting up  some basic validation with zod
const validationSchema = z.object({
    jobofferName: z.string("Pflichtfeld").min(1, "Pflichtfeld"),
    jobofferDescription: z.string().optional(),
    company: z.object({
        companyId: z.number().int().optional(),
        companyName: z.string("Pflichtfeld").min(1, "Pflichtfeld"),
        companyEmployees: z.number().int().min(0).optional(),
        companyLogo: z.string().optional(),
        companyAddress: AddressSchema.optional()

        }),
    contact: z.object({
        contactFirstName: z.string().optional(),
        contactLastName: z.string().optional(),
        contactPhoneNumber: z.string().optional(),
        contactEmail: z.string().optional(),
    }).optional(),
    distanceLength: z.string().optional(),
    distanceTime: z.string().optional(),
})

//interface type for the useform and data (this structure will be sent to the backend but some values maybe undefined)
interface FormValues {
    jobofferName: string;
    jobofferDescription?: string;
    company: {
        companyId?: number;
        companyName: string;
        companyEmployees?: number;
        companyLogo?: string;
        companyAddress?: AddressFormValues;
    };
    contact?: {
        contactFirstName?: string;
        contactLastName?: string;
        contactPhoneNumber?: string;
        contactEmail?: string;
    };
    distanceLength?: string;
    distanceTime?: string;
}

//Test form
const SomeForm = () => {
    const { handleSubmit, control, trigger, setValue, watch } = useForm<FormValues>({
        resolver: zodResolver(validationSchema),
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            jobofferName: "",
            company: {
                companyName: "",
            },
        },
    });

    // Verwendung des Custom Hooks, um die Firmen- und Ladezustandsdaten zu holen
    const { listOfCompanies, loadingCompanies } = useCompanyData();

    const [appointments, setAppointments] =useState<Appointment[]>([]);

    //watch input of company to disable other company fields if company matches existing company.
    const companyName = watch("company.companyName").trim();
    const companyId   = watch("company.companyId");
    const companyMatched =
        !!companyId ||
        listOfCompanies.some(c => c.name === companyName);

    const onSubmit = async (data: FormValues) => {
        //remove empty contact object
        if (data.contact && Object.values(data.contact).every(v => v === undefined)) {
            delete data.contact;
        }
        //remove empty address object
        if (data.company.companyAddress && Object.values(data.company.companyAddress).every(v => v === undefined)) {
            delete data.company.companyAddress;
        }

        data = JSON.parse(JSON.stringify(data)); //remove undefined fields

        const payload = {
            ...data,
            appointments: appointments.length > 0 ? removeIdForNewAppointments(appointments) : [],
        }
        console.debug("onSubmit", payload); //log payload data
        //try Post
        try {
            const response = await applicationTrackerApi.post("/joboffer/inputForm", payload,
                {
                headers: {
                    "Content-Type": "application/json",
                    },
                }
            );
            console.debug(response.status)
        } catch(error) {
            // Axios-Fehlerbehandlung
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    padding: 2,
                }}
            >
                <Typography variant="h4">Some Form</Typography>

                <FormSection title={"Stelle"}>
                    <FormInputText name={"jobofferName"} control={control} trigger={trigger} label={"Titel der Stelle"}/>
                    <FormInputText name={"jobofferDescription"} control={control} trigger={trigger} label={"Kurzbeschreibung der Stelle"} minRows={5}/>
                </FormSection>

                <FormSection title={"Firma"} direction={"row"}>
                    <FormInputAutocomplete name={"company.companyName"}
                                           idName={"company.companyId"}
                                           control={control}
                                           trigger={trigger}
                                           label={"Name der Firma"}
                                           options={listOfCompanies.map(
                                               (company) => (
                                                   {label: company.name, id: company.id}
                                               )
                                           )}
                                           setValue={setValue}
                                           loading={loadingCompanies}
                                           sx={{flex: "0 0 70%"}}
                    />
                    <FormInputText name ={"company.companyEmployees"}
                                   control={control}
                                   trigger={trigger}
                                   label={"Anzahl Mitarbeiter"}
                                   type={"number"}
                                   disabled={companyMatched}
                    />
                </FormSection>

                <AddressForm control={control} trigger={trigger} baseName={"company.companyAddress"}/>

                <FormSection title={"Distanz"}>
                    <FormInputText name={"distanceLength"} control={control} trigger={trigger} label={"Strecke"}/>
                    <FormInputText name ={"distanceTime"} control={control} trigger={trigger} label={"Fahrtzeit"}/>
                </FormSection>

                <FormSection title={"Kontakt"}>
                    <Stack
                        direction="row"
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        <FormInputText name={"contact.contactFirstName"} control={control} trigger={trigger} label={"Vorname"}/>
                        <FormInputText name ={"contact.contactLastName"} control={control} trigger={trigger} label={"Nachname"}/>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        <FormInputText name={"contact.contactPhoneNumber"} control={control} trigger={trigger} label={"Telefonnummer"}/>
                        <FormInputText name ={"contact.contactEmail"} control={control} trigger={trigger} label={"Email"}/>
                    </Stack>
                </FormSection>

                <AddAppointments
                    appointments={appointments}
                    onAppointmentChange={setAppointments}/>
                <Button type="submit" variant={"contained"} sx={{ mt: 2, display: "block" }}>
                    Submit
                </Button>
            </Box>
        </form>
    );
};
export default SomeForm;