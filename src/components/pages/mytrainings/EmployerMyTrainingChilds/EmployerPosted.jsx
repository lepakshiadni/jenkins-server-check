// EmployerPosted.js
import React, { useState, useEffect } from "react";
import PeofilePic from "../../../assets/profileTrainer.png";
import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  deletePostTrainingRequirement, getPostTrainingRequirementAction, updatedApplicationStatus,
  enableTrainingStatus
} from '../../../../redux/action/postRequirement.action'
import { useDispatch, useSelector } from 'react-redux'
import { MdVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import TrainerProfilePopUp from '../../../utils/TrainerProfilePopUp'


const EmployerPosted = () => {

  const [seletedTraining, setSeletedTraining] = useState(null)
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [checkedApplicant, setCheckedApplicant] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const [showModel, setShowModel] = useState(false)

  useEffect(() => {
    dispatch(getPostTrainingRequirementAction())
  }, [dispatch])

  const postDetails = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails
  })
  const handleCheckboxChange = (appliedBy) => {
    setSelectedTrainer(appliedBy)
    setCheckedApplicant(appliedBy === checkedApplicant ? null : appliedBy);
  };
  console.log('selectedTrainer', seletedTraining)



  const [isVisible, setIsVisible] = useState(false);
  const [isAssign, setIsAssign] = useState(false)
  const deleteTrainingHandler = () => {
    dispatch(deletePostTrainingRequirement(seletedTraining?._id))
    setIsVisible(!isVisible);
  }
  const togglePopup = (post) => {
    setIsVisible(!isVisible);
  };

  const enableTrainingStatusHandler=()=>{
    dispatch(enableTrainingStatus(seletedTraining?._id,seletedTraining?._id))
    setIsAssign(!isAssign)

  }




  return (
    <>
      {
        postDetails?.length > 0 ? <>
          {
            showModel ? <TrainerProfilePopUp trigger={showModel} setTrigger={setShowModel} id={selectedTrainer} />
              : null
          }
          {
            postDetails?.map((training, index) => {
              return <>
                <>
                  <div>
                    <div className="w-full  lg:h-[350px]  flex gap-2 p-[10px] ">
                      <div className="h-full p-[15px]  w-[30%] shadow rounded-tl-md rounded-bl-md overflow-y-scroll Scroll   capitalize">
                        <div className=" p-[] flex flex-col gap-2   ">
                          <div>
                            <h1 className=" font-medium lg:text-[16px] md:14px">
                              Training Programming Name
                            </h1>
                            <span className="text-[#2676c2] font-[400] lg:text-[14px] md:text-[12px] truncate ">
                              {training?.trainingName}
                            </span>
                          </div>

                          <div>
                            <h1 className="text-[16px]">
                              Training Topics & Subjects
                            </h1>

                            <div className="flex flex-col gap-1 text-[14px] text-[#535353]">
                              {
                                training?.topics?.map((items) => <h2>{items}</h2>)
                              }

                            </div>
                          </div>
                          <div>
                            <h1 className="text-[16px]">
                              Type Of Training
                            </h1>
                            <span className="text-[#535353] text-[14px]">
                              {training.typeOfTraining}
                            </span>
                          </div>
                          <div>
                            <h1>
                              Duration Of Training
                            </h1>
                            <span className="text-[#535353] text-[14px]">
                              {training.durationCount} {training?.durationType}{training?.durationCount > 1 ? "'s" : null}
                            </span>
                          </div>
                          <div className="flex gap-[50px]">
                            <div>
                              <h1 className="text-[16px]">
                                Start Date
                              </h1>
                              <span className="text-[#535353] text-[14px]">
                                {training.startDate}
                              </span>
                            </div>
                            <div>
                              <h1 className="text-[16px] ">
                                End Date
                              </h1>
                              <span className="text-[#535353] text-[14px]">
                                {training.endDate}
                              </span>
                            </div>
                          </div>


                        </div>


                      </div>
                      <div className="h-full w-[70%] shadow rounded-tr-md rounded-br-md   capitalize">
                        <div className="flex w-full h-full">
                          <div className="w-[40%] h-[70%] flex flex-col justify-center p-[20px] gap-[20px]">
                            <div>
                              <h1>
                                Total Application
                              </h1>
                              <span className="text-[28px] text-[#2676c2] font-[500]">
                                {training?.applicants?.length > 0 ? training?.applicants?.length : 0}
                              </span>
                            </div>
                            <div>
                              <h1>
                                Mode
                              </h1>
                              {
                                training?.modeofTraining === 'offline' ?
                                  <span>
                                    <h1>Location</h1>
                                    <span className="text-[#535353]">
                                      {training?.location}
                                    </span>

                                  </span>
                                  :
                                  <span className="text-[#535353]">
                                    Online
                                  </span>
                              }

                            </div>
                            <div className="flex gap-5"
                              onClick={() => { setSeletedTraining(training) }}
                            >
                              <button
                                onClick={togglePopup}
                                className="w-[80px] h-[25px] text-[12px] p-[1px] rounded-[8px] border border-[#2676c2] text-[#2676c2] hover:bg-[#2676c2] hover:text-white">
                                Delete
                              </button>
                              {isVisible && (
                                <div
                                  style={{
                                    position: "fixed",
                                    top: "0",
                                    left: "0",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(10, 10, 10, 0.64)",
                                    zIndex: "9998",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "fixed",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      height: "25rem",
                                      width: "45rem",
                                      backgroundColor: "white",
                                      border: "1px solid #ccc",
                                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                      borderRadius: "10px",
                                      zIndex: 9999,
                                      display: "flex",
                                      justifyContent: "space-evenly",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div className="flex justify-end items-end w-full h-[20px] mr-[30px] mt-[-50px]">
                                      <div
                                        className={`svg-container ${isHovered ? "hovered" : ""
                                          }`}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        cursor="pointer"
                                        onClick={togglePopup}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="34"
                                          height="34"
                                          viewBox="0 0 34 34"
                                          fill="none"
                                          cursor="pointer"
                                          onClick={togglePopup}
                                        >
                                          <path
                                            d="M8.48347 8.48528L16.9688 16.9706M16.9688 16.9706L25.454 25.4558M16.9688 16.9706L8.48347 25.4558M16.9688 16.9706L25.454 8.48528"
                                            stroke="#2676C2"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        <svg
                                          className={`background-circle ${isHovered ? "hovered" : ""
                                            }`}
                                          viewBox="0 0 34 34"
                                        >
                                        </svg>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        width: "90%",
                                        // margin: "auto",
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <h3
                                        style={{
                                          fontFamily: "Poppins",
                                          fontSize: "20px",
                                          fontWeight: "500",
                                          lineHeight: "30px",
                                          letterSpacing: "0",
                                          textAlign: "left",
                                          color: "#263238",
                                        }}
                                      >
                                        Are you sure you want to delete this post?
                                      </h3>

                                    </div>
                                    <div
                                      className="DELDIT flex space-x-9"
                                    >
                                      <button onClick={deleteTrainingHandler} className="Del">Delete</button>
                                      <button className="Edt" onClick={togglePopup}>
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <button
                                onClick={() => setIsAssign(!isAssign)}
                                className={`${training?.applicants?.length === 0 ? 'hidden' : 'w-[80px] h-[25px] border border-[#2676c2] rounded-[8px] bg-[#2676c2] text-white text-[12px]'} `}>
                                Assign
                              </button>
                              {isAssign && (
                                <div
                                  style={{
                                    position: "fixed",
                                    top: "0",
                                    left: "0",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(10, 10, 10, 0.64)",
                                    zIndex: "9998",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "fixed",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      height: "25rem",
                                      width: "40rem",
                                      backgroundColor: "white",
                                      border: "1px solid #ccc",
                                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                      borderRadius: "10px",

                                      zIndex: 9999,
                                      display: "flex",
                                      justifyContent: "space-evenly",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div className="flex justify-end items-end w-full h-[20px] mr-[30px] ">
                                      <div
                                        className={`svg-container ${isHovered ? "hovered" : ""
                                          }`}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        cursor="pointer"
                                        onClick={() => setIsAssign(!isAssign)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="34"
                                          height="34"
                                          viewBox="0 0 34 34"
                                          fill="none"
                                          cursor="pointer"
                                          onClick={togglePopup}
                                        >
                                          <path
                                            d="M8.48347 8.48528L16.9688 16.9706M16.9688 16.9706L25.454 25.4558M16.9688 16.9706L8.48347 25.4558M16.9688 16.9706L25.454 8.48528"
                                            stroke="#2676C2"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        <svg
                                          className={`background-circle ${isHovered ? "hovered" : ""
                                            }`}
                                          viewBox="0 0 34 34"
                                        >
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="bg-[#2676c21a] w-[95%] h-[85%] flex justify-center items-center rounded-md ">
                                      <div className="UsersContainer w-[96%] h-[94%] bg-white rounded-md overflow-y-scroll p-[10px] ">
                                        {
                                          training?.applicants?.length > 0 ?
                                            <>

                                              {

                                                training?.applicants?.map(({ appliedBy, applicantName, applicantDesignation, appliedStatus, applicantProfileImg, application }) => {

                                                  return <div className={`${application === 'Accepted' ? '' : 'hidden'}`}>
                                                    <div className="flex justify-center items-center p-[10px] ">
                                                      <div className="w-full h-[50px]  rounded-sm p-[5px] flex gap-2 items-center hover:bg-[#2676c21a]  border-b">
                                                        <div>
                                                          <input
                                                            className="h-[15px] w-[15px]" type="checkbox"
                                                            checked={checkedApplicant === appliedBy}
                                                            onChange={() => handleCheckboxChange(appliedBy)}
                                                          />
                                                        </div>

                                                        <div onClick={() => {
                                                          setShowModel(!showModel)
                                                          setSelectedTrainer(appliedBy)
                                                        }} className="flex justify-start items-center gap-3 cursor-pointer">
                                                          {
                                                            applicantProfileImg ?
                                                              <img className="h-[40px] w-[40px] rounded-[50%] "
                                                                src={applicantProfileImg}
                                                              />
                                                              :
                                                              <div className="h-[40px] w-[40px] rounded-[50%] bg-[#2676c21a] flex justify-center items-center">
                                                                <span>
                                                                  {applicantName?.[0]}
                                                                </span>
                                                              </div>

                                                          }
                                                          <div className="flex flex-col ">
                                                            <div className="flex space-x-1 items-center">
                                                              <span className="text-sm flex" >
                                                                {applicantName}
                                                              </span>
                                                              <span className="text-sm text-[#2676c2]">
                                                                <MdVerified />
                                                              </span>
                                                            </div>
                                                            <span className="text-sm">
                                                              {applicantDesignation}
                                                            </span>
                                                          </div>

                                                        </div>

                                                      </div>
                                                    </div>
                                                  </div>
                                                })
                                              }
                                            </>
                                            :
                                            <div className="flex justify-center items-center bg-[#f4f6f7] w-full h-[98%]">
                                              <span className="text-[#2676c2] font-medium font-['Poppins']">
                                                No Applicants Yet !
                                              </span>
                                            </div>
                                        }
                                      </div>

                                      <div className={`${training?.applicants?.length === 0 ? 'hidden' : ' absolute bottom-12 right-12'}`}>
                                        <button
                                          onClick={enableTrainingStatusHandler}
                                          className="bg-green-600 text-white font-medium text-sm h-[30px] w-[60px] rounded-[5px]">
                                          Assign
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="w-full h-full p-[10px] ">
                            <div className="w-full h-full rounded-[0.5rem] border border-[#eee] bg-[#2676c21a] p-[10px]  ">
                              <div className="flex items-center gap-1">
                                <span className=" text-md font-medium font-['Poppins']">
                                  Total Applicant's
                                </span>
                                <span className=" bg-[#2676c2] flex justify-center items-center rounded-full w-5 h-5 text-xs text-white ">{training?.applicants?.length > 0 ? training?.applicants?.length : 0}</span>
                              </div>
                              <div className="UsersContainer border bg-white rounded-md h-[88%] w-full mt-[5px] p-[10px] space-y-1 overflow-y-scroll">
                                {
                                  training?.applicants?.length > 0 ?
                                    <>

                                      {

                                        training?.applicants?.map(({ appliedBy, applicantName, applicantDesignation, appliedStatus, applicantProfileImg, application }) => {

                                          return <div className="">
                                            <div className="w-full h-[50px]  rounded-sm p-[5px] flex justify-between items-center hover:bg-[#2676c21a]  border-b">

                                              <div onClick={() => {
                                                setShowModel(!showModel)
                                                setSelectedTrainer(appliedBy)
                                              }} className="flex justify-start items-center gap-3 cursor-pointer">
                                                {
                                                  applicantProfileImg ?
                                                    <img className="h-[40px] w-[40px] rounded-[50%] "
                                                      src={applicantProfileImg}
                                                    />
                                                    :
                                                    <div className="h-[40px] w-[40px] rounded-[50%] bg-[#2676c21a] flex justify-center items-center">
                                                      <span>
                                                        {applicantName?.[0]}
                                                      </span>
                                                    </div>

                                                }
                                                <div className="flex flex-col w-[50%] ">
                                                  <div className="flex space-x-1 items-center">
                                                    <span className="text-sm  text-ellipsis overflow-hidden whitespace-nowrap" >
                                                      {applicantName}
                                                    </span>
                                                    <span className="text-sm text-[#2676c2]">
                                                      <MdVerified />
                                                    </span>
                                                  </div>
                                                  <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                                                    {applicantDesignation}
                                                  </span>
                                                </div>

                                              </div>
                                              {
                                                application === 'Pending' ? <div className="mr-[10px]">
                                                  <div className="space-x-3">
                                                    <button
                                                      onClick={() => { dispatch(updatedApplicationStatus(appliedBy, training?._id, 'Accepted')) }}
                                                      className="bg-green-600 text-white font-medium text-sm h-[25px] w-[60px] rounded-[5px]">
                                                      Accept
                                                    </button>
                                                    <button
                                                      onClick={() => { dispatch(updatedApplicationStatus(appliedBy, training?._id, 'Denied')) }}
                                                      className=" hover:bg-red-700 font-medium hover:text-white h-[24px] w-[60px] rounded-[5px] outline outline-red-700 outline-1  text-red-700 text-sm ">
                                                      Decline
                                                    </button>
                                                  </div>
                                                </div>
                                                  :
                                                  null
                                              }
                                              {
                                                application === 'Accepted' ? <div className="mr-[10px]">
                                                  <div className="space-x-7">
                                                    <button
                                                      onClick={() => navigate('/employerDashboard/messages')}
                                                      className="bg-[#2676c2] text-white font-medium text-sm h-[25px] w-[60px] rounded-[5px]">
                                                      Chat
                                                    </button>

                                                  </div>
                                                </div>
                                                  : null
                                              }


                                            </div>
                                          </div>
                                        })
                                      }
                                    </>
                                    :
                                    <div className="flex justify-center items-center bg-[#f4f6f7] w-full h-[98%]">
                                      <span className="text-[#2676c2] font-medium font-['Poppins']">
                                        No Applicants Yet !
                                      </span>
                                    </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </>

              </>
            })
          }

        </>
          :
          <div className=" flex justify-center items-center w-full h-[300px] bg-[#f4f6f7]">
            <span>
              No Training Posted Yet !
            </span>
          </div>
      }

    </>

    // <>
    //   <div>
    //     <div className="w-full  lg:h-[350px]  flex gap-2 p-[10px] ">
    //       <div className="h-full p-[15px]  w-[30%] shadow rounded-tl-md rounded-bl-md   capitalize">
    //         <div className=" p-[] flex flex-col gap-2   ">
    //           <div>
    //             <h1 className=" font-medium lg:text-[16px] md:14px">
    //               Training Programing Name
    //             </h1>
    //             <span className="text-[#2676c2] font-[400] lg:text-[14px] md:text-[12px] truncate ">
    //               Full Stack Java Program
    //             </span>
    //           </div>

    //           <div>
    //             <h1 className="text-[16px]">
    //               Training Topics & Subjects
    //             </h1>

    //             <div className="flex flex-col gap-1 text-[14px] text-[#535353]">
    //               <span className="text-[#535353] truncate">
    //                 Java , Js, Python , React Navtive Html,Csss...
    //               </span>
    //               <span className="text-[#535353] truncate">
    //                 Java , Js, Python , React Navtive...
    //               </span>
    //               {/* <span className="text-[#535353]">
    //                 Java , Js, Python , React Navtive,
    //               </span> */}
    //             </div>
    //           </div>
    //           <div>
    //             <h1 className="text-[16px]">
    //               Type Of Training
    //             </h1>
    //             <span className="text-[#535353] text-[14px]">
    //               Online Training
    //             </span>
    //           </div>
    //           <div>
    //             <h1>
    //               Duration Of Training
    //             </h1>
    //             <span className="text-[#535353] text-[14px]">
    //               Online Training
    //             </span>
    //           </div>
    //           <div className="flex gap-[50px]">
    //             <div>
    //               <h1 className="text-[16px]">
    //                 Start Date
    //               </h1>
    //               <span className="text-[#535353] text-[14px]">
    //                 01-12-2023
    //               </span>
    //             </div>
    //             <div>
    //               <h1 className="text-[16px] ">
    //                 End Date
    //               </h1>
    //               <span className="text-[#535353] text-[14px]">
    //                 01-12-2023
    //               </span>
    //             </div>
    //           </div>


    //         </div>


    //       </div>
    //       <div className="h-full w-[70%] shadow rounded-tr-md rounded-br-md   capitalize">
    //         <div className="flex w-full h-full">
    //           <div className="w-[30%] h-[70%] flex flex-col justify-center p-[10px] gap-[20px]">
    //             <div>
    //               <h1>
    //                 Total Application
    //               </h1>
    //               <span className="text-[28px] text-[#2676c2] font-[500]">
    //                 10
    //               </span>
    //             </div>
    //             <div>
    //               <h1>
    //                 Mode
    //               </h1>
    //               <span className="text-[#535353]">
    //                 Online
    //               </span>
    //               {/* <span>
    //                 Offline
    //               </span> */}
    //             </div>
    //             <div className="flex gap-5">
    //               <button className="w-[80px] h-[25px] text-[12px] p-[1px] rounded-[8px] border border-[#2676c2] text-[#2676c2] hover:bg-[#2676c2] hover:text-white">
    //                 Delete
    //               </button>
    //               <button className="w-[80px] h-[25px] border border-[#2676c2] rounded-[8px] bg-[#2676c2] text-white text-[12px] ">
    //                 Assign
    //               </button>
    //             </div>
    //           </div>
    //           <div className="w-[70%] h-full ">

    //           </div>
    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // </>

  );
};

export default EmployerPosted;
