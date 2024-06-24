import React, { useState } from "react";
import '../../styles/MyTrainingProgram.css'

const MyTrainingPrograms = () => {
    const [activeSteps, setActiveSteps] = useState([1]);

    const handleStepClick = (step) => {
        // Check if the clicked step is the next one in sequence
        if (step === activeSteps.length + 1) {
            setActiveSteps([...activeSteps, step]);
        } else if (step <= activeSteps.length) {
            // If the user clicks on a previous or the current step, reset the sequence
            setActiveSteps([step]);
        }
    };
    return (
        <div style={{ width: '60rem' }} >
            <div className="Training_Programs">
                <div className="OGP">
                    <p>On Going Training</p>
                </div>
                <div className="Training_Program mt-[20px]">
                    <div className="Trainer_Info">
                        <div className="TTTD">
                            <p>Training Program Name</p>
                            <h3 className="Blue_H2">Full Stack Developer</h3>
                            <p>Training Topics & Subjects</p>
                            <h2>Java, Js, Python, React Native</h2>
                            <p>Type Of Training</p>
                            <h2>Corporate</h2>
                            <p>Duration Of Training</p>
                            <h2>10 Days</h2>
                            <div className="SDED">
                                <div className="SD">
                                    <p>Start Date</p>
                                    <h2>01-12-2023</h2>
                                </div>
                                <div className="ED">
                                    <p>End Date</p>
                                    <h2>01-01-2024</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Program_Info">
                        <div className="Stepper">
                            <div className="steps">
                                {[1, 2, 3, 4].map((step) => (
                                    <span
                                        key={step}
                                        className={`circle ${activeSteps.includes(step) ? "active" : ""
                                            }`}
                                        onClick={() => handleStepClick(step)}
                                    >
                                        {step}
                                    </span>
                                ))}
                                <div className="progress-bar">
                                    <span
                                        className="indicator"
                                        style={{ width: `${(activeSteps.length - 1) * 33.33}%` }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                        <div className="Program_Status">
                            <div className="Total_Part">
                                <p
                                    style={{
                                        whiteSpace: "nowrap",
                                        marginBottom: "1rem",
                                        margin: "0%",
                                    }}
                                >
                                    Total Participants
                                </p>
                                <div className="P205">
                                    <h1>205</h1>
                                    <h5>Participants</h5>
                                </div>
                                <p>Mode</p>
                                <h2>Offline</h2>
                                <p>Location</p>
                                <h2>Bangalore</h2>
                                <div className="DELDIT">
                                    <button className="Del">Delete</button>
                                    <button className="Edt">Edit</button>
                                </div>
                            </div>
                            <div className="Notes">
                                <p>Notes</p>
                                <input type="text" placeholder="Taking Some Notes" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Training_Program">
                    <div className="Trainer_Info">
                        <div className="TTTD">
                            <p>Training Program Name</p>
                            <h3 className="Blue_H2">Full Stack Developer</h3>
                            <p>Training Topics & Subjects</p>
                            <h2>Java, Js, Python, React Native</h2>
                            <p>Type Of Training</p>
                            <h2>Corporate</h2>
                            <p>Duration Of Training</p>
                            <h2>10 Days</h2>
                            <div className="SDED">
                                <div className="SD">
                                    <p>Start Date</p>
                                    <h2>01-12-2023</h2>
                                </div>
                                <div className="ED">
                                    <p>End Date</p>
                                    <h2>01-01-2024</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Program_Info">
                        <div className="Stepper">
                            <div className="steps">
                                {[1, 2, 3, 4].map((step) => (
                                    <span
                                        key={step}
                                        className={`circle ${activeSteps.includes(step) ? "active" : ""
                                            }`}
                                        onClick={() => handleStepClick(step)}
                                    >
                                        {step}
                                    </span>
                                ))}
                                <div className="progress-bar">
                                    <span
                                        className="indicator"
                                        style={{ width: `${(activeSteps.length - 1) * 33.33}%` }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                        <div className="Program_Status">
                            <div className="Total_Part">
                                <p
                                    style={{
                                        whiteSpace: "nowrap",
                                        marginBottom: "1rem",
                                        margin: "0%",
                                    }}
                                >
                                    Total Participants
                                </p>
                                <div className="P205">
                                    <h1>205</h1>
                                    <h5>Participants</h5>
                                </div>
                                <p>Mode</p>
                                <h2>Offline</h2>
                                <p>Location</p>
                                <h2>Bangalore</h2>
                                <div className="DELDIT">
                                    <button className="Del">Delete</button>
                                    <button className="Edt">Edit</button>
                                </div>
                            </div>
                            <div className="Notes">
                                <p>Notes</p>
                                <input type="text" placeholder="Taking Some Notes" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </div>
    );
};

export default MyTrainingPrograms;