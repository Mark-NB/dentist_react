import React from "react";
import { useDispatch } from "react-redux";
import { popupAppointment } from "../features/dentalScheduleSlice/dentalScheduleSlice";



export default ({ time, patient, id }) => {

  const dispatch = useDispatch();

  const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

  const handleAppointmentClick = (e) => {
    e.preventDefault();
    dispatch(popupAppointment(e.target.id));
  }

  return (
    <div
      id={id}
      className="appointment"
      onClick={(e) => handleAppointmentClick(e)}
    >
      <span className="time" id={id}>{format_time(time)}</span>
      <span className="patient" id={id}>{patient}</span>
    </div>
  );
}