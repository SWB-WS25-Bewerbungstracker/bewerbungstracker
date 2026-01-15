import { Dayjs } from "dayjs";
import applicationTrackerApi from "../services/api";


export async function sendButtonClicked(
    date: Dayjs|null,
    time: Dayjs|null,
    appointmentName:string,
    selectedJoboffer:number|null,
    closeDialog:()=> void,
    setErrorMessage: (msg: string) => void

) {
    if (!date || !time || !appointmentName || selectedJoboffer === null) {
        setErrorMessage("Alles ausfüllen bitte!"); // Fehler setzen
        return;
    }

    setErrorMessage("");

    const carrotForRabbit = date
        .hour(time.hour())
        .minute(time.minute())
        .second(0)
        .toISOString();

    console.debug("Ich sende ans Backend:", {
        appointmentdate: carrotForRabbit,
        appointmentname: appointmentName,
        jobofferID: selectedJoboffer,
    });

    try{
        await applicationTrackerApi.post("/appointments",{
            appointmentdate: carrotForRabbit,
            appointmentname: appointmentName,
            jobofferID: selectedJoboffer
        });

        closeDialog();
        window.location.reload();

    }   catch(err) {
        console.debug(err)
        alert("Der Hase hat die Karotte nicht geliefert :(")
    }

}
