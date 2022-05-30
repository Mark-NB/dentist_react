import React from "react";
import { useDispatch } from "react-redux";
import { popupAppointment } from "../features/dentalScheduleSlice/dentalScheduleSlice";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

export default ({ time, patient, dentist, assistant, id }) => {
  const dispatch = useDispatch();
  const handleAppointmentClick = (e) => {
    e.preventDefault();
    dispatch(popupAppointment(e.target.id));
  }

return (
  <li onClick={(e) => handleAppointmentClick(e)} id={id} className="appointment">
    <div id={id} className="time">{format_time(time)}</div>
    <div id={id} className="patient">Patiënt: {patient}</div>
    <div id={id} className="dentist">Tandarts: {dentist}</div>
    <div id={id} className="assistant">Assistent: {assistant}</div>
  </li>
)};
