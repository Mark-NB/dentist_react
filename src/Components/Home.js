import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../features/dentalScheduleSlice/dentalScheduleSlice";



const Home = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        e_mail: "",
        birth_date: ""
    })

    const [showAddClient, setShowAddClient] = useState(false);
    const [showAddAppointment, setShowAddAppointment] = useState(false);
    const [showPossibleAppointments, setShowPossibleAppointments] = useState(false);
    const [possibleStringsState, setPossibleStringsState] = useState([]);

    const handleFormFields = (e) => {
        const { name, value } = e.target;
        setFormFields((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAddClient = (e) => {
        e.preventDefault();
        console.log(e.target);
        let newClient = formFields;
        dispatch(addClient(newClient));
        setShowAddClient(false);
        setFormFields(() => ({
            first_name: "",
            last_name: "",
            phone: "",
            e_mail: "",
            birth_date: ""
        }))
    }

    let clientsForAppointment = useSelector((state) => state.dentalSchedule.clients);
    let clientSortArray = [...clientsForAppointment];
    let sortedClientsForAppointment = clientSortArray.sort((a, b) => {
        if (a.last_name < b.last_name) {
            return -1;
        } if (a.last_name > b.last_name) {
            return 1;
        }
        return 0;
    });

    let dentistForAppointment = useSelector((state) => state.dentalSchedule.dentists);
    let dentistSortArray = [...dentistForAppointment];
    let sortedDentistsForAppointment = dentistSortArray.sort((a, b) => {
        if (a.last_name < b.last_name) {
            return -1;
        } if (a.last_name > b.last_name) {
            return 1;
        }
        return 0;
    });

    const [appointmentFields, setAppointmentFields] = useState({
        dentist_name: "",
        client_name: "",
        date: "",
        time: ""
    })

    const currentAppointments = useSelector((state) => state.dentalSchedule.appointments);
    const allPossibleAppointments = useSelector((state) => state.dentalSchedule.possibleAppointments)

    const PossibleAppointments = (e) => {
        e.preventDefault();
        const currentAppointmentsArrayCopy = [...currentAppointments];
        const allPossibleAppointmentsArrayCopy = [...allPossibleAppointments];
        const appointmentsSortedByTime = currentAppointmentsArrayCopy.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
        const appointmentsSortedByTimeAndDay = appointmentsSortedByTime.sort((a, b) => (a.day > b.day) ? 1 : ((b.day > a.day) ? -1 : 0))
        const client = appointmentFields.client_name;
        const dentist = appointmentFields.dentist_name;
        let notPossibleAppointmentsArray = [];
        appointmentsSortedByTimeAndDay.forEach((e) => {
            if (e.patient === client || e.dentist === dentist) {
                notPossibleAppointmentsArray.push(e);
            };
        });
        let allPossibleStrings = [];
        allPossibleAppointmentsArrayCopy.forEach((e) => allPossibleStrings.push(e.day + "-" + e.time));
        let notPossibleStrings = [];
        notPossibleAppointmentsArray.forEach((e) => notPossibleStrings.push(e.day + "-" + e.time));
        const possibleStrings = allPossibleStrings.filter(dateTime => !notPossibleStrings.includes(dateTime));
        setPossibleStringsState(possibleStrings);
        setShowPossibleAppointments(true);
    }


    const handleAddAppointment = (e) => {
        console.log(appointmentFields);
    }

    return (
        <main>
            <button onClick={(e) => {
                setShowAddClient(true);
                setShowAddAppointment(false);
            }}>
                Add Client</button>
            <button onClick={(e) => {
                setShowAddClient(false);
                setShowAddAppointment(true);
            }}>
                Make Appointment</button>
            {showAddClient
                ?
                <form onSubmit={(e) => handleAddClient(e)}>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First name..."
                        value={formFields.first_name}
                        onChange={(e) => handleFormFields(e)}
                    ></input>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last name..."
                        value={formFields.last_name}
                        onChange={(e) => handleFormFields(e)}
                    ></input>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone..."
                        value={formFields.phone}
                        onChange={(e) => handleFormFields(e)}
                    ></input>
                    <input
                        type="text"
                        name="e_mail"
                        placeholder="E-mail..."
                        value={formFields.e_mail}
                        onChange={(e) => handleFormFields(e)}
                    ></input>
                    <input
                        type="text"
                        name="birth_date"
                        placeholder="Birtdate..."
                        value={formFields.birth_date}
                        onChange={(e) => handleFormFields(e)}
                    ></input>
                    <button>
                        Add Client
                    </button>
                </form>
                :
                ""
            }
            {showAddAppointment
                ?
                <form onSubmit={(e) => PossibleAppointments(e)}>
                    <select
                        name="client"
                        value={appointmentFields.client_name}
                        onChange={(e) => {
                            let targetValue = e.target.value;
                            setAppointmentFields((prevState) => {
                                let newState = { ...prevState };
                                newState.client_name = targetValue;
                                return newState;
                            })
                        }}
                    >
                        <option>Select Client...</option>
                        {sortedClientsForAppointment.map((e) => {
                            return <option
                                value={e.first_name + " " + e.last_name}
                                key={e.id}
                            >{e.last_name + ', ' + e.first_name}</option>
                        })}
                    </select>
                    <select
                        name="dentist"
                        value={appointmentFields.dentist_name}
                        onChange={(e) => {
                            let targetValue = e.target.value;
                            setAppointmentFields((prevState) => {
                                let newState = { ...prevState };
                                newState.dentist_name = targetValue;
                                return newState;
                            })
                        }}
                    >
                        <option>Select Dentist...</option>
                        {sortedDentistsForAppointment.map((e) => {
                            return <option
                                value={e.first_name + " " + e.last_name}
                                key={e.id}
                            >{e.last_name + ', ' + e.first_name}</option>
                        })}
                    </select>
                    <button>
                        Show Appointment Options
                    </button>
                </form>
                :
                ""
            }
            {showPossibleAppointments
                ?
                <ul>
                    <li>Day - Time</li>
                    {possibleStringsState.map((e) => {
                        return <li
                            value={e}
                            key={e}
                            onClick={(e) => {
                                e.persist();
                                setAppointmentFields((prevState) => {
                                    let dayTimeArr = e.target.innerHTML.split("-");
                                    let newState = { ...prevState };
                                    newState.date = dayTimeArr[0];
                                    newState.time = dayTimeArr[1];
                                    console.log(newState);
                                    return newState;
                                })
                                handleAddAppointment();
                            }}
                        >{e}</li>
                    })}
                </ul>
                :
                ""
            }
        </main>
    )
};




export default Home;