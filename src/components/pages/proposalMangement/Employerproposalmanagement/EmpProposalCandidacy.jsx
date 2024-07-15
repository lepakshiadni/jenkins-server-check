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
                    <div key={index} className='allaround' style={{ marginTop: '1rem' }}>
                      <div className="Candidacy_Trainer_Info">
                        <div className="TTTD">
                          <p>Training Program Name</p>
                          <h3 className="Blue_H2">{trainingPostDetails?.trainingName}</h3>
                          <p>Training Topics & Subjects</p>
                          {/* <h2>{candidacyData.topics}</h2> */}
                          <div className="capitalize">
                            <div className='flex gap-1 truncate '>{trainingPostDetails?.topics?.slice(0, 5)?.map((items) => <h2> {items} </h2>)}</div>
                            <div className='flex gap-1'>{trainingPostDetails?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                          </div>
                          <p>Type Of Training</p>
                          <h2>{trainingPostDetails?.typeOfTraining}</h2>
                          <p>Duration Of Training</p>
                          <h2>{trainingPostDetails?.durationCount}</h2>
                          <div className="SDED">
                            <div className="SD">
                              <h2>Start Date</h2>
                              <h2>{trainingPostDetails?.startDate}</h2>
                            </div>
                            <div className="ED">
                              <h2>End Date</h2>
                              <h2>{trainingPostDetails?.endDate}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='ProposalStatus'>
                        <div className='Proposall'>
                          <div style={{ display: 'flex', flexDirection: "column", alignItems: '', gap: '0.5rem' }}>
                            <h1 style={{
                              color: '#333',
                              fontFamily: 'Poppins',
                              fontSize: '1.125rem',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              lineHeight: 'normal',
                            }}>Trainer Profile</h1>

                            <div className='PB'>
                              <Link to={`/employerDashboard/proposalsmanagement/candidacy/trainerlistprofile/${trainerId}`}>
                                <div>
                                  {
                                    trainerProfileImg ?

                                      <img src={trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                      :
                                      // <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-[#8888]" >{proposals?.trainerName[0]}</div>
                                      <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-[#f4f6f7] " >
                                        <span>{trainerName[0]}</span>
                                      </div>
                                  }
                                </div>
                              </Link>
                              <div className='Trainer_Details'>
                                <h2>{trainerName}</h2>
                                <h3 className="">{trainerDesignation}</h3>
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

                            <div className='B'><h2>Budget</h2><h1><span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.maxBudget} - <span>{trainingPostDetails?.selectedCountry === 'IND' ? '₹' : '$'}</span> {trainingPostDetails?.minBudget}</h1></div>
                            <div className='B'><h2>Mode Of Training</h2><h1>{trainingPostDetails?.modeOfTraining}</h1></div>
                          </div>
                        </div>
                        <div className='Statuss'>
                          <h3>You're interested in this trainer profile, and the request has been successfully submitted! Now, we're awaiting the outcome.</h3>
                          <br />
                          <div className="stepper">
                            <div className="" style={appliedStatus === true ? { visibility: "hidden" } : null} >
                              <div className="step-label">
                                <h2>{applicationstatus}</h2>
                                <p>You Just Sent a <br />Request  for {trainerName}</p>
                              </div>
                            </div>
                            <div className="" style={appliedStatus === false ? { visibility: "hidden" } : null}>
                              <div className="step-label">

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