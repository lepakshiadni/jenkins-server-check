import { React, useState } from 'react';
import { updateApplicationStatus } from '../../../../redux/action/trainer.action'
import { useDispatch, useSelector } from 'react-redux'
import ProfileImage from '../../../utils/ProfileImage';
import { Link } from 'react-router-dom'
const TrainerProposalRequest = ({ training }) => {
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [isaccept, setIsAccept] = useState(false)
    const [isdenied, setIsDenied] = useState(false)


    const [selecetedTraining, setSelectedTraining] = useState({
        employerId: "",
        trainingDetails: "",
        trainingDetailsId: ""

    });
    const deNied = (training, _id) => {

        setSelectedTraining({
            ...selecetedTraining,
            employerId: training.postedById,
            trainingDetails: training,
            trainingDetailsId: _id
        });
        setIsDenied(!isdenied);
    };
    const acCept = (training, _id) => {
        setSelectedTraining({
            ...selecetedTraining,
            employerId: training.postedById,
            trainingDetails: training,
            trainingDetailsId: _id
        });
        setIsAccept(!isaccept);
    };
    console.log('selected: ', selecetedTraining);
    const acceptHandler = () => {
        dispatch(updateApplicationStatus(selecetedTraining?.trainingDetailsId, selecetedTraining?.employerId, selecetedTraining?.trainingDetails, 'Accepted'))
        setIsAccept(!isaccept);
    }
    const deniedHandler = () => {
        dispatch(updateApplicationStatus(selecetedTraining?.trainingDetailsId, selecetedTraining?.employerId, selecetedTraining?.trainingDetails, 'Denied'))
        setIsDenied(!isdenied);
    }
    return (
        <>
            {
                training?.length > 0 ?
                    <>

                        {
                            training?.map((item) => {
                                console.log('training', training)
                                return item?.trainingDetails?.map(({ trainingPostDetails, _id }) => {
                                    return <>
                                    <div className="p-[5px]">
                                        <div className='w-[100%] min-h-[23rem] flex items-center justify-center gap-3 stroke-1 stroke-[#eee] h-[auto]  rounded-[0.5rem] shadow-[2px_2px_8px_1px_rgba(199,195,195,0.34)] p-4 mt-[2rem] ' >
                                            <div className='w-[30%] overflow-y-scroll Scroll pl-[10px] h-[21rem]  '>
                                                <div className='w-[95%] h-[100%] flex flex-col gap-4'>
                                                    <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Training Program Name</p>
                                                    <h3 className='text-[15px] font-normal text-[#2676c2] w-[240px]  overflow-hidden text-ellipsis whitespace-nowrap '>{trainingPostDetails?.trainingName}</h3>
                                                    </div>
                                                    <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Training Topics & Subjects</p>
                                                    <div className="capitalize overflow-hidden">
                                                        {/* <div className='flex gap-1  text-[#535353] overflow-hidden '>{trainingPostDetails?.topics?.slice(0, 5)?.map((items, index) => <h2 className='truncate'> {items}{index !== 4 ? ', ' : ''} </h2>)}</div>
                                                        <div className='flex gap-1  text-[#535353]  '>{trainingPostDetails?.topics?.slice(5, 10)?.map((items, index) => <h2 className='w-[240px] overflow-hidden text-ellipsis whitespace-nowrap'>{items}{index !==4 ? ',': ''}</h2>)}</div> */}
                                                         {
                                trainingPostDetails?.topics?.map((items) => <h2 className='text-[15px] font-normal text-[#535353]'>{items}</h2>)
                              }
                                                    </div>
                                                    </div>
                                                    <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Type Of Training</p>
                                                    <h2 className='w-[240px]  overflow-hidden text-ellipsis whitespace-nowrap className="text-[15px] font-normal text-[#535353]  '>{trainingPostDetails?.typeOfTraining}</h2>
                                                    </div>
                                                    <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Duration Of Training</p>
                                                    <h2 className="text-[15px] font-normal text-[#535353] ">{trainingPostDetails?.durationCount} {trainingPostDetails?.durationType}'s </h2>
                                                    </div>
                                                    <div className="flex justify-between w-[90%]">
                                                        <div className="">
                                                            <p className="text-[#333333] font-medium text-base">Start Date</p>
                                                            <h2 className="text-[15px] font-normal text-[#535353] ">{trainingPostDetails?.startDate}</h2>
                                                        </div>
                                                        <div className="">
                                                            <p className="text-[#333333] font-medium text-base">End Date</p>
                                                            <h2 className="text-[15px] font-normal text-[#535353] " >{trainingPostDetails?.endDate}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {isdenied && (
                                                <div className="Trainer-Proposal-Management-Popup">
                                                    <div className="Trainer-Proposal-Management-Popup-modalContainer ">
                                                        <div className='Trainer-Proposal-Management-Popup-Top' >
                                                            <div className='Trainer-Proposal-Management-Popup-Posted-By'>
                                                                <h1 style={{ width: '80%', marginBottom: '15px', marginLeft: '2rem' }}>Posted By</h1>
                                                                <div className='' style={{ background: '#FFF', marginLeft: '2rem', borderRadius:'2rem' }} >

                                                                    {
                                                                        trainingPostDetails?.postedByImg ?
                                                                            <img src={trainingPostDetails?.postedByImg} alt={trainingPostDetails?.postedByName[0]} style={{ borderRadius: '100%', width: '4rem', height: '4rem' }} />
                                                                            :
                                                                            <div className=' bg-[#f4f6f7] flex items-center justify-center' style={{ borderRadius: '100%', width: '4rem', height: '4rem' }}>
                                                                                <span className=' capitalize text-[18px]'>
                                                                                    {trainingPostDetails?.postedByName?.[0]}

                                                                                </span>
                                                                            </div>
                                                                    }
                                                                    <span><h2>{trainingPostDetails?.postedByName}</h2><p>{trainingPostDetails?.postedByCompanyName}</p></span>
                                                                </div>
                                                            </div>
                                                            <div className='Trainer-Proposal-Management-Popup-info'>
                                                                <div className='C-T-B'>
                                                                    <h1>Company</h1>
                                                                    <h2>{trainingPostDetails?.postedByCompanyName}</h2>
                                                                    <h1>Training Name</h1>
                                                                    <h2>{trainingPostDetails?.postedByDesignation}</h2>
                                                                    <h1>Budget</h1>
                                                                    <h2><span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.minBudget}</h2>

                                                                </div>
                                                                <div className='M-L'>
                                                                    <h1>Mode</h1>
                                                                    <h2>{trainingPostDetails?.modeOfTraining}</h2>
                                                                    {
                                                                        trainingPostDetails?.modeOfTraining === 'offline' ?
                                                                            <>
                                                                                <h1>Location</h1>
                                                                                <h2>{trainingPostDetails?.location}</h2>
                                                                            </>
                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='Trainer-Proposal-Management-Popup-Bottom'>
                                                            <h1 >Are you sure you want to deny this Request !</h1>
                                                            <div className='Trainer-Proposal-Management-Popup-button'>
                                                                <button onClick={deniedHandler} className='Trainer-Proposal-Management-Popup-button-no'>Yes</button>
                                                                <button onClick={() => setIsDenied(!deNied)} className='Trainer-Proposal-Management-Popup-button-yes'>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {isaccept && (
                                                <div className="Trainer-Proposal-Management-Popup">
                                                    <div className="Trainer-Proposal-Management-Popup-modalContainer ">
                                                        <div className='Trainer-Proposal-Management-Popup-Top' >
                                                            <div className='Trainer-Proposal-Management-Popup-Posted-By'>
                                                                <h1 style={{ width: '80%', marginBottom: '15px', marginLeft: '2rem' }}>Posted By</h1>
                                                                <div className='PBB' style={{ background: '#FFF', marginLeft: '2rem' }} >

                                                                    {
                                                                        trainingPostDetails?.postedByImg ?
                                                                            <img src={trainingPostDetails?.postedByImg} alt={trainingPostDetails?.postedByName[0]} style={{ borderRadius: '100%', width: '4rem', height: '4rem' }} />
                                                                            :
                                                                            <div className='bg-[#f4f6f7] flex items-center justify-center' style={{ borderRadius: '100%', width: '4rem', height: '4rem' }}>
                                                                                <span className=' capitalize text-[18px]'>
                                                                                    {trainingPostDetails?.postedByName?.[0]}
                                                                                </span>
                                                                            </div>
                                                                    }
                                                                    <span className='text-wrap'>
                                                                        <h2>{trainingPostDetails?.postedByName}</h2>
                                                                        <p>{trainingPostDetails?.postedByCompanyName}</p>
                                                                    </span>

                                                                </div>
                                                            </div>
                                                            <div className='Trainer-Proposal-Management-Popup-info'>
                                                                <div className='C-T-B'>
                                                                    <h1>Company</h1>
                                                                    <h2>{trainingPostDetails?.postedByCompanyName}</h2>
                                                                    <h1>Training Name</h1>
                                                                    <h2>{trainingPostDetails?.postedByDesignation}</h2>
                                                                    <h1>Budget</h1>
                                                                    <h2><span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.minBudget}</h2>

                                                                </div>
                                                                <div className='M-L'>
                                                                    <h1>Mode</h1>
                                                                    <h2>{trainingPostDetails?.modeOfTraining}</h2>
                                                                    {
                                                                        trainingPostDetails?.modeOfTraining === 'offline' ?
                                                                            <>
                                                                                <h1>Location</h1>
                                                                                <h2>{trainingPostDetails?.location}</h2>
                                                                            </>
                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='Trainer-Proposal-Management-Popup-Bottom'>
                                                            <h1>Do You Want To Accept This Proposal ?</h1>
                                                            <div className='Trainer-Proposal-Management-Popup-button'>
                                                                <button onClick={() => setIsAccept(!acCept)}>No</button>
                                                                <button onClick={acceptHandler}>Confirm</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='w-[70%] h-[21rem] rounded-[10px] flex'>
                                                <div className='w-[35%] bg-[#2676c21a] rounded-l-[10px] flex justify-center pl-[10px] flex-col'>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: '', gap: '0.5rem' }}>
                                                        <>
                                                            <h1 className="m-0 text-[#333] text-[1.125rem] not-italic font-[600]" 
                                                              
                                                            >Posted By</h1>
                                                            <Link to={`/trainerDashboard/proposalmanagement/proposalrequest/employerprofilelist/${trainingPostDetails?.postedById}`}>
                                                                <div className="capitalize bg-[#fff] min-w-[190px] max-w-[80%] h-[4.3rem] rounded-[2.5rem] flex items-center gap-[0.8rem] pl-[0.3rem]  ">
                                                                    {
                                                                        trainingPostDetails?.postedByImg ?
                                                                            <img src={trainingPostDetails?.postedByImg} alt={trainingPostDetails?.postedByName[0]}  className="w-[4rem] h-[4rem] rounded-full "  />
                                                                            :
                                                                            <div className='flex justify-center items-center bg-[#f4f6f7] w-[4rem] h-[4rem] rounded-full' >
                                                                                <span className=' capitalize'>

                                                                                    {trainingPostDetails?.postedByName?.[0]}
                                                                                </span>
                                                                            </div>
                                                                    }

                                                                    {/* <ProfileImage image={trainingPostDetails?.postedByImg} name={trainingPostDetails?.postedByName} w={64} h={64} r={'full'}/> */}
                                                                    <span>
                                                                        <h2 className="text-[#333]  text-[1rem] font-[600]  truncate w-[100px] overflow-hidden text-ellipsis whitespace-nowrap ">{trainingPostDetails?.postedByName}</h2>
                                                                    <p className="text-[#535353] w-[100px] text-[0.75rem] font-[500] truncate">{trainingPostDetails?.postedByCompanyName}</p>
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </>

                                                        <div className=''>
                                                            <h2 className="text-[#333] text-[1.125rem] font-[500]">Budget</h2>
                                                            <h1 className="text-[#2676c2] text-base font-normal"><span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.minBudget}</h1>
                                                        </div>
                                                        <div className='capitalize'>
                                                            <h2 className="text-[#333] text-[1.125rem] font-[500]">Mode Of Training</h2><h1 className="text-[#2676c2] text-base font-normal">{trainingPostDetails?.modeOfTraining}</h1>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-[65%] h-[100%] bg-[#2676c2] rounded-[5px] p-[1rem] flex flex-col justify-center items-center'>
                                                    <h3 className='text-[1.2rem] text-[#fff] font-[500] ml-[0.4rem]'>{`${trainingPostDetails?.postedByName} Proposed For Your Post a Requirement`}</h3>
                                                    <br />
                                                    <div className='flex gap-[2rem] ml-[0.5rem]'>
                                                        <button className=' text-[1rem] font-normal rounded-[0.125rem]  text-[#fff] border-[1px] border-[#fff] w-[9rem] h-[1.8rem] hover:text-[#2676c2] hover:bg-[#fff] ' onClick={() => { deNied(trainingPostDetails, _id) }}>Deny</button>
                                                        <button className='text-[#fff]  text-[1rem] font-normal rounded-[0.125rem] border-[1px] border-[#fff] w-[9rem] h-[1.8rem] hover:text-[#2676c2] hover:bg-[#fff] ' onClick={() => { acCept(trainingPostDetails, _id) }}>Accept</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </>
                                })
                            })
                        }

                    </>
                    :
                    <div className='mt-[20px] flex justify-center items-center w-full h-[300px] bg-[#f4f6f7] rounded-md'>
                        No Training Proposals Yet!
                    </div>
            }
        </>
    );
};

export default TrainerProposalRequest;
