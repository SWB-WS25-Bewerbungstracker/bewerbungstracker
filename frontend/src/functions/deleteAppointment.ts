import applicationTrackerApi from "../services/api";

export async function deleteAppointment(appointmentID:number){
    try {
        await applicationTrackerApi.delete(`/appointments/${appointmentID}`);
        console.log(`Termin ${appointmentID} erfolgreich gelöscht`);
    } catch (error) {
        console.error("Konnte nicht gelöscht werden", error);
        throw error;
    }
}


