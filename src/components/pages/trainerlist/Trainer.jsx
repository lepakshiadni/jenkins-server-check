import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css'
import "../../styles/TrainersList.css";
import LocationIcon from "../../assets/LocationIcon.svg";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import Axios from 'axios'
const Trainers = ({ trainerFilteredData }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  console.log("baseUrl", baseUrl)
  // const navigate = useNavigate();
  const location = useLocation();
  const [selecteduser, setSelecteduser] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [trainerDetails, setTrainerDetails] = useState([])

  // useEffect(() => {
  //   Axios.get(`${baseUrl}/trainer/getAllTrainerDetails`)
  //     .then((resp) => {
  //       setTrainerDetails(resp.data?.trainerDetails)

      
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  useEffect(() => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    }

    if (trainerFilteredData?.length > 0) {
      setTrainerDetails(shuffleArray(trainerFilteredData))
    }
    else{
      setTrainerDetails(shuffleArray(trainerFilteredData))
    }


  }, [location.pathname,trainerFilteredData])
  



  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  let menuRef = useRef();

  // const handleIconClick = () => {
  //   setIsSelected(!isSelected);
  // };
  // const handlenavigation = () => {
  //   if (location.pathname === "/employerDashboard/trainerlist") {
  //     navigate(`/employerDashboard/trainerlist/trainerlistprofile`);
  //   }
  // };
  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  console.log('selectedUser', selecteduser)
  return (
    <>
      <div
        className="trainers-list"
      >
        {
          trainerDetails?.length > 0 ?
            <>

              {trainerDetails?.map((trainer, index) => {
                // console.log('trainer',trainer)
                return (

                  <>
                    <div>
                      <Link to={`/employerDashboard/trainerlist/trainerlistprofile/${trainer?._id}`}>
                        <div>
                          <div
                            key={index}
                            className={`trainer-card ${hoveredIndex === index ? "hovered" : ""
                              }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            <div className="card-face card-front">
                              <div>
                                {
                                  trainer?.basicInfo?.profileImg ?
                                    <img
                                      src={trainer?.basicInfo?.profileImg}
                                      alt={`Profile of ${trainer?.fullName}`}
                                      className="profile-img"
                                    />
                                    :
                                    <div className="flex justify-center items-center bg-[#2676c2] w-[120px] h-[130px] rounded-[20%]">
                                      <span className="capitalize text-4xl">{trainer?.fullName[0]}</span>
                                    </div>
                                }
                              </div>
                              <div style={{ marginTop: "5px", textAlign: "center", justifyContent:'center' }}>
                                <h3
                                  style={{
                                    color: "#2676C2",
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                  }}
                                >
                                  {trainer?.basicInfo?.firstName ? trainer?.basicInfo?.firstName : trainer?.fullName}
                                </h3>
                                <p
                                  style={{
                                    color: "#6A6A6A",
                                    fontSize: " 0.875rem",
                                    fontWeight: "400",
                                  }}
                                >
                                  {trainer?.basicInfo?.designation}
                                </p>
                                <Stack
                                  spacing={1}
                                  sx={{ width: "6rem", height: "0.95363rem" }}
                                  direction="row"
                                  alignItems="center"
                                  justifyContent='center'
                                  
                                >
                                  <Rating
                                    name={`rating-${index}`}
                                    value={trainer.star}
                                    precision={1}
                                    readOnly
                                    sx={{
                                      color: "#FFDE30",
                                      "& .MuiRating-iconFilled": {
                                        color: "#FFDE30",
                                      },
                                      "& .MuiRating-iconEmpty": {
                                        borderColor: "#FFDE30",
                                      },
                                    }}
                                  />
                                </Stack>
                              </div>
                              <div className="image-row flex items-end gap-1">
                                {trainer?.skills?.slice(0, 4)?.map(({ name, image }) => {
                                  // console.log(items[0])
                                  return (
                                    <>
                                      <div className="  ">
                                        {
                                          image ?
                                            <img className="w-[30px] h-[30px] " src={image} alt="" />
                                            :

                                            <div className=" mt-2 flex justify-center items-center w-[30px] h-[30px] bg-slate-400 rounded-full">
                                              <span className=" capitalize text-black text-sm">{name[0]}</span>
                                            </div>
                                        }
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="card-face card-back">
                              <div className="card-back-top">
                                <div className="card-back-image">
                                  {
                                    trainer?.basicInfo?.profileImg ?
                                      <img
                                        src={trainer?.basicInfo?.profileImg}
                                        alt={`Profile of ${trainer?.fullName}`}
                                        className="profile-img-back"
                                      />
                                      :
                                      <div className="flex justify-center items-center bg-[#2676c2]  h-[90px] w-[82px]  rounded-[20%]">
                                        <span className="capitalize text-4xl">{trainer?.fullName[0]}</span>
                                        {/* <img  className =" "alt="" src={UserAvatar}/> */}
                                      </div>
                                  }
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={LocationIcon}
                                      style={{ height: "0.9rem", color: "#2676C2" }}
                                      alt=""
                                    />
                                    <span
                                      style={{
                                        fontSize: "0.8rem",
                                        fontWeight: "400",
                                        color: "#6A6A6A",
                                      }}
                                    >
                                      {" "}
                                      {trainer?.basicInfo?.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="card-back-content">
                                  <h3 className="card-back-name">
                                    {trainer?.fullName?.split(' ')?.[0]}
                                  </h3>
                                  <p className="card-back-domain "
                                    style={{
                                      color: "#6A6A6A",
                                      fontSize: " 13px",
                                      fontWeight: "400",
                                    }}>
                                    {trainer?.basicInfo?.designation}
                                  </p>
                                  <h4 className="card-back-exp flex justify-end items-center">
                                    <p>{trainer?.experiences?.experience ?
                                      trainer?.experiences?.experience :
                                      trainer?.experience
                                    } Years</p>
                                  </h4>
                                  <Stack
                                    spacing={1}
                                    sx={{
                                      width: "6rem",
                                      height: "0.95363rem",
                                      marginTop: "0.31rem",
                                      marginLeft: "1.11rem",
                                    }}
                                    direction="row"
                                    alignItems="center"
                                  >
                                    <Rating
                                      name={`rating-${index}`}
                                      value={trainer.star}
                                      precision={1}
                                      readOnly
                                      sx={{
                                        color: "#FFDE30", // Default color for all stars (grey border for empty stars)
                                        "& .MuiRating-iconFilled": {
                                          color: "#FFDE30", // Filled stars will be yellow
                                        },
                                        "& .MuiRating-iconEmpty": {
                                          borderColor: "#FFDE30", // Outline color for empty stars
                                        },
                                      }}
                                    />
                                  </Stack>
                                  <h4 className="session-list ">
                                    <span className="session-list-span">
                                      + {trainer?.experiences?.trainingSession} Training Session
                                    </span>
                                  </h4>
                                </div>
                              </div>
                              <div className="slider-container-parent h-[124px]">
                                {trainer?.skills?.slice(0, 4)?.map((val, index) => {
                                  return (

                                    <div key={index} className="slider-container-child">
                                      {
                                        val.image ?
                                          <img src={val.image} alt="" className="w-5 h-5" />
                                          :
                                          <div className="flex justify-center items-center w-5 h-5 bg-slate-300 rounded-full">
                                            <span className=" capitalize text-black text-sm">
                                              {val?.name[0]}
                                            </span>
                                          </div>
                                      }
                                      <input
                                        className="relative rounded-[5px]]"
                                        type="range"
                                        min="0"
                                        max="15"
                                        value={val.range}
                                      />
                                      <span className="slider-span">
                                        {val.range} yrs
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                              <p className="trainer-available flex justify-center items-center">
                                <span>Avail On {trainer?.contactInfo?.availableDate.slice(0, 10)}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                );
              })}
            </>
            :
            <div className="w-full h-[400px] flex justify-center items-center">
              <span>
                No trainers found.
              </span>
            </div>
        }
      </div>
    </>
  );
};

export default Trainers;
