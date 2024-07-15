import React, { useState } from 'react';
import download from '../../../assets/download 1.svg';
import '../../../styles/TrainerUpcoming.css'


const Upcoming = ({ upcomming }) => {
    // console.log('upcomming', upcomming);
    const [activeSteps, setActiveSteps] = useState([1]);
    const [isVisible, setIsVisible] = useState(false);


    const togglePopup = () => {
        setIsVisible(!isVisible);
    };

    const calculateProgressBarWidth = () => {
        const totalSteps = 3; // Update this based on the total number of steps
        const width = (activeSteps.length - 1) / (totalSteps - 1) * 100;
        return `${width}%`;
    };

    return (
        <div className="Training_Programs mt-5 p-[10px]" >
            {
                upcomming?.length > 0 ?
                    <>

                        {upcomming.map(({ trainingPostDetails }, index) => (
                            <div key={index} className="flex items-center justify-evenly mt-5">
                                <div className="w-[28%] h-[23rem] shadow-[0px_2px_8px_1px_rgba(199,195,195,0.34)] rounded-l-[10px]">
                                    <div className="h-[100%] w-[95%]  flex flex-col justify-center p-3 gap-4">
                                        <div className="">
                                        <p className='text-[#333333] font-medium text-base'>Training Program Name</p>
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
                                        <h2 className=' capitalize text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails?.durationCount} <span>{trainingPostDetails?.durationType}{trainingPostDetails?.durationCount > 0 ? "'s" : ""} </span> </h2>
                                        </div>
                                     
                                        <div className="flex w-[90%] justify-between">
                                            <div className="">
                                                <p className='text-[#333333] font-medium text-base'>Start Date</p>
                                                <h2 className='text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails?.startDate}</h2>
                                            </div>
                                            <div className="">
                                                <p className='text-[#333333] font-medium text-base'>End Date</p>
                                                <h2 className='text-[15px] font-normal text-[#535353] truncate'>{trainingPostDetails?.endDate}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[72%] h-[23rem] shadow-[0px_2px_8px_1px_rgba(199,195,195,0.34)] rounded-r-[10px] flex flex-col justify-center items-center ">
                                    <div className="upcoming-stepper" style={{ height: '2.5rem', marginTop: '1.5rem' }}>
                                        <div className="upcoming-steps">
                                            {[1, 2, 3].map((step) => (
                                                <React.Fragment key={step}>
                                                    <div
                                                        className={`upcoming-circle ${activeSteps.includes(step) ? 'upcoming-active' : ''}`}
                                                    >
                                                        {step}
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                            <div className="upcoming-progress-bar">
                                                <span
                                                    className="upcoming-indicator"
                                                    style={{
                                                        width: calculateProgressBarWidth(),
                                                    }}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Step1PS">
                                        <h4 className='text-[13px] mt-2'>Program Status</h4>
                                        <p className='p-[0.5px]' style={{fontSize:'11px'}}>{`Applied Date: ${trainingPostDetails?.createdAt?.slice(0, 10)}`}</p>
                                    </div>
                                    <div className="w-[90%] m-auto flex justify-center gap-4 h-[15rem]">
                                        <div
                                            className="flex flex-col gap-4 pt-4 "
                                            // style={{
                                            //     display: 'flex',
                                            //     flexDirection: 'column',
                                            //     gap: 'rem',
                                            //     paddingTop: '2rem',
                                            // }}
                                        >
                                            <p  className='font-[600]'
                                                // style={{
                                                //     whiteSpace: 'nowrap',
                                                //     marginBottom: '1rem',
                                                //     margin: '0%',
                                                // }}
                                            >
                                                Total Application
                                            </p>
                                            <div className="">
                                                <h1 className='text-[#2676c2] text-[1.875rem] font-medium '>{trainingPostDetails?.participantCount}</h1>
                                            </div>
                                            <div className='flex items-center justify-center gap-[1.5rem]'
                                              
                                            >
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p className='font-[600] text-base'>Mode</p>
                                                    <h2 className='text-[0.9rem]'>{trainingPostDetails?.modeOfTraining}</h2>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p className='font-[600] text-base'>Location</p>
                                                    <h2 className='text-[0.9rem]'>Location</h2>
                                                    {/* <h2>{training.location}</h2> */}
                                                </div>
                                            </div>
                                            <div className="">
                                                {/* <button className="Edt" onClick={togglePopup}>
                                                    Delete
                                                </button> */}

                                                {isVisible && (
                                                    <div className="Trainer-Proposal-Management-Popup">
                                                        <div className="Trainer-Proposal-Management-Popup-modalContainer ">
                                                            <div className='Trainer-Proposal-Management-Popup-Top' >
                                                                <div className='Trainer-Proposal-Management-Popup-Posted-By'>
                                                                    <h1 style={{ width: '80%', marginBottom: '15px', marginLeft: '2rem' }}>Posted By</h1>
                                                                    <div className='PBB' style={{ background: '#FFF', marginLeft: '2rem' }} >
                                                                        <img src={trainingPostDetails?.postedByImg} alt="" style={{ borderRadius: '100%', width: '4rem', height: '4rem' }} />
                                                                        <span><h2>{trainingPostDetails?.postedByName}</h2><p>{trainingPostDetails?.postedByCompanyName}</p></span>
                                                                    </div>
                                                                </div>
                                                                <div className='Trainer-Proposal-Management-Popup-info'>
                                                                    <div className='C-T-B'>
                                                                        <h1>Company</h1>
                                                                        <h3>{trainingPostDetails?.postedByCompanyName}</h3>
                                                                        <h1>Training Name</h1>
                                                                        <h3>{trainingPostDetails?.trainingName}</h3>
                                                                        <h1>Budget</h1>
                                                                        <h3> <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.minBudget}</h3>
                                                                    </div>
                                                                    <div className='M-L'>
                                                                        <h1>Mode</h1>
                                                                        <h3 className='capitalize'>{trainingPostDetails?.modeOfTraining}</h3>
                                                                        {
                                                                            trainingPostDetails?.modeOfTraining === "offline" ?
                                                                                <div>
                                                                                    <h1>Location</h1>
                                                                                    <h3>{trainingPostDetails?.location}</h3>
                                                                                </div> :
                                                                                null
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='Trainer-Proposal-Management-Popup-Bottom'>
                                                                <h1>Do You Want To Delete This Training ?</h1>
                                                                <div className='Trainer-Proposal-Management-Popup-button '>
                                                                    <button className='bg-[#2676c2] text-white' onClick={togglePopup}>No</button>
                                                                    <button className='bg-white text-[#2676c2]' onClick={togglePopup}>Confirm</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-[75%] h-[100%] flex flex-col justify-center items-center rounded-[0.5rem] border-[1px] border-[#eee]">
                                            <div className="Step1content">
                                                {
                                                    trainingPostDetails?.availability === 'availability' ?
                                                        <div>
                                                            <p>{`${trainingPostDetails?.tocFile?.tocFileName} content`}</p>
                                                            <img src={download} alt="" style={{ borderRadius: '50%', width: '2rem', height: '2rem', backgroundColor: '#2676c233' }} />
                                                        </div>
                                                        :
                                                        <p>Content Unavailable !</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <div className='flex justify-center items-center h-[300px] w-full bg-[#f4f6f7] mt-[10px] rounded-md'>
                        <h1 className='items-center'>No Upcoming Trainings Available !</h1>
                    </div>
            }
        </div>
    );
};

export default Upcoming;
