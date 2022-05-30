import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closepopupAppointment, deleteAppointment } from "../features/dentalScheduleSlice/dentalScheduleSlice";
import '../styles/AppointmentPopup.css'

const AppointmentPopup = () => {

    const dispatch = useDispatch();
    const currentAppointmentPopup = useSelector(state => state.dentalSchedule.popup.appointment);

    return (
        <div className="app-popup-box">
            <div className="poppup-box">
                <span
                    className="popup-close"
                    onClick={(e) => { dispatch(closepopupAppointment()) }}>x</span>
                <h3>Apointment details</h3>
                <p>Time: {currentAppointmentPopup.time}:00u</p>
                <p>Client: {currentAppointmentPopup.patient}</p>
                <p>Dentist: {currentAppointmentPopup.dentist}</p>
                <p>Assistant: {currentAppointmentPopup.assistant}</p>
                <button onClick={(e) => {
                    dispatch(deleteAppointment(currentAppointmentPopup.id));
                    dispatch(closepopupAppointment());
                }}>
                    Delete appointment</button>
            </div>
        </div>
    )

}

export default AppointmentPopup;