import { createSlice } from "@reduxjs/toolkit";
import clients from '../../resources/bvt-client-data.json'
import dentists from '../../resources/bvt-dentist-data.json'
import assistents from '../../resources/bvt-assistant-data.json'
import possibleAppointments from '../../resources/bvt-blank-appointments.json'

const initialState = {
    clients: clients,
    dentists: dentists,
    assistents: assistents,
    appointments: [],
    possibleAppointments: possibleAppointments,
    popup: {
        isActive: false,
        appointment: {}
    }
}

export const dentalScheduleSlice = createSlice({
    name: 'dentalSchedule',
    initialState,
    reducers: {
        addApointment: (state, payload) => {
            state.appointments.push(payload.payload);
        },
        deleteAppointment: (state, payload) => void state.appointments.splice(state.appointments.findIndex(e => e.id === payload.payload), 1)
        ,
        popupAppointment: (state, payload) => {
            let targetAppointment = state.appointments.find((e) => e.id === payload.payload);
            state.popup.isActive = true;
            state.popup.appointment = targetAppointment;
        },
        closepopupAppointment: (state) => {
            state.popup = {
                isActive: false,
                appointment: {}
            };
        },
        addClient: (state, payload) => {
            state.clients.push(payload.payload);
        },
        addDentist: (state, payload) => {
            state.dentists.push(payload.payload);
        },
        addAssistent: (state, payload) => {
            state.assistents.push(payload.payload);
        },
    }
});
export const {
    addApointment,
    deleteAppointment,
    popupAppointment,
    closepopupAppointment,
    addClient,
    addDentist,
    addAssistent,
} = dentalScheduleSlice.actions;
export default dentalScheduleSlice.reducer;