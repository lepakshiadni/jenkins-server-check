import React, { useState } from 'react';
import download from '../../../assets/download 1.svg';


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
        <div className="Training_Programs" style={{ marginTop: '20px' }}>
            {
                upcomming?.length > 0 ?
                    <>

                        {upcomming.map(({ trainingPostDetails }, index) => (
                            <div key={index} className="Training_Programm">
                                <div className="Trainer_Infoo">
                                    <div className="TTTDD">
                                        <p className='font-[600]'>Training Program Name</p>
                                        <h3 className="Blue_H22">{trainingPostDetails?.trainingName}</h3>
                                        <p className='font-[600]'>Company Name</p>
                                        <h3 className="Blue_H22">{trainingPostDetails?.postedByCompanyName}</h3>
                                        <p className='font-[600]'>Type Of Training</p>
                                        <h2>{trainingPostDetails?.typeOfTraining}</h2>
                                        <p className='font-[600]'>Duration Of Training</p>
                                        <h2 className=' capitalize'>{trainingPostDetails?.durationCount} <span>{trainingPostDetails?.durationType}{trainingPostDetails?.durationCount > 0 ? "'s" : ""} </span> </h2>
                                        <div className="SDEDD">
                                            <div className="SDD">
                                                <p className='font-[600]'>Start Date</p>
                                                <h2>{trainingPostDetails?.startDate}</h2>
                                            </div>
                                            <div className="EDD">
                                                <p className='font-[600]'>End Date</p>
                                                <h2>{trainingPostDetails?.endDate}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Program_Info">
                                    <div className="Stepper" style={{ height: '2.5rem', marginTop: '1.5rem' }}>
                                        <div className="steps">
                                            {[1, 2, 3].map((step) => (
                                                <React.Fragment key={step}>
                                                    <div
                                                        className={`circle ${activeSteps.includes(step) ? 'active' : ''}`}
                                                    >
                                                        {step}
                                                    </div>
                                                </React.Fragment>
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
                                    <div className="Step1PS">
                                        <h4>Program Status</h4>
                                        <p>{`Applied Date: ${trainingPostDetails?.createdAt?.slice(0, 10)}`}</p>
                                    </div>
                                    <div className="Program_Status">
                                        <div
                                            className="Total_Part"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                paddingTop: '2rem',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    marginBottom: '1rem',
                                                    margin: '0%',
                                                }}
                                            >
                                                Total Application
                                            </p>
                                            <div className="P205">
                                                <h1>{trainingPostDetails?.participantCount}</h1>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1.5rem',
                                                }}
                                            >
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p>Mode</p>
                                                    <h2>{trainingPostDetails?.modeOfTraining}</h2>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p>Location</p>
                                                    {/* <h2>{training.location}</h2> */}
                                                </div>
                                            </div>
                                            <div className="DELDIT">
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
                                        <div className="Notess">
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
                    <div className='flex justify-center items-center h-[300px] w-full bg-slate-300 mt-[30px] rounded-md'>
                        <h1 className='items-center'>No Completed Trainings Avaiable !</h1>
                    </div>
            }
        </div>
    );
};

export default Upcoming;
