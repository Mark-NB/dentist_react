import React, { useEffect } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../Components/Home";
import Calendar from "../Components/Calendar";
import Day from "../Components/Day";
import Management from '../Components/Management'

import generateRandomAppointments from "../features/app-startup-logic";
import { useDispatch, useSelector } from "react-redux";
import { addApointment } from "../features/dentalScheduleSlice/dentalScheduleSlice";



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const tempAppointments = generateRandomAppointments(150);
    tempAppointments.forEach((e) => {
      dispatch(addApointment(e))
    })
  }, []);

  const appointments = useSelector((state) => state.dentalSchedule.appointments);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar view</Link>
            </li>
            <li>
              <Link to="/day">Day view</Link>
            </li>
            <li>
              <Link to="/management">Management</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route path="/calendar">
              <Calendar appointments={appointments} />
            </Route>
            <Route path="/day">
              <Day appointments={appointments.filter(app => app.day === 1)} />
            </Route>
            <Route path="/management">
              <Management />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
};
export default App;
