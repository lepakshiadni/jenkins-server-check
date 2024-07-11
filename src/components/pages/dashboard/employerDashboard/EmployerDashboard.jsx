
import React, { useEffect, useState, useRef } from "react";
import Axios from 'axios'
import { io } from "socket.io-client";
import "../../../styles/Dashboard.css"; // Import your CSS file for styling
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useDispatch, useSelector } from "react-redux";
import { employerDetails, getConversation } from "../../../../redux/action/employers.action";
import { IoIosArrowUp } from "react-icons/io";
import { option } from "./EmployerData";
import { NavLink, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import EmployerDashboardData from '../employerDashboard/EmployerDashboardData'
import Trainers from "../../trainerlist/Trainer";
import TrainerListProfile from "../../trainerlist/TrainerListProfile";
import Requirements from "../../postrequirements/Requirements";
import Chat from "../../messages/Chat";
import EmployerSettings from "../../settings/employerSetting/EmployerSettings";
import TrainingResources from "../../trainingresourecs/EmployerTrainingResource";
import PostJobSection from "../../postrequirements/PostRequirements/PostJob";
import PostTrainingSection from "../../postrequirements/PostRequirements/PostTraining";
import EmployerMyTraining from "../../mytrainings/EmployerMyTraining";
import EmployerPosted from "../../mytrainings/EmployerMyTrainingChilds/EmployerPosted";
import EmployerOngoing from "../../mytrainings/EmployerMyTrainingChilds/EmployerOngoing";
import EmployerCompleted from "../../mytrainings/EmployerMyTrainingChilds/EmployerCompleted";
import EmployerFeed from '../../feed/employerfeed/EmployerFeed';
import EmployerProposalManagement from '../../proposalMangement/EmployerProposalManagement';
import EmployerProposalCandidacy from '../../proposalMangement/Employerproposalmanagement/EmpProposalCandidacy';
import EmployerProposalRequest from '../../proposalMangement/Employerproposalmanagement/EmpProposalRequest';
import EmployerHelpSupport from "../../help&support/EmployerHelpSupport";
import EmployerHeader from "../../../header&footer/EmployerHeader";
import EmployerMyPosts from '../../myposts/EmployerMyPosts';
import ProfileComplition from "../../../utils/ProfileComplition";
import TrainerProfilePopUp from '../../../utils/TrainerProfilePopUp'
import { getTrainerCreatePost } from "../../../../redux/action/trainercreatepost.action";
import HelpPage from "../../help&support/employerhelp&support/helpPage";
import HelpPage2 from "../../help&support/employerhelp&support/helpPage2";
import HelpPage3 from "../../help&support/employerhelp&support/helpPage3";
import HelpPage4 from "../../help&support/employerhelp&support/helpPage4";
import HelpPage5 from "../../help&support/employerhelp&support/helpPage5";
import EmployerAccountPreferance from "../../settings/employerSetting/employerAccountPreference";
import EmployerLoginSecurity from "../../settings/employerSetting/employerLoginSecurity";
import EmployerVisibility from "../../settings/employerSetting/employerVisibility";
import EmployerNotifications from "../../settings/employerSetting/employerNotification";
import EmployerCreatePostPopUp from "../../../utils/EmployerCreatePostPopUp";

const DashboardApp = () => {

  const [prevSelectedOption, setPrevSelectedOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const [show, setShow] = useState(false)
  const baseUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const location = useLocation();
  const socket = useRef();


  const newUser = localStorage.getItem("newUser");
  useEffect(() => {
    if (newUser) {
      setShow(newUser)
    }
    const clearNewUser = () => {
      setTimeout(() => {
        localStorage.removeItem('newUser')
      }, [5000])
    }
    if (newUser === 'true') {
      clearNewUser()
    }
  }, [newUser])
  const handleOptionClick = (option) => {
    if (selectedOption !== option) {
      setPrevSelectedOption(selectedOption);
    }
    setSelectedOption(option);
  };

  const [trainerFilteredData, setTrainerFilteredData] = useState([]);
  const [storeLoc, setStoreLoc] = useState([])
  const [storedesignation, setStoreDesignation] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilter2, setSelectedFilter2] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [model, setModel] = useState(false)

  const [trainerDetails, setTrainerDetails] = useState([])

  useEffect(() => {
    dispatch(getTrainerCreatePost())
  }, [dispatch, location.pathname])


  const trainerPost = useSelector(({ trainerCreatePost }) => {
    return trainerCreatePost?.trainerCreatePostDetails?.trainercreatePost
  })
  const employer = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails?.employerDetails;
  });
  useEffect(() => {
    dispatch(employerDetails());
    dispatch(getConversation(employer?._id))
  }, [dispatch]);
  // console.log('employer', employer);
  useEffect(() => {
    socket.current = io(`http://192.168.1.109:4040`, {
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "value",
      },
    });

  }, []);
  useEffect(() => {
    if (employer) {
      socket.current.emit("addUser", employer?._id);
      socket.current.on("getUsers", (users) => {
        console.log(users);
      });
    }
  }, [employer]);
  const [postrainingData, setPosttrainingData] = useState([])

  useEffect(() => {
    Axios.get(`${baseUrl}/trainer/getAllTrainerDetails`)
      .then((resp) => {
        setTrainerDetails(resp.data?.trainerDetails)
        setSelectedFilter("")
        setSelectedFilter2("")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [location.pathname])

  useEffect(() => {
    if (Array.isArray(trainerPost)) {

      let filteredData2 = trainerPost;
      if (searchTerm) {
        filteredData2 = filteredData2.filter(item =>
          Object.values(item).some(value => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (typeof value === 'object' && value !== null) {
              return Object.values(value).some(subValue =>
                typeof subValue === 'string' && subValue.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
            return false;
          })
        );
      }
      setPosttrainingData(filteredData2)
    }
  }, [trainerPost, searchTerm])


  useEffect(() => {
    if (Array.isArray(trainerDetails)) {

      const Loc = trainerDetails.map((val) => val?.basicInfo?.location).filter(loc => loc !== undefined);
      const UniqueLoc = [...new Set(Loc)]; // Filter out duplicate locations
      setStoreLoc(UniqueLoc);

      const Designation = trainerDetails.map((val) => val?.basicInfo?.designation).filter(designation => designation !== undefined);
      const UniqueDesignation = [...new Set(Designation)]; // Filter out duplicate designations
      setStoreDesignation(UniqueDesignation);

      let filteredData = trainerDetails;
      // console.log(filteredData);

      if (searchTerm) {
        filteredData = filteredData.filter(item =>
          Object.values(item).some(value => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (typeof value === 'object' && value !== null) {
              return Object.values(value).some(subValue =>
                typeof subValue === 'string' && subValue.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
            return false;
          })
        );
      }

      if (selectedFilter) {
        filteredData = filteredData.filter(item => item?.basicInfo?.location === selectedFilter)
      }
      if (selectedFilter2) {
        filteredData = filteredData.filter(item => item?.basicInfo?.designation === selectedFilter2)
      }

      setTrainerFilteredData(filteredData);

    }
  }, [trainerDetails, searchTerm, selectedFilter, selectedFilter2])


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (selectedValue) => {
    setSelectedFilter(selectedValue);
  };
  const handleFilterChange2 = (selectedValue) => {
    setSelectedFilter2(selectedValue);
  };




  useEffect(() => {
    // Update the selectedOption based on the current location
    const currentOption = option.find((opt) => {
      if (
        location.pathname.startsWith("/employerDashboard/postarequirements") ||
        location.pathname.startsWith(
          "/employerDashboard/postarequirements/post-training"
        ) ||
        location.pathname.startsWith(
          "/employerDashboard/postarequirements/post-job"
        )
      ) {
        return opt.name === "Post a Requirements";
      }
      if (
        location.pathname.startsWith("/employerDashboard/proposalsmanagement") ||
        location.pathname.startsWith(
          "/employerDashboard/proposalsmanagement/candidacy"
        ) ||
        location.pathname.startsWith(
          "/employerDashboard/proposalsmanagement/proposals"
        )
      ) {
        return opt.name === "Proposals Management";
      }
      if (
        location.pathname.startsWith("/employerDashboard/mytrainingmanagement")
      ) {
        if (
          location.pathname.startsWith(
            "/employerDashboard/mytrainingmanagement/posted"
          ) ||
          location.pathname.startsWith(
            "/employerDashboard/mytrainingmanagement/ongoing"
          ) ||
          location.pathname.startsWith(
            "/employerDashboard/mytrainingmanagement/completed"
          )
        ) {
          return opt.name === "My Training Management";
        }
        return location.pathname.includes(
          opt.name.replace(/\s/g, "").toLowerCase()
        );
      }
      if (location.pathname.startsWith("/employerDashboard/trainerlist")) {
        // Check if the current path starts with the parent route or its child routes
        if (
          location.pathname.startsWith("/employerDashboard/trainerlist") ||
          location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile")
        ) {
          return opt.name === "TrainerList"; // Set the active state for the parent route
        }
        return location.pathname.includes(
          opt.name.replace(/\s/g, "").toLowerCase()
        );
      } else {
        return location.pathname.includes(
          opt.name.replace(/\s/g, "").toLowerCase()
        );
      }
    });
    if (currentOption) {
      setSelectedOption(currentOption.name);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="relative w-full">
        <div className="w-full">
          <EmployerHeader handleInputChange={handleInputChange} />
          {
            newUser ? <>
              <ProfileComplition trigger={show} setTrigger={setShow} />
            </>
              :
              null
          }
        </div>
        <div className="Reactangle-dash w-full flex">
          <div className="Rectangle-side w-[290px] bg-white mt-[2px] shadow truncate ...">
            {option.map(({ name, icon }) => {
              let toPath = `/employerDashboard/${name
                .replace(/\s/g, "")
                .toLowerCase()}`;
              if (name === "Post a Requirements") {
                toPath = "/employerDashboard/postarequirements/post-training";
              }
              if (name === "My Training Management") {
                toPath = "/employerDashboard/mytrainingmanagement/posted";
              }
              if (name === "Proposals Management") {
                toPath = "/employerDashboard/proposalsmanagement/candidacy";
              }
              if (name === 'TrainerList') {
                toPath = '/employerDashboard/trainerlist';
              }
              return (
                <NavLink
                  key={name}
                  to={toPath}
                  className={`sidebar-option  ${selectedOption === name ? "active" : ""
                    } ${prevSelectedOption === name ? "reverse" : ""}`}
                  activeClassName="active"
                  onClick={() => handleOptionClick(name)}
                >
                  <ArrowForwardIosOutlinedIcon className="arrow-icon" />
                  {/* {selectedOption === "Billing & Payments" ? (
                    <HttpsIcon className="arrow-icon" />
                  ) : (
                    <ArrowForwardIosOutlinedIcon className="arrow-icon" />
                  )} */}
                  {icon}
                  {name}
                </NavLink>
              );
            })}
            {/* </div> */}
          </div>
          <div className="Reactangle-right w-9/12 ml-[20px]">
            <div className="dash_head z-10 h-[60px] pr-[20px] bg-white flex items-center justify-between" >
              <div className="Dashboard flex items-center text-zinc-500 text-base font-normal font-['Poppins'] space-x-3    ">
                <span> Dashboard</span>
                <span className="ml-[10px] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="#2676C2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px] ">
                  {selectedOption}
                </span>

                {/* //postrequirements */}
                <div
                  className={`${selectedOption === "Post a Requirements" ? "" : "hidden"
                    }`}
                >
                  <div className=" flex items-center  ">
                    <span className=" ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                      >
                        <path
                          d="M1 1L7 7L1 13"
                          stroke="#2676C2"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                      {location.pathname ===
                        "/employerDashboard/postarequirements/post-training"
                        ? "Post Training"
                        : ""}
                      {location.pathname ===
                        "/employerDashboard/postarequirements/post-job"
                        ? "Post Job"
                        : ""}
                    </span>
                  </div>
                </div>

                {/* //trainer list */}
                <div
                  className={` ${selectedOption === "TrainerList" || location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile") ? "relative" : "hidden"
                    }`}
                >
                  <div className=" flex items-center  ">
                    {
                      location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile") ?
                        (
                          <>
                            <span className=" ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="14"
                                viewBox="0 0 8 14"
                                fill="none"
                              >
                                <path
                                  d="M1 1L7 7L1 13"
                                  stroke="#2676C2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                              {location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile") ? "TrainerProfile" : ""}
                            </span>
                          </>
                        )
                        :
                        null
                    }
                  </div>
                </div>

                {/* //feed */}
                <div
                  className={` ${selectedOption === "Feed" || location.pathname.startsWith("/employerDashboard/feed/trainerlistprofile/") ? "relative" : "hidden"
                    }`}
                >
                  <div className=" flex items-center  ">
                    {
                      location.pathname.startsWith("/employerDashboard/feed/trainerlistprofile/") ?
                        (
                          <>
                            <span className=" ">

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="14"
                                viewBox="0 0 8 14"
                                fill="none"
                              >
                                <path
                                  d="M1 1L7 7L1 13"
                                  stroke="#2676C2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                              {location.pathname.startsWith("/employerDashboard/feed/trainerlistprofile/") ? "TrainerProfile" : ""}
                            </span>
                          </>
                        )
                        :
                        null
                    }
                  </div>
                </div>

                {/* //trainingmanagement */}

                <div className={` ${selectedOption === "My Training Management" ? "relative" : "hidden"
                  }`}>
                  {
                    location.pathname.startsWith("/employerDashboard/mytrainingmanagement/posted") ||
                      location.pathname.startsWith("/employerDashboard/mytrainingmanagement/ongoing") ||
                      location.pathname.startsWith("/employerDashboard/mytrainingmanagement/completed") ?
                      (
                        <div className=" flex items-center  ">
                          <span className=" ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="14"
                              viewBox="0 0 8 14"
                              fill="none"
                            >
                              <path
                                d="M1 1L7 7L1 13"
                                stroke="#2676C2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                            {
                              location?.pathname.includes('posted') ? 'Posted' :
                                location?.pathname.includes("ongoing") ? 'Ongoing' :
                                  location?.pathname.includes("completed") ? 'Completed' :
                                    null
                            }
                          </span>
                          {
                            location?.pathname.startsWith('/employerDashboard/mytrainingmanagement/posted/trainerlistprofile') ||
                              location?.pathname.startsWith('/employerDashboard/mytrainingmanagement/ongoing/trainerlistprofile') ||
                              location?.pathname.startsWith('/employerDashboard/mytrainingmanagement/completed/trainerlistprofile') ?
                              <div className=" flex items-center ml-[10px]  ">
                                <span className=" ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="14"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                  >
                                    <path
                                      d="M1 1L7 7L1 13"
                                      stroke="#2676C2"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                                  Trainer Profile
                                </span>
                              </div>
                              :

                              null
                          }
                        </div>
                      ) :

                      null
                  }

                </div>

                {/* // proposalmanagement */}


                <div className={` ${selectedOption === "Proposals Management" ? "relative" : "hidden"
                  }`}>
                  {
                    location.pathname.startsWith("/employerDashboard/proposalsmanagement/candidacy") ||
                      location.pathname.startsWith("/employerDashboard/proposalsmanagement/proposals") ?
                      (
                        <div className=" flex items-center  ">
                          <span className=" ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="14"
                              viewBox="0 0 8 14"
                              fill="none"
                            >
                              <path
                                d="M1 1L7 7L1 13"
                                stroke="#2676C2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                            {
                              location?.pathname.includes('candidacy') ? 'Candidacy' :
                                location?.pathname.includes("proposals") ? 'Proposals' :
                                  null
                            }
                          </span>
                          {
                            location?.pathname.startsWith('/employerDashboard/proposalsmanagement/candidacy/trainerlistprofile') ||
                              location?.pathname.startsWith('/employerDashboard/proposalsmanagement/proposals/trainerlistprofile') ?
                              <div className=" flex items-center ml-[10px]  ">
                                <span className=" ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="14"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                  >
                                    <path
                                      d="M1 1L7 7L1 13"
                                      stroke="#2676C2"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                                  Trainer Profile
                                </span>
                              </div>
                              :

                              null
                          }
                        </div>
                      ) :

                      null
                  }

                </div>

                {/* Help and Support */}

                <div
                  className={`${selectedOption === "Help & Support" ? "" : "hidden"
                    }`}
                >
                  {
                    location?.pathname.startsWith('/employerDashboard/help&support/sissoo-basics') ||
                      location?.pathname.startsWith('/employerDashboard/help&support/account%20&%20network') ||
                      location?.pathname.startsWith('/employerDashboard/help&support/profile-management') ||
                      location?.pathname.startsWith('/employerDashboard/help&support/sissoo-benifits') ||
                      location?.pathname.startsWith('/employerDashboard/help&support/sissoo-support') ?
                      (

                        <div className=" flex items-center  ">
                          <span className=" ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="14"
                              viewBox="0 0 8 14"
                              fill="none"
                            >
                              <path
                                d="M1 1L7 7L1 13"
                                stroke="#2676C2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                            {
                              location?.pathname.includes('sissoo-basics') ? 'Sissoo-Basics' :
                                location?.pathname.includes('account%20&%20network') ? 'Account & Network' :
                                  location?.pathname.includes('profile-management') ? 'Profile-Management' :
                                    location?.pathname.includes('sissoo-benifits') ? 'Sissoo-Benifits' :
                                      location?.pathname.includes('sissoo-support') ? 'Sissoo-Support' :
                                        null
                            }
                          </span>

                        </div>
                      ) : null
                  }
                </div>

              </div>

              <div>
                <div
                  className={` ${selectedOption === "TrainerList" || location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile/") ? "relative" : "hidden"
                    }`}
                >

                  <div className="dropdown-buttons">
                    <select className="accordionPost" style={{ backgroundColor: "#f9f9f9", border: "1px solid #dadada", outline: 'none', color: 'gray' }} value={selectedFilter} onChange={(e) => handleFilterChange(e.target.value)} >
                      <option value="" selected>Select Location</option>
                      {storeLoc.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>

                    <select className="accordionPost" style={{ backgroundColor: "#f9f9f9", border: "1px solid #dadada", outline: 'none', color: 'gray' }} value={selectedFilter2} onChange={(e) => handleFilterChange2(e.target.value)} >
                      <option value="" selected>Select Designation</option>
                      {storedesignation.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>
              <div>
                <div
                  className={` ${selectedOption === "Feed" ? "relative" : "hidden"
                    }`}
                >
                  <button
                    onClick={() => {
                      setModel(true);
                    }}
                    className="w-[161px] h-[40px] bg-[#2676C2] border rounded-lg text-white text-base font-medium font-['Poppins']"
                  >
                    Create a post +
                  </button>
                </div>
              </div>


            </div>




            <div className="content">
              <Routes>
                <Route path="dashboard" element={<EmployerDashboardData />} />
                <Route path="trainerlist/*" element={<Trainers trainerFilteredData={trainerFilteredData} />} />
                <Route path="trainerlist/trainerlistprofile/:id" element={<TrainerListProfile />} />

                {/* </Route> */}

                <Route path="mytrainingmanagement/*" element={<EmployerMyTraining />}>
                  <Route index element={<EmployerPosted />} />
                  <Route path="ongoing" element={<EmployerOngoing />} />
                  <Route path="completed" element={<EmployerCompleted />} />
                </Route>

                {/* <Route path="mytrainingmanagement/posted/trainerlistprofile/:id" element={<TrainerProfilePopUp />} /> */}
                <Route path="mytrainingmanagement/ongoing/trainerlistprofile/:id" element={<TrainerListProfile />} />
                <Route path="mytrainingmanagement/completed/trainerlistprofile/:id" element={<TrainerListProfile />} />

                <Route path="postarequirements/" element={<Requirements />}>
                  <Route path="post-job" element={<PostJobSection />} />
                  <Route path="post-training" element={<PostTrainingSection />} />
                </Route>

                <Route path="feed/*" element={<EmployerFeed postrainingData={postrainingData} />} />
                <Route path="feed/trainerlistprofile/:id" element={<TrainerListProfile />} />
                {/* </Route> */}

                <Route path="messages" element={<Chat />} />


                <Route path='myposts' element={<EmployerMyPosts />} />
                <Route path="proposalsmanagement/*" element={<EmployerProposalManagement />}>
                  <Route path="candidacy" element={<EmployerProposalCandidacy />} />
                  <Route path="proposals" element={<EmployerProposalRequest />} />
                </Route>
                <Route path="proposalsmanagement/candidacy/trainerlistprofile/:id" element={<TrainerListProfile />} />
                <Route path="proposalsmanagement/proposals/trainerlistprofile/:id" element={<TrainerListProfile />} />
                <Route path="settings" element={<EmployerSettings />}>
                  <Route path="" element={<Navigate to="account-preference" />} />
                  <Route path="account-preference" element={<EmployerAccountPreferance />} />
                  <Route path="login-security" element={<EmployerLoginSecurity />} />
                  <Route path="visibility" element={<EmployerVisibility />} />
                  <Route path="notification" element={<EmployerNotifications />} />

                </Route>

                <Route path="trainingresource" element={<TrainingResources />} />
                <Route path="help&support" element={<EmployerHelpSupport />} />

                <Route path="help&support/sissoo-basics" element={<HelpPage />} />
                <Route path="help&support/account & network" element={<HelpPage2 />} />
                <Route path="help&support/profile-management" element={<HelpPage3 />} />
                <Route path="help&support/sissoo-benifits" element={<HelpPage4 />} />
                <Route path="help&support/sissoo-support" element={<HelpPage5 />} />
              </Routes>
            </div>

          </div>
          {model && selectedOption === "Feed" ? (
            <>
              <EmployerCreatePostPopUp trigger={model} setTrigger={setModel} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardApp;
