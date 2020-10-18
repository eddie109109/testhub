import React, { useReducer } from "react";
import styles from "./form.module.css";

// 1. set up an initial state
const INITIAL_STATE = {
    name: "",
    email: "",
    subject: "",
    body: "",
    status: "IDLE", // set the inital state as idle, it can be "SUCCESS", "ERROR" or "PENDING"
};

// 2. set up a reducer
//esp: {type: "someAction", name: "eddie"}
const reducer = (state, action) => {
    switch (action.type) {
        case "updateValue":
            return {
                ...state,
                [action.field]: action.value, // here we use the spread operator to keep whatever was here and add new value to it
            };
        case "updateStatus":
            return { ...state, status: action.status };

        case "reset":
            console.log("here reset"); // just to test the state
            return INITIAL_STATE;
            
        default:
            console.log("here default"); // just to test the state
            return INITIAL_STATE; // if nothing then returns the initial state
    }
};

const Form = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    // use currying from javascript to update the value
    const updateValue = (field) => (event) => {
        dispatch({
            type: "updateValue",
            field: field,
            value: event.target.value,
        });
    };

    const setStatus = (status) => dispatch({ type: "updateStatus", status }); // send new status as its value

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("PENDING"); // when pressing the submit button, we set the state to pending
        console.log(state); // log the state for testing
        setTimeout(() => { // mock the behaviour of waiting for reply 
            setStatus("SUCCESS");
        }, 1000); // wait for 1 sec
    };

    const handleGoBack = () => dispatch({ type: "reset"});

    if (state.status == "SUCCESS") {
        // if the status is "SUCCESS", only returns the following and not the form
        return (
            <>
            <p className={styles.success}>Message Sent!<button className={`${styles.button} ${styles.center}`} onClick={handleGoBack}>Go back</button></p>
            </>
        )
        
    }

    return (
        <div>
            {state.status === "ERROR" ? (
                <p className={styles.error}>Something went wrong! Try again.</p>
            ) : null}
            {/* User ternary operator, if the status is "ERROR"， add the above to let the user know */}
            <form
                className={`${styles.form} ${
                    state.status === "PENDING" && styles.pending
                }`}
                onSubmit={handleSubmit}
            >
                {/* For the above I prefer "&& shortcurcit operator" to ternary operator so that I dont return null */}
                <label className={styles.label}>name</label>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={updateValue("name")}
                />
                {/* 3. update each value below */}
                <label className={styles.label}>Email</label>
                <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={updateValue("email")}
                />
                <label className={styles.label}>Subject</label>
                <input
                    className={styles.input}
                    type="text"
                    name="subject"
                    value={state.subject}
                    onChange={updateValue("subject")}
                />
                <label className={styles.label}>Body</label>
                <textarea
                    className={styles.input}
                    name="body"
                    value={state.body}
                    onChange={updateValue("body")}
                />
                <button className={styles.button}>SUBMIT</button>
            </form>
        </div>
    );
};
export default Form;
