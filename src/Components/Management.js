import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDentist, addAssistent } from "../features/dentalScheduleSlice/dentalScheduleSlice";



const Management = () => {

    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        e_mail: ""
    })

    const [showAddDentist, setShowAddDentist] = useState(false);
    const [showAddAssistent, setShowAddAssistent] = useState(false);

    const handleFormFields = (e) => {
        const { name, value } = e.target;
        setFormFields((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAddDentist = (e) => {
        e.preventDefault();
        let newDentist = formFields;
        dispatch(addDentist(newDentist));
        setShowAddDentist(false);
        setFormFields(() => ({
            first_name: "",
            last_name: "",
            phone: "",
            e_mail: ""
        }))
    }

    const handleAddAssistent = (e) => {
        e.preventDefault();
        let newAssistent = formFields;
        dispatch(addAssistent(newAssistent));
        setShowAddAssistent(false);
        setFormFields(() => ({
            first_name: "",
            last_name: "",
            phone: "",
            e_mail: ""
        }))
    }

    return (
        <main>
            <button onClick={(e) => {setShowAddDentist(true); setShowAddAssistent(false);}}>Add Dentist</button>
            <button onClick={(e) => {setShowAddDentist(false); setShowAddAssistent(true);}}>Add Assistent</button>
            {showAddDentist
                ?
                <form onSubmit={(e) => handleAddDentist(e)}>
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
                    <button>
                        Add Dentist
                    </button>
                </form>
                :
                ""
            }
            {showAddAssistent
                ?
                <form onSubmit={(e) => handleAddAssistent(e)}>
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
                    <button>
                        Add Assistent
                    </button>
                </form>
                :
                ""
            }
        </main>
    )
};



export default Management;