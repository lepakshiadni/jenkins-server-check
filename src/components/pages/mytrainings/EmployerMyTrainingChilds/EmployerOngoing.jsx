// EmployerOngoing.js
import { React, useState } from "react";

import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from 'react-router-dom'

const EmployerOngoing = ({ onGoing }) => {
  // Replace this with your actual dynamic data
  // console.log('ongoing', onGoing);

  const [activeSteps] = useState([1, 2]);
  const calculateProgressBarWidth = () => {
    const totalSteps = 3; // Update this based on the total number of steps
    const width = ((activeSteps.length - 1) / (totalSteps - 1)) * 100;
    return `${width}%`;
  };

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
  return (
    <>
      {
        onGoing?.length > 0 ?
          <>
            {
              onGoing?.map((details) => {
                return details?.training?.length > 0 ? (
                  details?.training?.map(({ trainingPostDetails }) => {
                    return <div className="Training_Programs">
                      <div className="Training_Programm">
                        <div className="Trainer_Infoo">
                          <div className="TTTDD">
                            <p>Training Program Name</p>
                            <h3 className="Blue_H22">{trainingPostDetails?.trainingName}</h3>
                            <p>Training Topics & Subjects</p>
                            {/* <h2>{ongoingData.topics}</h2> */}
                            <div className="capitalize truncate">
                              <div className=" flex space-x-2">{trainingPostDetails?.topics?.slice(0, 5)?.map((items) => <h2>{items}</h2>)}</div>
                              {/* <div className="bg-[#8888] w-[1px]"></div> */}
                              <div className=" flex space-x-2">{trainingPostDetails?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                            </div>
                            <p>Type Of Training</p>
                            <h2>{trainingPostDetails?.typeOfTraining}</h2>
                            <p>Duration Of Training</p>
                            <h2>{trainingPostDetails?.durationCount} {trainingPostDetails?.durationType}'s</h2>
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
                        <div className="Emp_Ongoing_Program_Info">
                          <div
                            className="Stepper"
                            style={{ height: "2.5rem", marginTop: "1.5rem" }}
                          > 
                            {/* <div className="Stepper" style={{ width: '90%', }}> */}
                            <div className="steps">
                              {[1, 2, 3].map((step) => (
                                <span
                                  key={step}
                                  className={`circle ${activeSteps.includes(step) ? "active" : ""
                                    }`}
                                // onClick={() => handleStepClick(step)}
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
                            {/* </div> */}
                          </div>
                          <div className="Step2PS">
                            <h4>Program Status</h4>
                            <p>Started Date: {trainingPostDetails.startDate}</p>
                          </div>
                          <div className="Program_Status p-[10px]">
                            <div className="Total_Partt">
                              <p>Trainer</p>
                              <div
                                className="PB"
                                style={{ border: "1px solid #DADADA", borderRadius: "10px" }}
                              >
                                {/* <img
                                  src={Profilepic}
                                  alt=""
                                  style={{
                                    borderRadius: "10px",
                                    width: "5.8rem",
                                    height: "6.55rem",
                                  }} */}
                                <Link to={`/employerDashboard/mytrainingmanagement/ongoing/trainerlistprofile/${details?.trainerDetails?.trainerId}`}>
                                  {
                                    details?.trainerDetails?.trainerProfileImg ?
                                      <img src={details?.trainerDetails?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                      :
                                      <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl" style={{ backgroundColor: '#f4f6f7' }}>{details?.trainerDetails?.trainerName?.[0]}</div>
                                  }
                                </Link>

                                <div className="Trainer_Details">
                                  <h2>{details?.trainerDetails?.trainerName}</h2>
                                  <h3>{details.trainerDetails?.trainerDesignation}</h3>
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
                                      icon={
                                        <StarIcon sx={{ color: "#FFDE30", fontSize: 20 }} />
                                      }
                                      emptyIcon={
                                        <StarBorderIcon
                                          sx={{ fontSize: 20, color: "#FFDE30" }}
                                        />
                                      }
                                      precision={0.1}
                                      value={2} // traininer rating
                                      readOnly
                                    />
                                  </Stack>
                                </div>
                              </div>
                              <p>Total Paticipant's</p>
                              <div className="P205">
                                <h1>{trainingPostDetails.participantCount}</h1>
                              </div>
                              <div
                                style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <p>Mode</p>
                                  <h2>{trainingPostDetails.modeOfTraining}</h2>
                                </div>

                                {
                                  trainingPostDetails.modeOfTraining === 'offline' ?
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p>Location</p>
                                      <h2>{trainingPostDetails.location}</h2>
                                    </div>
                                    :
                                    null
                                }
                              </div>
                            </div>
                            <div className="w-[80%] h-full rounded-[0.5rem] border border-[#eee] bg-[#2676c21a] p-[10px]">
                              <p>Notes</p>
                              {/* <input type="text" placeholder="Taking Some Notes" /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  })
                )
                  :
                  // <div className="flex justify-center items-center w-full h-[300px] bg-slate-200 rounded-md mt-[10px]">
                  //   <span>
                  //     No Ongoing Training Yet !
                  //   </span>
                  // </div>
                  null
              })
            }
          </>
          :
          
          <div className="flex justify-center items-center w-full h-[300px] bg-[#f4f6f7] rounded-md">
            <span>
              No Ongoing Training Yet !
            </span>
          </div>
      }
    </>
  );
};

export default EmployerOngoing;
