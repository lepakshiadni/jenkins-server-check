// EmployerOngoing.js
import { React, useState } from "react";
import down from "../../../assets/Resources.svg";

import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from 'react-router-dom'

const EmployerOngoing = ({ onGoing }) => {
  // Replace this with your actual dynamic data
  // console.log('ongoing', onGoing);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const filePreview = (fileName, fileData) => {
    setSelectedFile(fileData)
    setIsVisible(!isVisible);
  };
  const [isHovered, setIsHovered] = useState(false);
  const [activeSteps] = useState([1, 2]);
  const calculateProgressBarWidth = () => {
    const totalSteps = 3; // Update this based on the total number of steps
    const width = ((activeSteps.length - 1) / (totalSteps - 1)) * 100;
    return `${width}%`;
  };


  return (
    <>
      {
        onGoing?.length > 0 ?
          <>
            {
              onGoing?.map((details) => {
                return details?.training?.length > 0 ? (
                  details?.training?.map(({ trainingPostDetails, trainingResources }) => {
                    return <>
                      <div>
                        <div className="w-full  lg:h-[400px]  flex gap-2 p-[10px] ">
                          <div className="h-full p-[15px]  w-[30%] shadow rounded-tl-md rounded-bl-md overflow-y-scroll Scroll    capitalize">
                            <div className="flex flex-col gap-3">
                              <div>
                                <h1 className=" font-medium lg:text-[16px] md:14px">
                                  Training Programming Name
                                </h1>
                                <span className="text-[#2676c2] font-[400] lg:text-[14px] md:text-[12px] truncate ">
                                  {trainingPostDetails?.trainingName}
                                </span>
                              </div>
                              <div>
                                <h1 className="text-[16px]">
                                  Training Topics & Subjects
                                </h1>

                                <div className="flex flex-col gap-1 text-[14px] text-[#535353]">
                                  {
                                    trainingPostDetails?.topics?.map((items) => <h2>{items}</h2>)
                                  }

                                </div>
                              </div>
                              <div>
                                <h1 className="text-[16px]">
                                  Type Of Training
                                </h1>
                                <span className="text-[#535353] text-[14px]">

                                  {trainingPostDetails?.typeOfTraining}
                                </span>
                              </div>
                              <div>
                                <h1>
                                  Duration Of Training
                                </h1>
                                <span className="text-[#535353] text-[14px]">
                                  {trainingPostDetails?.durationCount} {trainingPostDetails?.durationType}{trainingPostDetails?.durationCount > 1 ? "'s" : null}
                                </span>
                              </div>
                              <div>
                                <h1>
                                  Budget
                                </h1>
                                <div className="flex gap-3">
                                  <h1 className="text-[#535353] text-[14px]">Max-<span className="text-[#2676c2] font-[500]">{trainingPostDetails?.maxBudget}</span></h1>
                                  <h1 className="text-[#535353] text-[14px]">Min-<span className="text-[#2676c2] font-[500]">{trainingPostDetails?.minBudget}</span></h1>
                                </div>
                              </div>
                              <div className="flex gap-[50px]">
                                <div>
                                  <h1 className="text-[16px]">
                                    Start Date
                                  </h1>
                                  <span className="text-[#535353] text-[14px]">
                                    {trainingPostDetails.startDate}
                                  </span>
                                </div>
                                <div>
                                  <h1 className="text-[16px] ">
                                    End Date
                                  </h1>
                                  <span className="text-[#535353] text-[14px]">
                                    {trainingPostDetails.endDate}
                                  </span>
                                </div>
                              </div>

                            </div>
                          </div>

                          <div className="h-full w-[70%] shadow rounded-tr-md rounded-br-md   capitalize">
                            <div className="Stepper h-[1rem] flex flex-col mt-[15px]  ">
                              <div className="steps">
                                {[1, 2, 3].map((step) => (
                                  <span
                                    key={step}
                                    className={`circle ${activeSteps.includes(step) ? "active" : ""
                                      }`}
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
                              <div className="">
                                <h4 className="text-[13px]">Program Status</h4>
                                <div className="w-[144px] h-[18px] bg-[#2676C233]  rounded-md flex justify-center items-center ">
                                  <span className="text-[11px] text-[#2676c2]">Started Date:{trainingPostDetails.startDate}</span>
                                </div>
                                {/* <p>Started Date: {trainingPostDetails.startDate}</p> */}
                              </div>
                            </div>

                            <div className="w-full h-[75%]  flex">
                              <div className="w-[35%] h-full  flex flex-col justify-start items-center p-[10px]">
                                <div>
                                  <h1 className="text-[16px] ">
                                    Trainer
                                  </h1>
                                  <div className="w-[200px] h-[100px] border rounded-md flex">
                                    <Link to={`/employerDashboard/mytrainingmanagement/ongoing/trainerlistprofile/${details?.trainerDetails?.trainerId}`}>
                                      {
                                        details?.trainerDetails?.trainerProfileImg ?
                                          <img
                                            className="w-[80px] h-full rounded-tl-md  rounded-bl-md"
                                            src={details?.trainerDetails?.trainerProfileImg}
                                          />
                                          :
                                          <div className="w-[80px] h-full rounded-tl-md  rounded-bl-md bg-[#f4f6f7] flex justify-center items-center">
                                            <span className="text-[25px] font-bold">
                                              {details?.trainerDetails?.trainerName?.[0]}
                                            </span>
                                          </div>
                                      }
                                    </Link>

                                    <div className="flex flex-col w-[120px] truncate p-[2px] ">
                                      <span className="text-[#2676c2] font-[500] text-[16px] text-ellipsis overflow-hidden whitespace-nowrap ">
                                        {details?.trainerDetails?.trainerName}
                                      </span>
                                      <span className="text-[#6A6A6A] text-[14px] text-ellipsis overflow-hidden whitespace-nowrap ">
                                        {details.trainerDetails?.trainerDesignation}
                                      </span>
                                      <span className="flex gap-1 p-[2px]">
                                        {
                                          details?.trainerDetails?.trainerSkills?.slice(0, 5)?.map(({ name, image }) => {
                                            return <span className="" >
                                              {
                                                image ? <img className="w-[19px] h-[19px]  " src={image} />
                                                  :
                                                  <span className="w-[19px] h-[19px] rounded-[50%] bg-[#f4f6f7]">
                                                    {name?.[0]}
                                                  </span>
                                              }
                                            </span>
                                          })
                                        }
                                      </span>
                                    </div>

                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-[500]">
                                      Total Participants
                                    </span>
                                    <span className="text-[#2676c2] text-[24px]">
                                      {trainingPostDetails.participantCount}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="flex flex-col">
                                      <span className="font-[500]">
                                        Mode
                                      </span>
                                      <span className="text-[#535353] text-[14px]">
                                        {trainingPostDetails?.modeOfTraining}
                                      </span>
                                    </div>
                                    {
                                      trainingPostDetails.modeOfTraining === 'offline' ?
                                        <div className={`flex flex-col`}>
                                          <span className="font-[500]">
                                            Location
                                          </span>
                                          <span className="text-[#535353] text-[14px]">
                                            {trainingPostDetails?.location}
                                          </span>
                                        </div>
                                        :
                                        null
                                    }
                                  </div>
                                </div>

                              </div>
                              <div className="w-[65%] h-full ">
                                <span className="text-[16px] font-[500] text-left">
                                  Resources
                                </span>
                                <div className="w-[98%] h-[90%] border rounded-md bg-[#2676C233] flex flex-col justify-center items-center ">
                                  <div className="w-[95%] h-[90%] bg-white p-[10px]" >
                                    {

                                      trainingResources?.length > 0 ? <>
                                        {

                                          trainingResources?.map(({ fileName, fileData }) => {
                                            return (
                                              <div className="flex gap-2   items-center"
                                                onClick={() => { filePreview(fileName, fileData) }}
                                              >

                                                <span className="text-[#2676c2] text-[14px]">
                                                  {fileName}
                                                </span>

                                                <span>
                                                  <img src={down} className="hoverr" alt="down-arrow" />
                                                </span>
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
                                                        height: '95vh',
                                                        width: '50%',
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
                                                      <div className="w-full flex justify-end  mt-[-10px]">
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
                                                      <div className="w-[95%] h-[95%] flex justify-center items-center">
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
                                              </div>
                                            )
                                          })
                                        }
                                      </>
                                        :
                                        <div className="w-full h-full flex justify-center items-center ">
                                          <span className="text-[#2676c2] font-[500] text-[14px] ">
                                            No Resources Content Seen !
                                          </span>
                                        </div>
                                    }
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div >
                    </>


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
