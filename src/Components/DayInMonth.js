import React from "react";
import AppointmentInMonth from "./AppointmentInMonth";

export default ({ appointments }) => {
  const appointmentsJSX = appointments.map(({ time, patient, id }) => (
    <AppointmentInMonth time={time} patient={patient} key={id} id={id} />
  ));
  //console.log(appointmentsJSX);
  const sortedAppointmentsJSX = appointmentsJSX.sort((a, b) => (a.props.time > b.props.time) ? 1 : ((b.props.time > a.props.time) ? -1 : 0));
  return <div className="day">{sortedAppointmentsJSX}</div>;
};
