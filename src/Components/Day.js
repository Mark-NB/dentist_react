import React from "react";
import { useSelector } from "react-redux";
import "../styles/Day.css";
import AppointmentInDay from "./AppointmentInDay";
import AppointmentPopup from "./AppointmentPopup";

export default ({ appointments }) => {
  const state = useSelector(state => state.dentalSchedule);
  const appointmentsJSX = appointments.map(
    ({ time, patient, dentist, assistant, id }, index) => (
      <AppointmentInDay
        time={time}
        patient={patient}
        dentist={dentist}
        assistant={assistant}
        key={index}
        id={id}
      />
    )
  );
  const sortedAppointmentsJSX = appointmentsJSX.sort((a, b) => (a.props.time > b.props.time) ? 1 : ((b.props.time > a.props.time) ? -1 : 0))
  return (<div>
    <ul className="dayview">{sortedAppointmentsJSX}</ul>
    {state.popup.isActive ? <AppointmentPopup /> : ""}
  </div>)
};
