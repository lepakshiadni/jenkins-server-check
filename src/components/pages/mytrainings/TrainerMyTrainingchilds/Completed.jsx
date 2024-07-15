import React, { useState } from 'react';
import profilegirl from "../../../assets/image 15.png";
import down from "../../../assets/Resources.svg";
import pen from "../../../assets/edit.svg";
import dust from "../../../assets/Delete.svg";
import NTD from "../../../assets/NTD.jfif";
import { Link } from "react-router-dom";

const Completed = ({ completed }) => {
    console.log('completed', completed);

    const [selectedFile, setSelectedFile] = useState(null);

    const [activeSteps, setActiveSteps] = useState([1, 2, 3]);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const filePreview = (fileName, fileData) => {
        setSelectedFile(fileData)
        setIsVisible(!isVisible);
    };
    const calculateProgressBarWidth = () => {
        const totalSteps = 3; // Update this based on the total number of steps
        const width = (activeSteps.length - 1) / (totalSteps - 1) * 100;
        return `${width}%`;
    };
    console.log('selected', selectedFile);

    return (
        <>
            {
                completed?.length > 0 ?
                    <>
                        {
                            completed?.map(({ trainingPostDetails, trainingResources }, index) => {
                                return <div key={index} className="Training_Programm" style={{ marginTop: '20px' }}>
                                    <div className="Trainer_Infoo">
                                        <div className="TTTDD">
                                            <p>Training Program Name</p>
                                            <h3 className="Blue_H22">{trainingPostDetails?.trainingName}</h3>
                                            <p>Company Name</p>
                                            <h3 className="Blue_H22">{trainingPostDetails?.postedByCompanyName}</h3>
                                            <p>Type Of Training</p>
                                            <h2>{trainingPostDetails?.typeOfTraining}</h2>
                                            <p>Duration Of Training</p>
                                            <h2>{trainingPostDetails?.durationCount} {trainingPostDetails?.durationType} {trainingPostDetails?.durationCount > 0 ? "'s" : ""}</h2>
                                            <div className="SDEDD">
                                                <div className="SDD">
                                                    <p>Start Date</p>
                                                    <h2>{trainingPostDetails.startDate}</h2>
                                                </div>
                                                <div className="EDD">
                                                    <p>End Date</p>
                                                    <h2>{trainingPostDetails.endDate}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Program_Info">
                                        <div className="Stepper" style={{ height: '2.5rem', marginTop: '1.5rem' }}>
                                            <div className="steps">
                                                {[1, 2, 3].map((step) => (
                                                    <span
                                                        key={step}
                                                        className={`circle ${activeSteps.includes(step) ? 'active' : ''}`}
                                                    >
                                                        {step}
                                                    </span>
                                                ))}
                                                <div className="progress-bar">
                                                    <span
                                                        className="indicator"
                                                        style={{
                                                            width: calculateProgressBarWidth(),
                                                        }}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Step3PS">
                                            <h4>Program Status</h4>
                                            <p>{`Completed: ${trainingPostDetails?.endDate}`}</p>
                                        </div>
                                        <div className="Program_Status">
                                            <div className="Total_Parttt">
                                                <>
                                                    <h1 style={{
                                                        color: '#333',
                                                        fontFamily: 'Poppins',
                                                        fontSize: '1.125rem',
                                                        fontStyle: 'normal',
                                                        fontWeight: '600',
                                                        lineHeight: 'normal',
                                                        margin: '0'
                                                    }}>Posted By</h1>
                                                    <Link to={`/trainerDashboard/mytrainings/completed/employerprofilelist/${trainingPostDetails?.postedById}`}>
                                                        <div className="PBB">
                                                            {
                                                                trainingPostDetails?.postedByImg ?
                                                                    <img
                                                                        src={trainingPostDetails?.postedByImg}
                                                                        alt=""
                                                                        style={{
                                                                            borderRadius: "100%",
                                                                            width: "4rem",
                                                                            height: "4rem",
                                                                        }}
                                                                    />

                                                                    :
                                                                    <div className="w-[4rem] h-[4rem] rounded-full flex justify-center items-center bg-slate-500">
                                                                        <span className=" capitalize">
                                                                            {trainingPostDetails?.postedByName[0]}
                                                                        </span>
                                                                    </div>
                                                            }
                                                            <span>
                                                                <h2>{trainingPostDetails?.postedByName}</h2>
                                                                <p>{trainingPostDetails?.postedByCompanyName}</p>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </>
                                                <p style={{
                                                    whiteSpace: "nowrap",
                                                    marginBottom: "1rem",
                                                    margin: "0%",
                                                }}>
                                                    Total Application
                                                </p>
                                                <div className="P205">
                                                    <h1>{trainingPostDetails?.participantCount}</h1>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <p>Mode</p>
                                                        <h2>{trainingPostDetails?.modeOfTraining}</h2>
                                                    </div>
                                                    {
                                                        trainingPostDetails?.modeOfTraining === 'offline' ?
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <p>Location</p>
                                                                <h2>{trainingPostDetails?.location}</h2>
                                                            </div>
                                                            :
                                                            null
                                                    }

                                                </div>
                                            </div>
                                            <div className="Notesss">
                                                <div className="R_Content">
                                                    {/* Map over resources */}
                                                    {trainingResources?.map(({ fileName, fileData }, index) => (
                                                        <h2 key={index} onClick={() => { filePreview(fileName, fileData) }}>
                                                            <img src={down} className="hoverr" alt="down-arrow" />
                                                            {isVisible && (
                                                                <div
                                                                    style={{
                                                                        position: 'fixed',
                                                                        top: '0',
                                                                        left: '0',
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        backgroundColor: '#0a0a0a33',
                                                                        zIndex: '9998',
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            position: 'fixed',
                                                                            top: '50%',
                                                                            left: '50%',
                                                                            transform: 'translate(-50%, -50%)',
                                                                            height: '25rem',
                                                                            width: '45rem',
                                                                            backgroundColor: 'white',
                                                                            border: '1px solid #ccc',
                                                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                                                                            borderRadius: '10px',
                                                                            padding: '20px',
                                                                            zIndex: 9999,
                                                                            display: 'flex',
                                                                            justifyContent: 'space-evenly',
                                                                            flexDirection: 'column',
                                                                            alignItems: 'center'
                                                                        }}>
                                                                        <div style={{ width: '90%', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                                                            <div
                                                                                className={`svg-container ${isHovered ? 'hovered' : ''}`}
                                                                                onMouseEnter={() => setIsHovered(true)}
                                                                                onMouseLeave={() => setIsHovered(false)}
                                                                                cursor="pointer"
                                                                                onClick={filePreview}
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none" cursor="pointer" onClick={filePreview}>
                                                                                    <path d="M8.48347 8.48528L16.9688 16.9706M16.9688 16.9706L25.454 25.4558M16.9688 16.9706L8.48347 25.4558M16.9688 16.9706L25.454 8.48528" stroke="#2676C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                </svg>
                                                                                <svg className={`background-circle ${isHovered ? 'hovered' : ''}`} viewBox="0 0 34 34">
                                                                                    <circle cx="17" cy="17" r="16" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ width: "90%", height: '90%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                            {
                                                                                selectedFile.toLowerCase().endsWith('.pdf') ? (
                                                                                    <iframe
                                                                                        src={selectedFile}
                                                                                        style={{ width: "100%", height: '100%' }}
                                                                                    />
                                                                                ) :
                                                                                    <img src={selectedFile} alt="" style={{ width: "100%", height: '100%' }} />
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {fileName}
                                                        </h2>
                                                    ))}
                                                </div >
                                                {/* <div className="pendust">
                                                    <img src={pen} alt="" />
                                                    <img src={dust} alt="" />
                                                </div> */}
                                            </div >
                                        </div >
                                    </div >
                                </div >
                            })
                        }
                    </>
                    :
                    <div className='flex justify-center items-center h-[300px] w-full bg-slate-300 mt-[30px] rounded-md'>
                        <h1 className='items-center'>No Completed Trainings Avaiable !</h1>
                    </div>
            }
        </>
    );
};

export default Completed;
