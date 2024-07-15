import React, { useState } from 'react';
import profilegirl from "../../../assets/image 15.png";
import down from "../../../assets/Resources.svg";
import pen from "../../../assets/edit.svg";
import dust from "../../../assets/Delete.svg";
import NTD from "../../../assets/NTD.jfif";
import { Link } from "react-router-dom";
import '../../../styles/TrainerCompleted.css'

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
                                return <div key={index} className="flex flex-shrink-0 justify-evenly items-center mt-5 p-[5px]" >
                                    <div className="w-[28%] h-[23rem] shadow-[0px_2px_8px_1px_rgba(199,195,195,0.34)] flex flex-col justify-evenly ">
                                        <div className="w-[90%] h-[80%] flex flex-col justify-evenly m-auto gap-[0.5rem]">
                                            <div className="">
                                            <p className='text-[#333333] font-medium text-base'>Training Program Name</p>
                                            <h3 className="text-[15px] font-normal text-[#2676c2] truncate">{trainingPostDetails?.trainingName}</h3>
                                            </div>
                                            <div className="">
                                            <p className='text-[#333333] font-medium text-base'>Company Name</p>
                                            <h3 className="text-[15px] font-normal text-[#2676c2] truncate">{trainingPostDetails?.postedByCompanyName}</h3>
                                            </div>
                                            <div className="">
                                            <p className='text-[#333333] font-medium text-base'>Type Of Training</p>
                                            <h2 className='text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails?.typeOfTraining}</h2>
                                            </div>
                                            <div className="">
                                            <p className='text-[#333333] font-medium text-base'>Duration Of Training</p>
                                            <h2 className='text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails?.durationCount} {trainingPostDetails?.durationType} {trainingPostDetails?.durationCount > 0 ? "'s" : ""}</h2>
                                            </div>
                                            <div className="flex w-[90%] justify-between">
                                                <div className="">
                                                    <p className='text-[#333333] font-medium text-base'>Start Date</p>
                                                    <h2 className='text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails.startDate}</h2>
                                                </div>
                                                <div className="">
                                                    <p className='text-[#333333] font-medium text-base'>End Date</p>
                                                    <h2 className='text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails.endDate}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[72%] h-[23rem] shadow-[0px_2px_8px_1px_rgba(199,195,195,0.34)] rounded-r-[10px] flex flex-col justify-center items-center">
                                        <div className="Trainer-completed-stepper" style={{ height: '2.5rem', marginTop: '1.5rem' }}>
                                            <div className="Trainer-completed-steps">
                                                {[1, 2, 3].map((step) => (
                                                    <span
                                                        key={step}
                                                        className={`Trainer-completed-circle ${activeSteps.includes(step) ? 'Trainer-completed-active' : ''}`}
                                                    >
                                                        {step}
                                                    </span>
                                                ))}
                                                <div className="Trainer-completed-progress-bar">
                                                    <span
                                                        className="Trainer-completed-indicator"
                                                        style={{
                                                            width: calculateProgressBarWidth(),
                                                        }}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative left-[17rem] mt-0">
                                            <h4 className='text-[13px]'>Program Status</h4>
                                            <p className='text-[11px] bg-[#2676c233] text-[#2676c2] border-[0.2px] border-[#2676c233] rounded-[0.3rem] '>{`Completed: ${trainingPostDetails?.endDate}`}</p>
                                        </div>
                                        <div className="w-[90%] m-auto flex justify-center gap-4 mt-1 ">
                                        <div className="flex w-[30%] flex-col gap-[0.4rem]">
                                        <>
                                                    <h1 className='text-[#333] font-[Poppins] text-[1.125rem] m-0 font-[600]' style={{
                                                
                                                        fontStyle: 'normal',
                                                     
                                                        lineHeight: 'normal',
                                                
                                                    }}>Posted By</h1>
                                                    <Link to={`/trainerDashboard/mytrainings/completed/employerprofilelist/${trainingPostDetails?.postedById}`}>
                                                    <div className="bg-[#2676c233] min-w-[190px] max-w-[80%] h-[4.5rem] w-[2.5rem] flex items-center gap-[0.8rem] pl-[0.3rem] rounded-[2.5rem]">
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
                                                                    <div className="w-[4rem] h-[4rem] rounded-full flex justify-center items-center bg-[#f4f6f7]">
                                                                        <span className=" capitalize">
                                                                            {trainingPostDetails?.postedByName[0]}
                                                                        </span>
                                                                    </div>
                                                            }
                                                            <span>
                                                                <h2 className="text-[#333] text-[1.125rem] font-[600]">{trainingPostDetails?.postedByName}</h2>
                                                                <p className="text-[#535353] text-[0.75rem] font-medium">{trainingPostDetails?.postedByCompanyName}</p>
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
                                                <div className="flex items-end text-[#2676c2] font-medium">
                                                    <h1 className="text-[#2676c2] text-[1.87rem] font-medium">{trainingPostDetails?.participantCount}</h1>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <p className="text-[#333] font-[600]">Mode</p>
                                                        <h2 className="text-[#535353] font-medium">{trainingPostDetails?.modeOfTraining}</h2>
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
                                                                <p className="text-[#333] font-[600]">Location</p>
                                                                <h2 className="text-[#535353] font-medium">{trainingPostDetails?.location}</h2>
                                                            </div>
                                                            :
                                                            null
                                                    }

                                                </div>
                                            </div>
                                            <div className="w-[70%] h-[100%] flex flex-col items-center justify-center rounded-[0.5rem] border-[1px] border-[#eee] pr-1">
                                                <div className="text-[#2676c2] font-[500] text-[14px]">
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
                    <div className='flex justify-center items-center h-[300px] w-full bg-[#f4f6f7] mt-[30px] rounded-md'>
                        <h1 className='items-center'>No Completed Trainings !</h1>
                    </div>
            }
        </>
    );
};

export default Completed;
