import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "../../../styles/Dashboard.css"; // Import your CSS file for styling
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import TrainerHeader from "../../../header&footer/TrainerHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { trainerDetails } from "../../../../redux/action/trainer.action.js";
import { Route, Routes, NavLink, useLocation, Navigate } from "react-router-dom";
import HttpsIcon from "@mui/icons-material/Https";
import Chat from "../../messages/Chat.jsx";
import TrainerProposalMangement from "../../proposalMangement/TrainerProposalMangement.jsx";
import TrainerSettings from "../../settings/trainerSetting/TrainerSettings.jsx";
import TrainerHelpSupport from "../../help&support/TrainerHelpSupport.jsx";
import TrainerFeed from "../../feed/trainerFeed/TrainerFeed.jsx";
import EmployerProfileList from "../../trainerlist/EmployerListProfile.jsx";
import CreatePostPopup from "../../../utils/CreatePostPopUp.jsx";
import { option } from "./TrainerData";
import TrainerDashboardData from "./TrainerDashboardData.jsx";
import TrainerMyTrainings from "../../mytrainings/TrainerMyTrainings.jsx";
import TrainerUpcoming from "../../mytrainings/TrainerMyTrainingchilds/Upcoming.jsx";
import TrainerOngoingTraining from "../../mytrainings/TrainerMyTrainingchilds/OnGoingTraining.jsx";
import TrainerCompleted from "../../mytrainings/TrainerMyTrainingchilds/Completed.jsx";
import TrainerProposalDenied from "../../proposalMangement/TrainerProposalManagement/TrainerProposalDenied.jsx";
import TrainerProposalApplied from "../../proposalMangement/TrainerProposalManagement/TrainerProposalApplied.jsx";
import TrainerProposalRequest from "../../proposalMangement/TrainerProposalManagement/TrainerProposalRequest.jsx";
import TrainingTrainingResource from '../../trainingresourecs/TrainerTrainingResources.jsx'
import TrainerBillPayments from "../../billpayments/TrainerBillPayments.jsx";
import TrainerMyPosts from '../../myposts/TrainerMyPosts.jsx'
import { getAllPostTrainingRequirementAction } from "../../../../redux/action/postRequirement.action.js";
import ProfileComplition from "../../../utils/ProfileComplition";
import HelpPage from "../../help&support/trainerhelp&support/helpPage.jsx";
import HelpPage2 from "../../help&support/trainerhelp&support/helpPage2.jsx";
import HelpPage3 from "../../help&support/trainerhelp&support/helpPage3.jsx";
import HelpPage4 from "../../help&support/trainerhelp&support/helpPage4.jsx";
import HelpPage5 from "../../help&support/trainerhelp&support/helpPage5.jsx";
import TrainerAccountPreferance from "../../settings/trainerSetting/trainerAccountPreference.jsx";
import TrainerLoginSecurity from "../../settings/trainerSetting/trainerLoginSecurity.jsx";
import TrainerVisibility from "../../settings/trainerSetting/trainerVisibility.jsx";
import TrainerNotification from "../../settings/trainerSetting/trainerNotification.jsx";

function TrainerDashboard() {
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [prevSelectedOption, setPrevSelectedOption] = useState("");
  const [model, setModel] = useState(false);
  const [show, setShow] = useState(false)
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const location = useLocation();

  const newUser = localStorage.getItem("newUser");
  // console.log('newuser', newUser)
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
  useEffect(() => {
    dispatch(trainerDetails());
  }, [dispatch]);

  const trainer = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails?.trainerDetails
  });

  const socket = useRef();

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
    if (trainer) {
      socket.current.emit("addUser", trainer?._id);
      socket.current.on("getUsers", (users) => {
      });
    }
  }, [trainer]);

  useEffect(() => {
    dispatch(getAllPostTrainingRequirementAction())
  }, [dispatch, location.pathname]);

  const employerPost = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails
  })

  const [postrainingData, setPosttrainingData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (Array.isArray(employerPost)) {

      let filteredData = employerPost;

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
      setPosttrainingData(filteredData)
    }
  }, [employerPost, searchTerm])

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    // Update the selectedOption based on the current location
    const currentOption = option.find((opt) => {
      if (
        location.pathname.startsWith("/trainerDashboard/proposalmanagement") ||
        location.pathname.startsWith(
          "/trainerDashboard/proposalmanagement/applied"
        ) ||
        location.pathname.startsWith(
          "/trainerDashboard/proposalmanagement/proposal"
        )
      ) {
        return opt.name === "Proposal Management";
      }

      if (location.pathname.startsWith("/trainerDashboard/mytrainings")) {
        // Check if the current path starts with the parent route or its child routes
        if (
          location.pathname.startsWith("/trainerDashboard/mytrainings") ||
          location.pathname.startsWith(
            "/trainerDashboard/mytrainings/upcoming"
          ) ||
          location.pathname.startsWith(
            "/trainerDashboard/mytrainings/ongoing"
          ) ||
          location.pathname.startsWith(
            "/trainerDashboard/mytrainings/completed"
          ) ||
          location.pathname.startsWith("/trainerDashboard/mytrainings/denied")
        ) {
          return opt.name === "My Trainings"; // Set the active state for the parent route
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


  const handleOptionClick = (option) => {
    if (selectedOption !== option) {
      setPrevSelectedOption(selectedOption);
    }
    setSelectedOption(option.replace(/\s/g, ""));
  };


  const [selectedFilter, setSelectedFilter] = useState('');
  const [trainingType, setStoreTrainingType] = useState([])

  const handleFilterChange = (selectedValue) => {
    setSelectedFilter(selectedValue);
    console.log('selectedValue', selectedValue);
  };

  useEffect(() => {
    if (Array.isArray(employerPost)) {

      const TrainingType = employerPost.map((val) => val?.typeOfTraining).filter(training => training !== undefined);
      const UniqueType = [...new Set(TrainingType)]; // Filter out duplicate locations
      setStoreTrainingType(UniqueType);

      let filteredData = employerPost;
      console.log('filteredData', filteredData);
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
        filteredData = filteredData.filter(item => item?.typeOfTraining === selectedFilter)

      }
      setPosttrainingData(filteredData)
    }
  }, [employerPost, searchTerm, selectedFilter])


  return (
    <>
      <div className="relative w-full">
        <div className="w-full">
          <TrainerHeader handleInputChange={handleInputChange} />
          {
            newUser ? <>
              <ProfileComplition trigger={show} setTrigger={setShow} />
            </>
              :
              null
          }
        </div>
        <div className="Reactangle-dash w-full flex">
          <div className="Rectangle-side w-[290px] bg-white mt-[2px] shadow">
            {option.map(({ name, icon }) => {
              let toPath = `/trainerDashboard/${name
                .replace(/\s/g, "")
                .toLowerCase()}`;
              if (name === "My Trainings") {
                toPath = "/trainerDashboard/mytrainings/upcoming";
              }
              if (name === "Proposal Management") {
                toPath = "/trainerDashboard/proposalmanagement/applied";
              }
              return (
                <NavLink
                  key={name}
                  to={toPath}
                  //  to={`/trainerDashboard/${name.replace(/\s/g, "").toLowerCase()}`}
                  className={`sidebar-option  ${selectedOption === name ? "active" : ""
                    } `}
                  activeClassName="active"
                  onClick={() => handleOptionClick(name)}
                // style={{textDecoration:selectedOption === "Billing Payments"  ? "line-through" : ""}}
                >
                  {/* <ArrowForwardIosOutlinedIcon className="arrow-icon" /> */}
                  {selectedOption === "Billing Payments" ? (
                    <HttpsIcon className="arrow-icon" />
                  ) : (
                    <ArrowForwardIosOutlinedIcon className="arrow-icon" />
                  )}
                  {icon}
                  {name}
                </NavLink>
              );
            })}
          </div>
          <div className="Reactangle-right w-9/12 ml-[20px]">
            <div className="dash_head z-10 h-[60px] pr-[20px] bg-white flex items-center justify-between">
              <div className="Dashboard flex items-center text-zinc-500 text-base font-normal font-['Poppins'] space-x-3   ">
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

                <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                  {selectedOption}
                </span>
                {/* // Feed  */}
                <div
                  className={`${selectedOption === "Feed" ? "" : "hidden"
                    }`}
                >
                  {
                    location?.pathname.startsWith('/trainerDashboard/feed/employerprofilelist/') ?
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
                            EmployerProfile
                          </span>
                        </div>
                      )
                      :
                      null
                  }
                </div>

                {/* //My trainings  */}

                <div
                  className={`${selectedOption === "My Trainings" ? "" : "hidden"
                    }`}
                >
                  {
                    location?.pathname.startsWith('/trainerDashboard/mytrainings/upcoming') ||
                      location?.pathname.startsWith('/trainerDashboard/mytrainings/ongoing') ||
                      location?.pathname.startsWith('/trainerDashboard/mytrainings/completed') ||
                      location?.pathname.startsWith('/trainerDashboard/mytrainings/denied') ?
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
                              location?.pathname.includes('upcoming') ? 'Upcoming' :
                                location?.pathname.includes("ongoing") ? 'Ongoing' :
                                  location?.pathname.includes("completed") ? 'Completed' :
                                    location?.pathname.includes("denied") ? 'Denied' :
                                      null
                            }
                          </span>
                          {
                            location?.pathname.startsWith('/trainerDashboard/mytrainings/upcoming/employerprofilelist') ||
                              location?.pathname.startsWith('/trainerDashboard/mytrainings/ongoing/employerprofilelist') ||
                              location?.pathname.startsWith('/trainerDashboard/mytrainings/completed/employerprofilelist') ||
                              location?.pathname.startsWith('/trainerDashboard/mytrainings/denied/employerprofilelist') ?
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
                                  EmployerProfile
                                </span>
                              </div>
                              :
                              null
                          }
                        </div>
                      )
                      :
                      null
                  }
                </div>

                {/* // proposalmanagement */}
                <div
                  className={`${selectedOption === "Proposal Management" ? "" : "hidden"
                    }`}
                >
                  {
                    location?.pathname.startsWith('/trainerDashboard/proposalmanagement/applied') ||
                      location?.pathname.startsWith('/trainerDashboard/proposalmanagement/proposalrequest') ||
                      location?.pathname.startsWith('/trainerDashboard/proposalmanagement/denied') ?
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
                              location?.pathname.includes('applied') ? 'Applied' :
                                location?.pathname.includes('proposalrequest') ? 'Proposal' :
                                  location?.pathname.includes('denied') ? 'Denied' :
                                    null
                            }
                          </span>
                          {
                            location?.pathname.startsWith('/trainerDashboard/proposalmanagement/applied/employerprofilelist') ||
                              location?.pathname.startsWith('/trainerDashboard/proposalmanagement/proposalrequest/employerprofilelist') ?

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
                                  {/* {
                                    location?.pathname.includes('applied') ? 'Applied' :
                                      location?.pathname.includes('proposalrequest') ? 'Proposal' : null
                                  } */}
                                  EmployerProfile
                                </span>

                              </div>
                              : null
                          }

                        </div>
                      )
                      :
                      null
                  }
                </div>

                {/* Help and Support */}

                <div
                  className={`${selectedOption === "Help & Support" ? "" : "hidden"
                    }`}
                >
                  {
                    location?.pathname.startsWith('/trainerDashboard/help&support/sissoo-basics') ||
                      location?.pathname.startsWith('/trainerDashboard/help&support/account%20&%20network') ||
                      location?.pathname.startsWith('/trainerDashboard/help&support/proposal-management') ||
                      location?.pathname.startsWith('/trainerDashboard/help&support/sissoo-benifits') ||
                      location?.pathname.startsWith("/trainerDashboard/help&support/faq's") ?
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
                                  location?.pathname.includes('proposal-management') ? 'Proposal-Management' :
                                    location?.pathname.includes('sissoo-benifits') ? 'Sissoo-Benifits' :
                                      location?.pathname.includes("faq's") ? "FAQ's" :
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
                  className={` ${selectedOption === "Feed" ? "relative" : "hidden"
                    }`}
                >

                  <div className="flex">
                    <div className="dropdown-buttons">
                      <select className="accordionPost" style={{ backgroundColor: "#f9f9f9", border: "1px solid #dadada", outline: 'none', color: 'gray' }} value={selectedFilter} onChange={(e) => handleFilterChange(e.target.value)} >
                        <option value="" selected>All Feed</option>
                        <option value="Corporate Training">Corporate Training</option>
                      </select>
                    </div>

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
            </div>

            <div className="content ">
              <Routes>
                <Route path="dashboard" element={<TrainerDashboardData />} />
                <Route path="feed/*" element={<TrainerFeed postrainingData={postrainingData} />} />
                <Route path="feed/employerprofilelist/:id" element={<EmployerProfileList />} />
                <Route path="mytrainings/*" element={<TrainerMyTrainings />}>
                  <Route index element={<TrainerUpcoming />} />
                  <Route path="ongoing" element={<TrainerOngoingTraining />} />
                  <Route path="completed" element={<TrainerCompleted />} />
                  {/* <Route path="denied" element={<TrainerProposalDenied />} /> */}
                </Route>
                <Route path="mytrainings/ongoing/employerprofilelist/:id" element={<EmployerProfileList />} />
                <Route path="mytrainings/completed/employerprofilelist/:id" element={<EmployerProfileList />} />
                <Route path="mytrainings/denied/employerprofilelist/:id" element={<EmployerProfileList />} />

                <Route path="messages" element={<Chat />} />

                <Route path='myposts' element={<TrainerMyPosts />} />

                <Route path="trainingresource" element={<TrainingTrainingResource />} />
                <Route path="settings/*" element={<TrainerSettings />}>
                  <Route path="" element={<Navigate to="account-preference" />} />
                  <Route path="account-preference" element={<TrainerAccountPreferance />} />
                  <Route path="login-security" element={<TrainerLoginSecurity />} />
                  <Route path="visibility" element={<TrainerVisibility />} />
                  <Route path="notification" element={<TrainerNotification />} />
                </Route>
                <Route path="proposalmanagement/*" element={<TrainerProposalMangement />}>
                  <Route path="applied" element={<TrainerProposalApplied />} />
                  <Route path="proposalrequest" element={<TrainerProposalRequest />} />
                  <Route path="denied" element={<TrainerProposalDenied />} />
                </Route>
                <Route path="proposalmanagement/applied/employerprofilelist/:id" element={<EmployerProfileList />} />
                <Route path="proposalmanagement/proposalrequest/employerprofilelist/:id" element={<EmployerProfileList />} />
                <Route path="help&support" element={<TrainerHelpSupport />} />
                <Route path="help&support/sissoo-basics" element={<HelpPage />} />
                <Route path="help&support/account & network" element={<HelpPage2 />} />
                <Route path="help&support/proposal-management" element={<HelpPage3 />} />
                <Route path="help&support/sissoo-benifits" element={<HelpPage4 />} />
                <Route path="help&support/faq's" element={<HelpPage5 />} />
              </Routes>
            </div>
          </div>
          {model && selectedOption === "Feed" ? (
            <>
              <CreatePostPopup trigger={model} setTrigger={setModel} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default TrainerDashboard;
