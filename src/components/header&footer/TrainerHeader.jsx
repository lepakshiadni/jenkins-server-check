import React, { useState, useEffect, useRef } from "react";
import HeaderImage from "../assets/LOGO.png";
import "../styles/Header.css";
import Favi from "../assets/favi.png";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from '../assets/UserAvatar.png';
// import getDeviceDetails from 'device-details';
import { useDispatch, useSelector } from "react-redux";
import { trainerDetails, getAllNotification, readNotification, deleteAllNotification } from "../../redux/action/trainer.action";
import axios from "axios";
import timesago from "timesago";

const TrainerHeader = ({ handleInputChange }) => {
  // State for search bar dropdown
  const baseUrl = process.env.REACT_APP_API_URL;

  const [isDropdownActive, setDropdownActive] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([])
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trainerDetails());
  }, [dispatch]);

  const user = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails?.trainerDetails;
  });
  const notification = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.notification;
  });

  useEffect(() => {
    // setNotifications(notification?.notifications)
    notification?.notifications?.map(({ notifications }) => {
      setNotifications(notifications)
    })
  }, [notification, notifications, dispatch])
  console.log('notification', notifications)



  useEffect(() => {
    if (user?._id) {
      dispatch(getAllNotification(user?._id))
    }
  }, [user, dispatch])




  // console.log(getDeviceDetails().deviceName);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/employerpost/searchData`);
        // console.log('response', response.data);
        // Combine both responses and remove duplicates and undefined values
        const mergedOptions = [
          ...new Set([...response.data.map(val => val.postedByCompanyName), ...response.data.map(val => val.trainingName), ...response.data.map(val => val.postedByName), ...response.data.map(val => val.modeOfTraining)])
        ].filter(option => option !== undefined);

        setOptions(mergedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const inputRef = useRef(null);
  const dropref = useRef(null)

  // const toggleDropdown = () => {
  //   setDropdownActive(!isDropdownActive);
  // };

  const handleOptionClick = (option) => {
    // Set the clicked option as the input value
    inputRef.current.value = option;
    // Trigger handleInputChange to update the state if needed
    handleInputChange({ target: { value: option } });
  };

  const [filteredOptions, setFilteredOptions] = useState([])

  const handleInputChangeLocal = (e) => { // Rename to handleInputChangeLocal
    const value = e.target.value;
    if (e.key === 'Enter') {
      if (value && !options.includes(value)) {
        setOptions([...options, value]);
      }
      handleInputChange(e);
    }
    if (value === "") {
      handleInputChange(e);
    }
    else {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const filterOptions = (value) => {
    // Filter options based on the input value
    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    return filtered;
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }

      if (dropref.current && !dropref.current.contains(event.target)) {
        setDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //notification
  const handleNotification = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    dispatch(getAllNotification(user?._id))
  };
  const handleprofile = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Sample data for notification messages
  const notificationMessages = [
    {
      image: "https://via.placeholder.com/40x40",
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      unread: true,
    },
    {
      image: "",
      name: "Kowshik Viewed Your Application",
      time: "30 min ago",
      unread: true,
    },
    {
      image: Favi,
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      unread: false,
    },
    {
      image: "",
      name: "Kowshik Viewed Your Application",
      time: "30 min ago",
      unread: true,
    },
    {
      image: "https://via.placeholder.com/40x40",
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      unread: false,
    },
    {
      image: Favi,
      name: "Kowshik Viewed Your Application",
      time: "30 min ago",
      unread: true,
    },
  ];

  console.log('user', user)

  // Sample data for profile dropdown

  return (
    <div className="header2">
      {/* Company Logo */}
      <div className="w-[210px] ml-[40px]">
        <div className="logo2">
          <img src={HeaderImage} alt="Company Logo" />
        </div>
      </div>
      <div className="w-full header-child ml-[110px] mr-[30px]">
        {/* Search Bar */}
        <div>
          <div ref={dropref} className="search-container">
            <input
              ref={inputRef}
              type="text"
              onKeyDown={handleInputChangeLocal}
              placeholder="What are you looking for....."
              className="search-input"
              onClick={() => setDropdownActive(!isDropdownActive)}
            />
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M17 17L25 25M10.3333 19.6667C5.17868 19.6667 1 15.488 1 10.3333C1 5.17868 5.17868 1 10.3333 1C15.488 1 19.6667 5.17868 19.6667 10.3333C19.6667 15.488 15.488 19.6667 10.3333 19.6667Z"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className={`dropdown-search ${isDropdownActive ? "active" : ""}`}>
              <ul className="search-input-suggestion">
                {filterOptions(inputRef.current?.value || '').map((item, index) => (
                  <li key={index} onClick={() => handleOptionClick(item)}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center ">
          {/* Notification Icon */}
          <div
            className=" relative cursor-pointer"
            onClick={handleNotification}
            ref={notificationRef}
          >
            <div className="ml-[10px]">
              <div className="Ellipse17 w-4 h-4 ml-[-1px] text-white bg-sky-600 rounded-full">
                <div className=" text-white text-[11px] font-normal font-['Poppins'] ml-[4px]">
                  {
                    notifications?.length
                  }
                </div>
              </div>
            </div>
            <div className="notification-icon absolute top-[-8px] z-[-1]">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 26"
                  fill="none"
                >
                  <path
                    d="M15.6667 19.6667V21C15.6667 23.2091 13.8758 25 11.6667 25C9.45753 25 7.66667 23.2091 7.66667 21V19.6667M15.6667 19.6667H7.66667M15.6667 19.6667H20.454C20.964 19.6667 21.2203 19.6667 21.4268 19.597C21.8213 19.4639 22.13 19.1542 22.263 18.7597C22.333 18.5524 22.333 18.2953 22.333 17.7813C22.333 17.5563 22.3327 17.4438 22.3151 17.3366C22.2818 17.1339 22.2032 16.9418 22.0834 16.775C22.0201 16.6868 21.9397 16.6064 21.7811 16.4478L21.2617 15.9284C21.0942 15.7608 21 15.5335 21 15.2965V10.3333C21 5.17867 16.8213 0.999987 11.6667 1C6.51202 1.00001 2.33333 5.17869 2.33333 10.3333V15.2966C2.33333 15.5336 2.23899 15.7608 2.07142 15.9284L1.55208 16.4477C1.39301 16.6068 1.31339 16.6867 1.25 16.775C1.13021 16.9418 1.05086 17.1339 1.0176 17.3366C1 17.4438 1 17.5563 1 17.7813C1 18.2953 1 18.5523 1.06994 18.7597C1.203 19.1541 1.51306 19.4639 1.90755 19.597C2.11408 19.6667 2.36935 19.6667 2.87941 19.6667H7.66667"
                    stroke="#888888"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              {showNotificationDropdown && (
                <div className="notification-dropdown">
                  {/* Scrollable area for notification messages */}
                  <div className="notification-scroll">
                    <div className="flex justify-evenly items-center">

                      <div className="h-[48.5px] flex justify-center items-center">
                        <div className="text-[#2676c2] text-base font-normal font-['Poppins'] hover:underline ">
                          Notifications
                        </div>
                        <div className="Ellipse17 w-5 h-5 ml-1 text-white bg-sky-600 rounded-full">
                          <div className=" text-white text-sm font-normal font-['Poppins'] ml-[5px] mb-[1px]">
                            {/* 5 */}
                            {
                              notifications?.length
                            }
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => { dispatch(deleteAllNotification(user?._id)) }}
                      >
                        <span className="text-red-500 text-sm font-normal font-['Poppins'] hover:underline">
                          Clear All
                        </span>
                      </div>
                    </div>
                    <hr />
                    {
                      notifications?.map((message, index) => {
                        return (
                          <>
                            <div
                              onClick={() => { dispatch(readNotification(message?._id, user?._id)) }}
                              key={index}
                              className={`notification-message h-[56.49px] hover:bg-[#9fc6ed] flex items-center ${message?.unread ? 'bg-[#2676c233]' : ''} `}
                            >
                              <div className="pr-[10px] pt-[11.49px] pb-[8px] pl-[5px]">
                                {
                                  message?.notifierImage ?
                                    <img
                                      className="w-10 h-[40px] rounded-full"
                                      src={message?.notifierImage}
                                      alt=""
                                    />
                                    :
                                    <div className="w-10 h-[40px] rounded-full flex justify-center items-center bg-slate-400">
                                      <span className=" capitalize">
                                        {message?.notifierName[0]}
                                      </span>
                                    </div>
                                }
                              </div>
                              <div>
                                <div className={`text-neutral-700 text-base ${message?.unread ? ' font-extrabold' : 'font-normal'} font-['Poppins']`}>
                                  {message?.notificationMessage}
                                </div>
                                <div className={`text-zinc-400 text-[10px] ${message?.unread ? ' font-extrabold' : 'font-normal'} font-['Poppins']`}>
                                  {timesago(message?.createdAt)}
                                </div>
                              </div>
                            </div>
                            <div className="w-[379px] h-[0px] border border-zinc-300 border-opacity-40"></div>
                          </>
                        );
                      })
                    }
                  </div>
                  <div className="triangle"></div>
                </div>
              )}
            </div>
          </div>

          {/* Profile Dropdown */}
          <div
            className="profile cursor-pointer min-w-[180px] w-[100%]"
            onClick={handleprofile}
            ref={profileRef}
          >
            <div className="profile-header">
              <div className="flex justify-start items-start ">
                {
                  user?.basicInfo?.profileImg ? <img className="w-[60px] h-[60px] rounded-full" src={user?.basicInfo?.profileImg} />
                    :
                    <div className="w-[60px] h-[60px] rounded-full capitalize flex justify-center items-center">
                      {/* <span className=" capitalize"> {user?.fullName[0]}</span> */}
                      <img alt="" src={UserAvatar} />
                    </div>
                }
              </div>
              <div className="text-start min-w-[120px] w-[auto]   ">
                <span className="font-[600] flex justify-center">
                  {
                    user?.fullName
                  }
                </span>
                <p className="flex justify-center" style={{ letterSpacing: "100%" }}>{user?.basicInfo?.designation || ''}</p>
              </div>
            </div>
            {showProfileDropdown && (
              <div className="profile-dropdown w-[100%] min-w-[180px] h-[133px] bg-white border-2 border-zinc-300">
                <div className="viewprofile text-neutral-700 flex justify-center items-center w-[100%] h-[43px] text-lg font-normal font-['Poppins'] ">
                  <Link to="/trainerProfile"> View Profile</Link>
                  <div className="triangle2"></div>
                </div>
                <div className="viewmessage text-neutral-700 w-[100%] flex justify-center items-center h-[43px] text-lg font-normal font-['Poppins'] hover:bg-[#E3E3E3]">
                  <Link to="/trainerDashboard/messages"> Send Messages</Link>
                </div>
                <div className="text-neutral-700 w-[100%] flex justify-center items-center h-[43px] text-lg font-normal font-['Poppins'] hover:bg-[#E3E3E3]">
                  <Link to="/trainerDashboard/settings">Settings</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerHeader;
