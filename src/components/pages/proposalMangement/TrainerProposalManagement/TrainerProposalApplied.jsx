import React from 'react';
// import "../../styles/TrainerProposalManagement.css";
import { Link } from 'react-router-dom'
const TrainerProposalApplied = ({ training }) => {


    return (
        <>
            {
                training?.length > 0 ?
                    <>
                        {
                            training?.map(({ trainingPostDetails, appliedStatus, applicationstatus }) => {
                                return <>
                                    <div className='allaround' style={{ marginTop: '2rem' }}>
                                        <div className='Trainer_Info'>
                                            <div className='TTTD'>
                                                <p>Training Program Name {appliedStatus}</p>
                                                <h3 className='Blue_H2'>{trainingPostDetails?.trainingName}</h3>
                                                <p>Training Topics & Subjects</p>

                                                <div className="capitalize">
                                                    <div className='flex gap-1'>{trainingPostDetails?.topics?.slice(0, 5)?.map((items) => <h2> {items} </h2>)}</div>
                                                    <div className='flex gap-1'>{trainingPostDetails?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                                                </div>
                                                <p>Type Of Training</p>
                                                <h2>{trainingPostDetails?.typeOfTraining}</h2>
                                                <p>Duration Of Training</p>
                                                <h2 className='capitalize'>{trainingPostDetails?.durationCount} {trainingPostDetails?.durationType}</h2>
                                                <div className='SDED'>
                                                    <div className='SD'>
                                                        <p>Start Date</p>
                                                        <h2>{trainingPostDetails?.startDate}</h2>
                                                    </div>
                                                    <div className='ED'>
                                                        <p>End Date</p>
                                                        <h2>{trainingPostDetails?.endDate}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='ProposalStatus'>
                                            <div className='Proposall'>
                                                <div style={{ display: 'flex', flexDirection: 'column', aligntrainingPostDetailss: '', gap: '0.5rem' }}>
                                                    <h1 style={{
                                                        color: '#333',
                                                        fontFamily: 'Poppins',
                                                        fontSize: '1.125rem',
                                                        fontStyle: 'normal',
                                                        fontWeight: '600',
                                                        lineHeight: 'normal',
                                                        margin: '0'
                                                    }}>Posted By</h1>
                                                    <Link to={`/trainerDashboard/proposalmanagement/applied/employerprofilelist/${trainingPostDetails?.postedById}`}>
                                                        <div className='PBB capitalize' style={{ background: '#FFF' }}>
                                                            {/* <img src={trainingPostDetails?.postedByImg} alt="" style={{ borderRadius: '100%', width: '4rem', height: '4rem' }} /> */}
                                                            {
                                                                trainingPostDetails?.postedByImg ? <img src={trainingPostDetails?.postedByImg} alt={trainingPostDetails?.postedByName[0]} style={{ borderRadius: '100%', width: '4rem', height: '4rem' }} />
                                                                    :
                                                                    <div className='flex justify-center items-center bg-slate-200' style={{ borderRadius: '100%', width: '4rem', height: '4rem' }}>
                                                                        <span className='capitalize'>

                                                                            {trainingPostDetails?.postedByName[0]}
                                                                        </span>
                                                                    </div>
                                                            }
                                                            <span className='flex flex-col '>
                                                                <h2>{trainingPostDetails?.postedByName}</h2>
                                                                <p>{trainingPostDetails?.postedByCompanyName}</p>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className='B'><h2>Budget</h2><h1> <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.minBudget}/<span className='capitalize'>{trainingPostDetails?.durationType?.slice(0, 3)}</span></h1></div>
                                                <div className='B capitalize'><h2>Mode Of Training</h2><h1>{trainingPostDetails?.modeOfTraining}</h1></div>
                                            </div>
                                            <div className='Statuss'>
                                                <h3>You're interested in this training, and the request has been successfully submitted! Now, we're awaiting the outcome.</h3>
                                                <br />
                                                <div className="stepper">
                                                    <div className="" style={appliedStatus === true ? { visibility: "hidden" } : null} >
                                                        <div className="step-label">
                                                            <h2>
                                                                {applicationstatus || 'Applied'}
                                                            </h2>
                                                            <p>You Just Sent a <br />Request  for {trainingPostDetails?.postedByName} </p>
                                                        </div>
                                                    </div>
                                                    <div className="" style={appliedStatus === false ? { visibility: "hidden" } : null}>
                                                        <div className="step-label">
                                                            <h2>
                                                                <span className={`${applicationstatus ==='Accepted' ? ' text-green-600':'text-red-500'}`}>
                                                                    {applicationstatus}
                                                                </span>
                                                            </h2>
                                                            <p>{trainingPostDetails?.postedByName} {applicationstatus} Your <br /> Request</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            })
                        }
                    </>
                    :
                    <div className=' mt-[20px] flex justify-center items-center bg-slate-200 h-[300px] w-full rounded-md'>
                        <span>
                            No Applications Yet!
                        </span>
                    </div>
            }
        </>

    );
};

export default TrainerProposalApplied;