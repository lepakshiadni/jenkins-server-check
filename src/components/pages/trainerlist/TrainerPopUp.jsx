import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { Avatar, Stack, styled } from "@mui/material";
import Slider from "@mui/material/Slider";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/TrainersList.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getPostTrainingRequirementAction } from '../../../redux/action/postRequirement.action'
import {addApplicationRequest} from '../../../redux/action/employers.action'
import Axios from 'axios'
import { toast } from "react-toastify";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#2676c2",
  "& .MuiSlider-rail": {
    backgroundColor: "#2676c2",
  },
  "& .MuiSlider-track": {
    transition: "background-color 0.3s ease", // Add transition for color change
  },
  "& .MuiSlider-thumb": {
    display: "none", // Hide the slider button
  },
  "&:hover .MuiSlider-track": {
    backgroundColor: "#585858", // Change color on hover
  },
}));
 
function TrainerPopUp(props) {
  const { trigger, setTrigger,id } = props;
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  const dispatch = useDispatch()  
  const [seletedUser,setSeletedUser]=useState(null);
  const [feedBack,setFeedBack]=useState()
  // console.log('pros',id)
  const navigatePostRequirement = () => {
    navigate("/employerDashboard/postarequirements/post-training")
  };
  const [selectedTraining, setSelectedTraining] = useState(null)
  // console.log('selectedTraining')
  useEffect(() => {
    Axios.get(`${baseUrl}/employer/getTrainerDetailsById/${id}`)
      .then((resp) => {
        setSeletedUser(resp.data?.trainerDetails)
        // console.log('respdata',resp.data)
        setFeedBack(resp.data?.findFeedBack?.[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
  // console.log('feedback',feedBack)
  const postDetails = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails?.slice(0, 8)
  })

  useEffect(() => {
    dispatch(getPostTrainingRequirementAction())
  }, [dispatch])
  // console.log(postDetails)
  const selectTrainingHandler = (training) => {
    setSelectedTraining(training)
  }
  const trainingDetails={
    trainingPostDetails:selectedTraining
  }
  const addApplicationRequestHanlder= async()=>{
    if(selectedTraining===null){
      alert("Please Select a Training from Listing!")
    }
    else{    
     await dispatch(addApplicationRequest(seletedUser, trainingDetails))
     props.setTrigger(false)
     toast.success('Request Sended')
    }

  }
  return trigger ? (
    <>
      <div className=" trainerHirePopup w-full flex justify-center items-center">
        <div className="main1 w-6/12 ml-[70px] h-screen bg-white rounded-[20px] border">
          <div className="flex justify-between items-center">
            <p style={{ fontSize: "18px", fontWeight: "500px" }}>
              About Trainers
            </p>
            <div className="hover:bg-[#2677c236] rounded-full mb-1">
              <CloseIcon
                sx={{
                  position: "relative",
                  fontSize: "xx-large",
                  color: "#2676c2",
                  cursor: "pointer",
                }}
                onClick={() => setTrigger(false)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6/12 ">
              <div className="trainerProfileName w-full">

                {
                  seletedUser?.basicInfo?.profileImg ?
                    <img
                      src={seletedUser?.basicInfo?.profileImg}
                      alt=""
                      width={93.53}
                      height={109.94}
                      style={{ border: "none", outline: "none", borderRadius: '5px' }}
                    />
                    :
                    <div className="flex justify-center items-center w-[93.5px] h-[109.94px] rounded-[5px] bg-slate-300">
                      <span className=" capitalize text-4xl">
                        {seletedUser?.fullName[0]}
                      </span>
                    </div>
                }
                <div className="name-details ">
                  <p
                    style={{
                      color: "#2676c2",
                      fontSize: "20px",
                      fontWeight: "500px",
                    }}
                  >
                    {seletedUser?.basicInfo?.firstName + seletedUser?.basicInfo?.lastName || seletedUser?.fullName}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400px",
                      color: "rgba(106, 106, 106, 1)",
                    }}
                  >
                    {seletedUser?.basicInfo?.designation}
                  </p>
                </div>
              </div>
              <div className="ratingDownbox w-full">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "400px",
                      color: "rgba(106, 106, 106, 1)",
                    }}
                  >
                    4/5
                  </p>
                  {/* <Rating
                    name="size-large"
                    defaultValue={3.6}
                    id="rating"
                    sx={{ fontSize: "45px" }}
                    precision={0.1}
                  /> */}
                  <Rating
                    name="size-large"
                    max={5}
                    icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 70 }} />}
                    emptyIcon={<StarBorderIcon sx={{ fontSize: 70, color: "DFDFDF" }} />}
                    precision={0.5}
                    value={feedBack?.averageRating}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="w-6/12 sidebox flex justify-center items-center">
              <div className="w-[90%]">
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Post requirements{" "}
                  {
                    postDetails?.length > 0 ?
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "500px",
                          color: "#2676c2",
                          cursor: "pointer",

                        }}
                        onClick={navigatePostRequirement}
                      >
                        Create Post +
                      </p>
                      :
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "500px",
                          color: "#ffff",
                          cursor: "pointer",
                          backgroundColor: '#2676c2',
                          borderRadius: '5px',
                          width: '100px',
                          alignItems: 'center',
                          display:"flex",
                          justifyContent: 'center'

                        }}
                        onClick={navigatePostRequirement}
                      >
                        Create Post +
                      </p>
                  }

                </p>{" "}
                <br />
                {
                  postDetails?.length > 0 ?
                    <div className="radios flex flex-col ">
                      {
                        postDetails?.map((training) => {
                          return <>
                            <label htmlFor="" className="items-center">
                              <input onChange={() => { selectTrainingHandler(training) }} type="radio" name="slctone" value={training?.trainingName} />
                              {training?.trainingName}
                            </label>
                          </>
                        })
                      }
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingRight: "10px",
                          //   paddingTop: "20px",
                        }}
                      >
                      </div>
                    </div>
                    :
                    "No Requirements  Yet!"
                }

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <button onClick={addApplicationRequestHanlder} className={`${selectedTraining ? "buttonnActive":"buttonn"}   `}>Send request</button>
                </div>
              </div>

            </div>{" "}
            <br />
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default TrainerPopUp;
