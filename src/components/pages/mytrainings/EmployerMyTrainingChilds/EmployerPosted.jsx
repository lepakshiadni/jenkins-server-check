// EmployerPosted.js
import React, { useState, useEffect } from "react";
import PeofilePic from "../../../assets/profileTrainer.png";
import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { deletePostTrainingRequirement, getPostTrainingRequirementAction, updatedApplicationStatus } from '../../../../redux/action/postRequirement.action'
import { useDispatch, useSelector } from 'react-redux'
import { MdVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import TrainerProfilePopUp from '../../../utils/TrainerProfilePopUp'


const EmployerPosted = () => {

  const [seletedTraining, setSeletedTraining] = useState(null)
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const [showModel, setShowModel] = useState(false)

  useEffect(() => {
    dispatch(getPostTrainingRequirementAction())
  }, [dispatch])

  const postDetails = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails
  })



  const togglePopup = (post) => {
    setIsVisible(!isVisible);

  };
  const [isVisible, setIsVisible] = useState(false);
  const deleteTrainingHandler = () => {
    dispatch(deletePostTrainingRequirement(seletedTraining?._id))
    // console.log('postId',seletedTraining?._id)
    setIsVisible(!isVisible);

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
                <div className="Training_Programs">
                  <div className="Training_Programm">
                    <div className="Trainer_Infoo">
                      <div className="TTTDD">
                        <p>Training Program Name</p>
                        <h3 className="Blue_H22 truncate ...">{training?.trainingName}</h3>
                        <p>Training Topics & Subjects</p>
                        <div className=" capitalize">
                          <div className=" flex space-x-2">{training?.topics?.slice(0, 5)?.map((items) => <h2>{items}</h2>)}</div>
                          {/* <div className="bg-[#8888] w-[1px]"></div> */}
                          <div className="flex space-x-2">{training?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                        </div>
                        <p>Type Of Training</p>
                        <h2>{training.typeOfTraining}</h2>
                        <p>Duration Of Training</p>
                        <h2 className=" capitalize">{training.durationCount} {training?.durationType}{training?.durationCount > 1 ? "'s" : null}</h2>
                        <div className="SDEDD">
                          <div className="SDD">
                            <p>Start Date</p>
                            <h2>{training.startDate}</h2>
                          </div>
                          <div className="EDD">
                            <p>End Date</p>
                            <h2>{training.endDate}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Program_Info">

                      <div className="Program_Status">
                        <div className="Total_Part">
                          <p
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "1rem",
                              margin: "0%",
                            }}
                          >
                            Total Applicant's
                          </p>
                          <div className="P205">
                            <h1>
                              {training?.applicants?.length > 0 ? training?.applicants?.length : 0}
                            </h1>
                          </div>
                          <p>Mode</p>
                          <h2>{training.modeOfTraining}</h2>
                          <div>
                            {
                              training?.modeOfTraining === 'offline' ?
                                <>
                                  <p>Location</p>
                                  <h2>{training?.location}</h2>
                                </>
                                :
                                null
                            }

                          </div>
                          <div className="DELDIT" onClick={() => { setSeletedTraining(training) }} >
                            <button className="Del" onClick={togglePopup}>
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
                                    // padding: "20px",
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
                                  // style={{ marginTop: "68px", marginLeft: "35%" }}
                                  >
                                    <button onClick={deleteTrainingHandler} className="Del">Delete</button>
                                    <button className="Edt" onClick={togglePopup}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-[80%] h-full rounded-[0.5rem] border border-[#eee] bg-[#2676c21a] p-[10px]  ">
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

                                    training?.applicants?.map(({ appliedBy, applicantName, applicantDesignation, appliedStatus, applicantProfileImg,application }) => {
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
                                          {
                                            application === 'Pending' ? <div className="mr-[10px]">
                                              <div className="space-x-7">
                                                <button
                                                  onClick={()=>{dispatch(updatedApplicationStatus(appliedBy,training?._id,'Accepted'))}}
                                                  className="bg-green-600 text-white font-medium text-sm h-[25px] w-[60px] rounded-[5px]">
                                                  Accept
                                                </button>
                                                <button
                                                  onClick={()=>{dispatch(updatedApplicationStatus(appliedBy,training?._id,'Denied'))}}
                                                 className=" hover:bg-red-700 font-medium hover:text-white h-[24px] w-[60px] rounded-[5px] outline outline-red-700 outline-1  text-red-700 text-sm ">
                                                  Decline
                                                </button>
                                              </div>
                                            </div>
                                              :
                                              <div className="mr-[10px]">
                                                <div className="space-x-7">
                                                  <button
                                                  onClick={()=>navigate('/employerDashboard/messages')}
                                                   className="bg-[#2676c2] text-white font-medium text-sm h-[25px] w-[60px] rounded-[5px]">
                                                    Chat
                                                  </button>

                                                </div>
                                              </div>
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

  );
};

export default EmployerPosted;
