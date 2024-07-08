import React, { useState } from 'react';
import image15 from "../../../assets/image 15.png";
import { Link } from 'react-router-dom'
import '../../../styles/TrainerProposalDenied.css'


const TrainerProposalDenied = ({ denied }) => {
    console.log(denied)
    const DeniedData = [
        {
            training: 'Full Stack Developer',
            companyName: 'Wipro Technology',
            trainingType: 'Corporate',
            duration: '10 Days',
            startDate: '01-12-2023',
            endDate: '01-01-2024',
            appliedDate: '20/12/2024',
            totalApplications: 20,
            mode: 'Offline',
            location: 'Bangalore',
            postedBy: 'Eleesa',
            companyPosted: 'Zipro',
            totalApplication: 20,
        },
        // Add more objects with data as needed
    ];

    const [activeSteps, setActiveSteps] = useState([1, 2]);
    const [activeOption, setActiveOption] = useState("upComing");


    const calculateProgressBarWidth = () => {
        const totalSteps = 3; // Update this based on the total number of steps
        const width = (activeSteps.length - 1) / (totalSteps - 1) * 100;
        return `${width}%`;
    };



    return (
        <>
            {
                denied?.length > 0 ? <>
                    {
                        denied?.map(({ trainingPostDetails }, index) => (
                            <div key={index} className="mt-5 p-[10px]" >
                                <div className="w-[100%] flex items-center gap-1   h-[370px] ">
                                    <div className="h-[100%] w-[30%]   shadow-[2px_2px_8px_1px_rgba(199,195,195,0.34)]">
                                        <div className="w-[95%] h-[100%] pl-4 flex flex-col justify-center gap-4 ">
                                            <div className="">
                                            <p className='text-[#333333] font-medium text-base' >Training Program Name</p>
                                            <h3 className="text-[15px] font-normal text-[#2676c2] truncate ">{trainingPostDetails?.trainingName}</h3>
                                            </div>
                                            <div className="">
                                            <p className='text-[#333333] font-medium text-base'>Company Name</p>
                                            <h3 className="text-[15px] font-normal text-[#2676c2] truncate ">{trainingPostDetails?.postedByCompanyName}</h3>
                                            </div>
                                            <div className="">
                                            <p className='text-[#333333] font-medium text-base'>Type Of Training</p>
                                            <h2 className='text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails?.typeOfTraining}</h2>
                                            </div>
                                            <div className="">
                                            <p className='text-[#333333] font-medium text-base'>Duration Of Training</p>
                                            <h2 className='text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails?.durationCount}</h2>
                                            </div>
                                            <div className="flex w-[90%] justify-between">
                                                <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Start Date</p>
                                                    <h2 className="text-[15px] font-normal text-[#535353] ">{trainingPostDetails.startDate}</h2>
                                                </div>
                                                <div className="">
                                                    <p className="text-[#333333] font-medium text-base">End Date</p>
                                                    <h2 className="text-[15px] font-normal text-[#535353] ">{trainingPostDetails.endDate}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" shadow-[2px_2px_8px_1px_rgba(199,195,195,0.34)] flex flex-col items-center justify-center gap-[5px]   h-[100%] w-[70%]">
                                        <div className="denied-stepper">
                                            <div className="denied-steps">
                                                {[1, 2, 3].map((step) => (
                                                    <span
                                                        key={step}
                                                        className={`denied-redcircle ${activeSteps.includes(step) ? "denied-active" : ""} ${activeOption === "deNied" && step === 2 ? "denied" : ""}`}
                                                    >
                                                        {step}
                                                    </span>
                                                ))}
                                                <div className="denied-progressBar">
                                                    <span
                                                        className="denied-redIndicator"
                                                        style={{
                                                            width: calculateProgressBarWidth(),
                                                        }}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="denied-stepFooter">
                                            <h4 className='text-[13px] mt-2'>Program Status</h4>
                                            <p className=' w-[90px] h-[18px]  text-[11px] border-[1] border-[#c22626] bg-red-200 text-[#c22626] flex items-center justify-center rounded-lg ml-[5px] '>Denied</p>
                                        </div>
                                        <div className="flex mt-[10px] w-[90%] justify-center gap-[5px]   ">
                                            <div className="flex flex-col w-[35%]  gap-2">
                                                <>
                                                    <h1 className='text-[#333] text-[1.1rem] font-[600]  ' 
                                                     
                                                    >Posted By</h1>
                                                    <Link to={`/trainerDashboard/mytrainings/denied/employerprofilelist/${trainingPostDetails?.postedById}`}>
                                                        <div className=" bg-[#2676c233] min-w-[190px] max-w-[80%] h-[4.3rem] rounded-[2.3rem] flex items-center gap-[0.8rem] pl-[0.3rem] ">
                                                            {
                                                                trainingPostDetails?.postedByImg ?
                                                                    <img className='h-[3.5rem] w-[3.5rem] rounded-full object-cover '
                                                                        src={trainingPostDetails?.postedByImg}
                                                                        alt=""
                                                                      
                                                                    />

                                                                    :
                                                                    <div className="w-[4rem] h-[4rem] rounded-full flex justify-center items-center bg-[#f4f6f7]">
                                                                        <span className=" capitalize">
                                                                            {trainingPostDetails?.postedByName[0]}
                                                                        </span>
                                                                    </div>
                                                            }
                                                            <span>
                                                                <h2 className='text-[#333] text-[1.1rem] font-[600] w-[100px] overflow-hidden text-ellipsis whitespace-nowrap'>{trainingPostDetails?.postedByName}</h2>
                                                                <p className='text-[#535353] text-[0.75rem] w-[100px] overflow-hidden text-ellipsis whitespace-nowrap' >{trainingPostDetails?.postedByCompanyName}</p>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </>
                                                <p className='font-[600]' >
                                                    Total Application
                                                </p>
                                                <div className="">
                                                    <h1 className='text-[#2676c2] text-[1.875rem] font-medium '>{trainingPostDetails?.participantCount}</h1>
                                                </div>
                                                <div className='flex items-center gap-[2rem]' >
                                                    <div className='flex flex-col items-start'>
                                                        <p className='font-[600] text-base'>Mode</p>
                                                        <h2 className='text-[0.9rem]'>{trainingPostDetails?.modeOfTraining}</h2>
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
                                            <div className="Notesss w-[65%] h-[100%]">
                                                {/* Add any additional content specific to Denied section */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
                    :
                    <div className='flex justify-center items-center h-[300px] w-full bg-[#f4f6f7] mt-[30px] rounded-md'>
                        <h1 className='items-center'>No Denied Trainings Avaiable !</h1>
                    </div>
            }
        </>
    );
};

export default TrainerProposalDenied;
