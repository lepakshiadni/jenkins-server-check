// EmployerProposalCandidacy.js
import React from "react";
import Profilepic from '../../../assets/profileTrainer.png'
import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from 'react-router-dom'

const EmployerProposalCandidacy = ({ activeStep, handleStepClick, candidacy }) => {
  // Replace this with your actual dynamic data

  console.log("getAllCandidacy", candidacy);
  return (
    <>
      {
        candidacy?.length > 0 ?
          <>
            {
              candidacy.map(({ trainerId, trainerDesignation, trainerName, trainerProfileImg, trainingDetails }, index) => {

                return trainingDetails?.map(({ applicationstatus, appliedStatus, trainingPostDetails }, index) => {
                  return <div className="p-1">
                    <div key={index} className='flex mt-[1.5rem] gap-5 items-center  bg-[#fff] stroke-[#eee] stroke-1 shadow-[2px_2px_8px_1px_rgba(199,195,195,0.34)] w-[100%] min-h-[23rem] h-auto p-3 rounded-[0.5rem]' >
                      <div className="w-[28%] overflow-y-scroll Scroll  ">
                        <div className="w-[90%] h-[100%] flex flex-col gap-4">
                          <div className="">
                          <p className="text-[#333333] font-medium text-base">Training Program Name</p>
                          <h3 className="text-[15px] font-normal text-[#2676c2] w-[240px]  overflow-hidden text-ellipsis whitespace-nowrap">{trainingPostDetails?.trainingName}</h3>
                          </div>
                          <div className="">
                          <p className="text-[#333333] font-medium text-base">Training Topics & Subjects</p>
                          {/* <h2>{candidacyData.topics}</h2> */}
                          <div className="capitalize">
                            {/* <div className='flex'>{trainingPostDetails?.topics?.slice(0, 5)?.map((items, index) => <h2 className="w-[240px] overflow-hidden text-ellipsis whitespace-nowrap flex gap-1  text-[#535353]"> {items} </h2>)}</div> */}
                            {/* <div className='flex'>{trainingPostDetails?.topics?.slice(5, 10)?.map((items, index) => <h2 className="w-[240px] overflow-hidden text-ellipsis whitespace-nowrap flex gap-1  text-[#535353]">{items}</h2>)}</div> */}
                            {
                                trainingPostDetails?.topics?.map((items) => <h2>{items}</h2>)
                              }
                          </div>
                          </div>
                          <div className="">
                          <p className="text-[#333333] font-medium text-base">Type Of Training</p>
                          <h2 className='w-[240px]  overflow-hidden text-ellipsis whitespace-nowrap className="text-[15px] font-normal text-[#535353]  '>{trainingPostDetails?.typeOfTraining}</h2>
                          </div>
                          <div className="">
                          <p className="text-[#333333] font-medium text-base">Duration Of Training</p>
                          <h2 className="text-[15px] font-normal text-[#535353] ">{trainingPostDetails?.durationCount}</h2>
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
                        <div className='w-[35%] h-[100%] bg-[#2676c21a] rounded-l-lg flex pl-[10px] '>
                          <div className="flex flex-col justify-center gap-[0.5rem]">
                            <h1 className="m-0 text-[#333] text-[1.125rem] not-italic font-[500]">Trainer Profile</h1>

                            <div className='w-[13rem] h-[6.7rem] flex items-center gap-[0.3rem] '>
                              <Link to={`/employerDashboard/proposalsmanagement/candidacy/trainerlistprofile/${trainerId}`}>
                                <div>
                                  {
                                    trainerProfileImg ?

                                      <img src={trainerProfileImg} alt="" className="rounded-[10px] w-[5.8rem] h-[6.5rem]" />
                                      :
                                      // <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-[#8888]" >{proposals?.trainerName[0]}</div>
                                      <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-[#f4f6f7] " >
                                        <span>{trainerName[0]}</span>
                                      </div>
                                  }
                                </div>
                              </Link>
                              <div className='flex flex-col gap-[0.3rem]'>
                                <h2 className="text-[#2676c2] text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap w-[80px]">{trainerName}</h2>
                                <h3 className="text-[#6a6a6a] text-[0.875rem] font-normal overflow-hidden text-ellipsis whitespace-nowrap w-[80px]">{trainerDesignation}</h3>
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
                            <div className='text-[#333] text-[1.125rem] font-[500]'><h2>Mode Of Training</h2><h1 className="text-[#2676c2] text-base font-normal">{trainingPostDetails?.modeOfTraining}</h1></div>
                          </div>
                        </div>
                        <div className='w-[65%] h-[100%] bg-[#2676c2] rounded-[5px] flex flex-col items-center justify-center p-4'>
                          <h3 className="text-[#fff] text-[1.3rem] font-[500] ">You're interested in this trainer profile, and the request has been successfully submitted! Now, we're awaiting the outcome.</h3>
                          <br />
                          <div className="flex w-[100%] m-auto gap-[10rem] ">
                            <div className="" style={appliedStatus === true ? { visibility: "hidden" } : null} >
                              <div className="">
                                <h2 className=" text-base w-[9.3rem] h-[1.9rem] bg-[#ffffff] flex items-center text-[#2676c2] justify-center z-[2] mb-[10px] ">{applicationstatus}</h2>
                                <p className="text-[#fff] text-[0.9rem]">You Just Sent a Request  for {trainerName}</p>
                              </div>
                            </div>
                            <div className="" style={appliedStatus === false ? { visibility: "hidden" } : null}>
                              <div className="">

                                <h2>
                                  <span className={`${applicationstatus === 'Denied' ? 'text-red-700':' text-green-600'}`}>

                                  {applicationstatus}
                                  </span>
                                </h2>
                                <p>Trainer {applicationstatus} Your <br /> Request</p>
                              </div>
                            </div>
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
              <h1>No Candidacy  Yet !</h1>
            </span> 
          </div> 
      }
    </>
  );
};

export default EmployerProposalCandidacy;