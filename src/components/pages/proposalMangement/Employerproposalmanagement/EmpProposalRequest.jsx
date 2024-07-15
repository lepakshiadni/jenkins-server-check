// EmployerProposalRequest.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Profilepic from '../../../assets/profileTrainer.png'
import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { updateApplicationStatus, getAppliedTrainingEmployer } from '../../../../redux/action/employers.action'
import { useDispatch, useSelector } from 'react-redux'
const EmployerProposalRequest = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAppliedTrainingEmployer())
    }, [dispatch])
    const appliedTrainingDetails = useSelector(({ employerSignUp }) => {
        return employerSignUp?.getAppliedTrainingEmployer?.getAppliedTraining
    })
    console.log('appliedTrainingDetails', appliedTrainingDetails)

    const [isDenyPopupVisible, setIsDenyPopupVisible] = useState(false);
    const [isAcceptPopupVisible, setIsAcceptPopupVisible] = useState(false);
    const [seletedTraining, setSeletedTraining] = useState(null)
    const [trainerId, setTrainerId] = useState(null)
    const [trainingDetailsId, setTrainingDetailsId] = useState(null)
    ///
    function generateRandomColor(name) {
        // Get the character code of the first letter of the name
        const charCode = name.charCodeAt(0);

        // Generate random offsets for more variation
        const randomOffsetR = Math.floor(Math.random() * 256);
        const randomOffsetG = Math.floor(Math.random() * 256);
        const randomOffsetB = Math.floor(Math.random() * 256);

        // Generate RGB values based on the character code and random offsets
        const red = (charCode * 7 + randomOffsetR) % 256;
        const green = (charCode * 13 + randomOffsetG) % 256;
        const blue = (charCode * 19 + randomOffsetB) % 256;

        // Construct the RGB color string
        const color = `rgb(${red}, ${green}, ${blue})`;

        return color;
    }
    const deniedHandler = async (training, trainingDetailsId) => {
        // dispatch(updateApplicationStatus(trainingDetailsId, training?.trainerId, 'Denied'));
        setTrainerId(training?.trainerId)
        setTrainingDetailsId(trainingDetailsId)
        setSeletedTraining(training)
        setIsDenyPopupVisible(true);
    }
    const acceptedHandler = async (training, trainingDetailsId) => {
        // dispatch(updateApplicationStatus(trainingDetailsId, training?.trainerId, 'Accepted'));
        setTrainerId(training?.trainerId)
        setTrainingDetailsId(trainingDetailsId)
        setSeletedTraining(training)
        setIsAcceptPopupVisible(true);
    }

    return (
        <>
            {
                appliedTrainingDetails?.length > 0 ? <>
                    {
                        appliedTrainingDetails?.map((proposals, index) => {
                            return proposals?.trainingDetails?.map(({ trainingPostDetails, _id }, trainingData) => {
                                return <div className="p-1">
                                    <div className='flex bg-[#fff] stroke-1 stroke-[#eee] shadow-[2px_2px_8px_1px_rgba(199,195,195,0.34)] justify-center gap-5 items-center w-[100%] min-h-[23rem] h-auto py-3 pl-1 pr-3 rounded-[0.5rem] mt-[1.5rem]' >
                                        <div className="w-[28%] h-[20rem] overflow-y-scroll Scroll   ">
                                            <div className=" w-[90%]  h-[100%] flex flex-col m-auto gap-4 ">
                                                <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Training Program Name</p>
                                                    <h3 className="text-[15px] font-normal text-[#2676c2] w-[240px]  overflow-hidden text-ellipsis whitespace-nowrap  ">{trainingPostDetails?.trainingName}</h3>
                                                </div>
                                                <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Training Topics & Subjects</p>
                                                    <div className="capitalize">
                                                        {/* <div className='flex gap-1'>{trainingPostDetails?.topics?.slice(0, 5)?.map((items) => <h2 className="text-[15px] font-normal text-[#535353]"> {items} </h2>)}</div>
                                                    <div className='flex gap-1'>{trainingPostDetails?.topics?.slice(5, 10)?.map((items) => <h2 className="text-[15px] font-normal text-[#535353]">{items}</h2>)}</div> */}
                                                        {
                                                            trainingPostDetails?.topics?.map((items) => <h2>{items}</h2>)
                                                        }
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Type Of Training</p>
                                                    <h2 className="text-[15px] font-normal text-[#535353]">{trainingPostDetails?.typeOfTraining}</h2>
                                                </div>
                                                <div className="">
                                                    <p className="text-[#333333] font-medium text-base">Duration Of Training</p>
                                                    <h2 className="text-[15px] font-normal text-[#535353]">{trainingPostDetails?.durationCount}</h2>
                                                </div>
                                                <div className="flex justify-between w-[90%]">
                                                    <div className="">
                                                        <p className="text-[#333333] font-medium text-base">Start Date</p>
                                                        <h2 className="text-[15px] font-normal text-[#535353]">{trainingPostDetails?.startDate}</h2>
                                                    </div>
                                                    <div className="">
                                                        <p className="text-[#333333] font-medium text-base">End Date</p>
                                                        <h2 className="text-[15px] font-normal text-[#535353]">{trainingPostDetails?.endDate}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[72%] h-[20rem] rounded-[10px] flex'>
                                            <div className='w-[35%] h-[100%] bg-[#2676c21a] rounded-l-lg flex pl-[10px]  '>
                                                <div className="flex flex-col justify-center gap-[0.5rem]">
                                                    <h1 className="m-0 text-[#333] text-[1.125rem] not-italic font-[500]"
                                                    >Trainer Profile</h1>

                                                    <div className='w-[13rem] h-[6.7rem] flex items-center gap-[0.3rem]'>
                                                        <Link to={`/employerDashboard/proposalsmanagement/proposals/trainerlistprofile/${proposals?.trainerId}`}>
                                                            <div>
                                                                {
                                                                    proposals?.trainerProfileImg ?

                                                                        <img src={proposals?.trainerProfileImg} alt="" className="rounded-[10px] w-[5.8rem] h-[6.5rem]" />
                                                                        :
                                                                        <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-[#f4f6f7]" >
                                                                            <span className="capitalize text-black ">
                                                                                {/* {proposals?.trainerName[0]} */}
                                                                                {proposals?.trainerName?.charAt(0)}
                                                                            </span>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </Link>
                                                        <div className='flex flex-col gap-[0.3rem]'>
                                                            <h2 className="text-[#333]  text-[1rem] font-[600]  truncate w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{proposals?.trainerName}Ajityuwiugwuguwqh</h2>
                                                            <h3 className="text-[#6a6a6a]  text-[15px] font-[500]  truncate w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{proposals?.trainerDesignation}sahxjgsyuguwqgxwq</h3>
                                                            <Stack
                                                                spacing={1}
                                                                sx={{
                                                                    width: "3rem",
                                                                    height: "0.95363rem",
                                                                    marginTop: "0.31rem",
                                                                }}
                                                                direction="row"
                                                                alignItems="center"
                                                            >
                                                                <Rating
                                                                    name="half-rating-read"
                                                                    max={5}
                                                                    icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 20 }} />}
                                                                    emptyIcon={
                                                                        <StarBorderIcon sx={{ fontSize: 20, color: "#FFDE30" }} />
                                                                    }
                                                                    precision={0.1}
                                                                    value={0.1}
                                                                    readOnly
                                                                />
                                                            </Stack>
                                                        </div>
                                                    </div>

                                                    <div className='text-[#333] text-[1.125rem] font-[500]'><h2>Budget</h2><h1 className="text-[#2676c2] text-base font-normal w-[80%] overflow-hidden text-ellipsis whitespace-nowrap"><span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.minBudget}</h1></div>
                                                    <div className='text-[#333] text-[1.125rem] font-[500]'><h2>Mode Of Training</h2><h1 className="text-[#2676c2] text-base font-normal w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">{trainingPostDetails?.modeOfTraining}</h1></div>
                                                </div>
                                            </div>
                                            <div className='w-[65%] h-[100%] bg-[#2676c2] rounded-[5px] flex flex-col items-center justify-center p-4'>
                                                <h3 className="text-[#fff] text-[1.3rem] font-[500] ">{proposals?.trainerName} Proposed For Your Post a Requirement</h3>
                                                <br />
                                                <div className='flex gap-[2rem] ml-[0.5rem]'>
                                                    {isDenyPopupVisible && (
                                                        <div className="Trainer-Proposal-Management-Popup">
                                                            <div className="Trainer-Proposal-Management-Popup-modalContainer ">
                                                                <div className='Trainer-Proposal-Management-Popup-Top' >
                                                                    <div className='Trainer-Proposal-Management-Popup-Posted-By'>
                                                                        <div style={{ marginLeft: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                                                            <div>
                                                                                {
                                                                                    seletedTraining?.trainerProfileImg ?
                                                                                        <img src={seletedTraining?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                                                                        :
                                                                                        <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl">{proposals?.trainerName?.[0]}</div>
                                                                                }
                                                                            </div>
                                                                            <div >
                                                                                <h2 style={{}}>{seletedTraining?.trainerName}</h2>
                                                                                <h2>{seletedTraining?.trainerDesignation}</h2>
                                                                                <Stack
                                                                                    spacing={1}
                                                                                    sx={{
                                                                                        width: "3rem",
                                                                                        height: "0.95363rem",
                                                                                        marginTop: "0.31rem",
                                                                                        // marginLeft: "1.11rem",
                                                                                    }}
                                                                                    direction="row"
                                                                                    alignItems="center"
                                                                                >
                                                                                    <Rating
                                                                                        name="half-rating-read"
                                                                                        max={5}
                                                                                        icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 20 }} />}
                                                                                        emptyIcon={
                                                                                            <StarBorderIcon sx={{ fontSize: 20, color: "#FFDE30" }} />
                                                                                        }
                                                                                        precision={0.1}
                                                                                        // defaultValue={trainerData.averageRating}
                                                                                        readOnly
                                                                                    />
                                                                                </Stack>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='Trainer-Proposal-Management-Popup-info'>
                                                                        <div className='C-T-B'>
                                                                            <h1>Company</h1>
                                                                            <h2>{trainingPostDetails?.postedByCompanyName}</h2>
                                                                            <h1>Training Name</h1>
                                                                            <h2>{trainingPostDetails?.trainingName}</h2>
                                                                            <h1>Budget</h1>
                                                                            <h2><span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails.minBudget}</h2>
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
                                                                    <h1>Do You Want To Deny This Proposal ?</h1>
                                                                    <div className='Trainer-Proposal-Management-Popup-button'>
                                                                        <button className="bg-[#2676c2]" onClick={() => setIsDenyPopupVisible(false)}>No</button>
                                                                        <button className="hover:text-[#ffff]" onClick={() => { setIsDenyPopupVisible(false); dispatch(updateApplicationStatus(trainingDetailsId, trainerId, 'Denied')) }} >
                                                                            <span className="text-[#2676c2] hover:text-[#ffff]">Confirm</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <button className="w-[9rem] h-[2rem] text-base border-[1px] text-[#fff] border-[#fff] hover:bg-[#fff] hover:text-[#2676c2]  " onClick={() => { deniedHandler(proposals, _id) }}>Deny</button>
                                                    {isAcceptPopupVisible && (
                                                        <div className="Trainer-Proposal-Management-Popup">
                                                            <div className="Trainer-Proposal-Management-Popup-modalContainer ">
                                                                <div className='Trainer-Proposal-Management-Popup-Top' >
                                                                    <div className='Trainer-Proposal-Management-Popup-Posted-By'>
                                                                        <div style={{ marginLeft: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                                                            <div>
                                                                                {
                                                                                    seletedTraining?.trainerProfileImg ?
                                                                                        <img src={seletedTraining?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                                                                        :
                                                                                        <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl">{proposals?.trainerName?.[0]}</div>
                                                                                }
                                                                            </div>
                                                                            <div >
                                                                                <h2>{seletedTraining?.trainerName}</h2>
                                                                                <h2>{seletedTraining?.trainerDesignation}</h2>
                                                                                <Stack
                                                                                    spacing={1}
                                                                                    sx={{
                                                                                        width: "3rem",
                                                                                        height: "0.95363rem",
                                                                                        marginTop: "0.31rem",
                                                                                    }}
                                                                                    direction="row"
                                                                                    alignItems="center"
                                                                                >
                                                                                    <Rating
                                                                                        name="half-rating-read"
                                                                                        max={5}
                                                                                        icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 20 }} />}
                                                                                        emptyIcon={
                                                                                            <StarBorderIcon sx={{ fontSize: 20, color: "#FFDE30" }} />
                                                                                        }
                                                                                        precision={0.1}
                                                                                        // defaultValue={trainerData.averageRating}
                                                                                        readOnly
                                                                                    />
                                                                                </Stack>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='Trainer-Proposal-Management-Popup-info'>
                                                                        <div className='C-T-B'>
                                                                            <h1>Company</h1>
                                                                            <h2>{trainingPostDetails?.postedByCompanyName}</h2>
                                                                            <h1>Training Name</h1>
                                                                            <h2>{trainingPostDetails?.trainingName}</h2>
                                                                            <h1>Budget</h1>
                                                                            <h2><span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails.minBudget}</h2>
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
                                                                        <button className="" onClick={() => setIsAcceptPopupVisible(false)}>
                                                                            <span className="text-[#2676c2] hover:text-[#fff]">
                                                                                No
                                                                            </span>
                                                                        </button>
                                                                        <button className="bg-[#2676c2]" onClick={() => { setIsAcceptPopupVisible(false); dispatch(updateApplicationStatus(trainingDetailsId, trainerId, 'Accepted')) }} >
                                                                            Confirm
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <button className="w-[9rem] h-[2rem] text-base border-[1px] text-[#fff] border-[#fff] hover:bg-[#fff] hover:text-[#2676c2]  " onClick={() => { acceptedHandler(proposals, _id) }}>Accept</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        })
                    }
                </>
                    :
                    <div className="flex w-full h-[300px] justify-center items-center bg-[#f4f6f7] rounded-md mt-[20px]">
                        <span>
                            <h1>No Proposal Request Yet !</h1>
                        </span>
                    </div>
            }
        </>

    );
};

export default EmployerProposalRequest;