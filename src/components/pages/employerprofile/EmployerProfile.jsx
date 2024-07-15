import React, { useState, useEffect } from "react";
import '../../styles/TrainerProfile.css';
import UserAvatar from '../../assets/UserAvatar.png'
import Edit from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import timeago from 'timesago'
import Favi from "../../assets/favi.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EmployerHeader from "../../header&footer/EmployerHeader";
import { employerDetails, getAllAppliedTraining, getConversation } from '../../../redux/action/employers.action'
import { deletePostTrainingRequirement, getPostTrainingRequirementAction } from '../../../redux/action/postRequirement.action'
import EmployerConnectionPopUp from "../../utils/EmployerConnectionPopUp";
import DeteleSvg from '../../assets/Delete.svg'
import { MdDeleteForever } from "react-icons/md";
import EditSvg from '../../assets/edit.svg'
import EmployerPostEdit from "./employerprofileedit/EmployerPostEdit";


const EmployerProfile = () => {
  const [showAll, setShowAll] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const location = useLocation();
  let recentApplication;
  const [showAllExp, setShowAllExp] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [visibleApplications, setVisibleApplications] = useState(1);
  const [showApplication, setShowApplication] = useState(false);
  const [connectionCount, setConnectionsCount] = useState(0)
  const [model, setModel] = useState(false)
  const [model2, setModel2] = useState(false)

  const [selectedPost, setSelectedPost] = useState(null)

  const toggleShowAllActivities = () => {
    setShowAllActivities(!showAllActivities);
  };
  const toggleShowAllExp = () => {
    setShowAllExp(!showAllExp);
  };

  const handleViewMore = () => {
    setVisibleApplications((prevCount) => {
      const newCount = prevCount + 2;
      setShowApplication(true);
      return Math.min(newCount, recentApplications.length);
    });
  };

  const handleViewLess = () => {
    setVisibleApplications(1);
    setShowApplication(false);
  };

  useEffect(() => {
    dispatch(employerDetails())
    dispatch(getPostTrainingRequirementAction())
    dispatch(getAllAppliedTraining())
    dispatch(getConversation(user?._id))
  }, [dispatch])

  const employer = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails;
  });

  const postDetails = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails
  })
  const connections = useSelector(({ employerSignUp }) => {
    return employerSignUp?.connections?.conversation?.length || 0;
  })

  useEffect(() => {
    setConnectionsCount(connections)
  }, [connectionCount, connections])

  console.log('connections', connections)

  // const appliedTraining = useSelector(({ employerSignUp }) => {
  //   return employerSignUp?.getAllAppliedTraining?.appliedTrainingDetails
  // })

  console.log(postDetails, "postDetails")


  useEffect(() => {
    if (employer?.success) {
      setUser(employer?.employerDetails);
    }
  }, [employer]);

  const experiences = [
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    // Add more experience objects as needed
  ];

  const recentApplications = [
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
  ];


  console.log("user", user);
  const notificationMessages = [
    {
      image: "https://via.placeholder.com/40x40",
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      accept: "Accept",
      denied: "Denied",
    },
    { image: "", name: "Kowshik Viewed Your Application", time: "30 min ago" },
    {
      image: Favi,
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      accept: "Accept",
      denied: "Denied",
    },
    { image: "", name: "Kowshik Viewed Your Application", time: "30 min ago" },
    {
      image: "https://via.placeholder.com/40x40",
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      accept: "Accept",
      denied: "Denied",
    },
    {
      image: Favi,
      name: "you updated your application",
      time: "30 min ago",
    },
    {
      image: Favi,
      name: "eleesa Accepted Your Application ",
      time: "30 min ago",
    },
    {
      image: "https://via.placeholder.com/40x40",
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      accept: "Accept",
      denied: "Denied",
    },
  ];
  const visibleNotifications = showAll
    ? notificationMessages
    : notificationMessages.slice(-4);

  const handleToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const handleEditProfile = async () => {
    // const profileEditPath = routingProfileEdit();
    await navigate("/employerprofile/profileupdate/basic-information"); // Navigate to TrainerProfileEdit route
  };

  const [addNewComment, setAddNewComment] = useState('')

  const [messageShowMoreBasedOnProfile, setMessageShowMoreBasedOnProfile] = useState([]);

  const toggleHandleMessageMore = (post) => {
    setMessageShowMoreBasedOnProfile((prevState) => {
      const updatedState = [...prevState]; // Make a copy of the current state array
      updatedState[post] = !updatedState[post]; // Toggle the value at the specified index
      return updatedState;
    });
    setResetComments(true);
  };

  const [numCommentsToShow, setNumCommentsToShow] = useState(1);
  const [resetComments, setResetComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState([]);

  const [open3Array, setOpen3Array] = useState([]);
  // Function to toggle the dropdown menu for a specific comment
  const toggleDropdown = (index) => {
    setOpen3Array((prevOpenArray) => {
      const newOpen3Array = [...prevOpenArray];
      newOpen3Array[index] = !newOpen3Array[index];
      return newOpen3Array;
    });
  };

  const deleteComment = async (postId, comentId) => {
    // await dispatch(deletePostTrainerComment(postId, comentId))
    setOpen3Array([]);
  };

  const handleCommentMore = (index) => {
    setShowAllComments((prevState) => {
      const newComments = [...prevState]; // Ensure prevState is treated as an array
      newComments[index] = !newComments[index];
      return newComments.slice(0, numCommentsToShow + 4); // Return only the desired number of comments
    });
  };

  // Click handler for "View More Comments" button
  const handleViewMoreComments = (index) => {
    setNumCommentsToShow((prevNum) => prevNum + 4);
    if (numCommentsToShow + 4 >= index.length) {
      if (numCommentsToShow + 4 <= showAllComments.length) {
        handleCommentMore(index); // Pass the index of the post to expand comments
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (addNewComment !== '') {
      const comment = {
        commentedByUserId: employer?._id,
        commentedByProfile: employer?.basicInfo?.profileImg,
        commentedByName: employer?.fullName,
        commentedByCompany: employer?.basicInfo?.company,
        comment: addNewComment
      }
      // const postId = selectedPost?._id
      // console.log(comment, postId)
      // await dispatch(addPostTrainerComments(postId, comment))
      setAddNewComment('')
    }
  }

  const downloadFileHandler = async () => {
    const fileLink = selectedPost?.tocFile?.tocUrl;

    if (!fileLink) {
      alert("File link is not available.");
      return;
    }
    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = fileLink;
      link.download = selectedPost?.tocFile?.tocFileName || 'download'; // Set the default filename if not provided
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const [selectedPostDetails, setSelectedPostDetails] = useState(null);
  const handleEditClick = (activity) => {
    setSelectedPostDetails(activity);
    setModel2(true); // Open the EmployerPostEdit component
  };
  const handleDeletePost = (postId) => {
    dispatch(deletePostTrainingRequirement(postId))
  }
  
  return (
    <>
      <EmployerHeader />
      <EmployerConnectionPopUp trigger={model} setTrigger={setModel} id={user?._id} />
      <EmployerPostEdit trigger={model2} setTrigger={setModel2} postDetails={selectedPostDetails} />

      <div className="w-full sticky z-50 top-[0px] left-[60px]  p-[20px]  h-[60px] flex justify-start items-center bg-white ">
        <div
          onClick={() => {
            navigate("/employerDashboard/dashboard");
            // window.history.back()
          }}
          style={{
            fontSize: "16px",
            fontWeight: "400",
            color: "#888888",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
          >
            <path
              d="M16 7.57143L0.999999 7.57143M0.999999 7.57143L7.42857 14M0.999999 7.57143L7.42857 1.14286"
              stroke="#888888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h3 style={{ marginLeft: "10px" }}>Back</h3>
        </div>
      </div>

      <div className="w-full relative">
        <div className="w-100% relative ml-[80px] mr-[80px] h-auto flex">
          <div className="leftsideTrainerProfile w-8/12 mr-[23.67px]">
            <div className=" h-[auto] flex flex-col border">
              <div className="h-[195px] ">
                {
                  user?.basicInfo?.profileBanner ?

                    <img className="h-[235.41px] w-full" src={user?.basicInfo?.profileBanner} alt="img" />
                    :
                    <div className="flex justify-center items-center bg-slate-300 w-full h-[235.41px]" />

                }
              </div>
              <div className="">
                <div className="relative flex justify-center items-center flex-col">
                  {
                    user?.basicInfo.profileImg ?
                      <img
                        className="relative top-[-5px] w-[100px] h-[100px] rounded-full"
                        src={user?.basicInfo.profileImg}
                        alt=""
                      />
                      :
                      <div className="relative top-[-5px] w-[100px] h-[100px] flex justify-center items-center rounded-full bg-slate-300">
                        <img alt="" src={UserAvatar} />
                      </div>
                  }
                  <img
                    onClick={handleEditProfile}
                    className="absolute right-[30.33px] cursor-pointer"
                    src={Edit}
                    alt=""
                  />
                  <div className="relative flex justify-center items-center flex-col">
                    <div className="text-[#263238] text-[20px] font-[600] font-['Poppins'] capitalize">
                      {user?.basicInfo?.firstName && user?.basicInfo?.lastName
                        ? `${user.basicInfo.firstName} ${user.basicInfo.lastName}`
                        : user?.fullName
                      }
                    </div>
                    <div className="text-[#232323] text-base font-normal font-['Poppins'] capitalize">

                      {user?.designation}
                    </div>
                    <h4
                      className="font-[600] text-[#2676C2] text-[16px] font-[Poppins] cursor-pointer"
                      onClick={() => setModel(true)}
                    >
                      {connectionCount}{connectionCount > 100 ? "+" : ""} connection
                    </h4>
                  </div>
                  <div className="relative text-center text-[#6A6A6A] text-[14px] font-[400] font-['Poppins'] capitalize">
                    {user?.skills?.slice(0, 7).map(({ name }) => {
                      return (
                        <>
                          <span>
                            {name}| {" "}
                          </span>
                        </>
                      );
                    })}
                    <br />
                    {user?.skills?.slice(7, 10).map(({ name }) => {
                      return (
                        <>
                          <span>
                            {name}| {" "}
                          </span>
                        </>
                      );
                    })}
                    {user?.skills?.length > 10 ? (
                      <span className="text-[#2676c2] hover:cursor-pointer">
                        ....more
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="mt-[17px] mb-[17px] w-9/12 h-[0px] border border-neutral-200"></div>
              </div>
              {
                user?.basicInfo?.status === true ?
                  <div className="pl-[30px] pr-[30px]">
                    <div className="text-[#232323] text-[18px] font-[600px] font-['Poppins'] capitalize">

                      {user?.basicInfo?.objective}
                    </div>
                    <div className="text-[#535353] text-[16px] mt-[10px] font-[400px] font-['Poppins']">
                      {user?.basicInfo?.aboutYou}
                    </div>
                  </div>
                  :
                  <div onClick={handleEditProfile} className="flex justify-center items-center animate-pulse">
                    <span className=" hover:underline cursor-pointer text-[#2676c2] text-sm">
                      Please Complete the Basic Details Profile !
                    </span>
                  </div>
              }
              <div className="flex justify-center items-center flex-col mt-[30px] mr-[10px] ml-[10px]">
                <div className="w-full h-[0px] border border-neutral-200"></div>
              </div>
              <div className="mr-[22px] ml-[28px] mt-[20px]">
                <h3 className="text-[#232323] text-[18px] font-[500] font-['Poppins']">
                  Experience
                </h3>
                {
                  user?.experience?.length > 0 ?
                    <>

                      {user?.experience

                        ?.slice(0, showAllExp ? experiences.length : 3)
                        ?.map((experience, index) => (
                          <div key={index}>
                            <h3 className="mt-[10px]">
                              <span className="text-[#232323] text-[16px] font-[500] font-['Poppins']">
                                Company Name:{" "}
                              </span>
                              <span className="text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                                {experience.companyName}
                              </span>
                            </h3>

                            <h3 className="mt-[10px]">
                              <span className="text-[#232323] text-[16px] font-[500] font-['Poppins']">
                                Designation:{" "}
                              </span>
                              <span className="text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                                {experience.designation2}
                              </span>
                            </h3>
                            <h3 className="mt-[10px]">
                              <span className="text-[#232323] text-[16px] font-[500] font-['Poppins']">
                                Start Date:{" "}
                              </span>
                              <span className="text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                                {experience.startDate}
                              </span>
                            </h3>
                            <p className="mt-[20px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                              {experience.roleDescription}
                            </p>
                          </div>
                        ))}
                    </>
                    :
                    <div onClick={handleEditProfile} className="flex justify-center items-center animate-pulse">
                      <span className=" hover:underline cursor-pointer text-[#2676c2]">
                        Please Complete the Experience Details Profile !
                      </span>
                    </div>
                }
              </div>
              {user?.experience.length > 3 && (
                <div className="mt-[10px] ml-[28px] mb-[13px]">
                  <p
                    className="text-[#2676C2] text-[16px] font-[400] font-['Poppins'] cursor-pointer"
                    onClick={toggleShowAllExp}
                  >
                    {showAllExp ? "Show Less" : "Show More"}
                  </p>
                </div>
              )}
            </div>
            <div className="Reactangle238 w-full h-[auto] mt-[20px] border">
              <div className="pl-[28px] pr-[30px] mt-[21px]">
                <div className="flex justify-between items-center">
                  <div className="text-[#535353] text-[18px] font-[500] font-['Poppins']">
                    Recent Activities
                  </div>
                  <div className="text-[#2676C2] text-[16px] font-[600] font-['Poppins'] rounded-[8px] border border-[#2676C2] pl-[15px] pr-[15px] pt-[3px] pb-[3px] hover:bg-[#2676C2] hover:text-[#fff]">
                    <Link to='/employerDashboard/postarequirements/post-training'>Create post</Link>
                  </div>
                </div>
                <div>
                  {
                    postDetails?.length > 0 ?
                      <>
                        {postDetails
                          ?.slice(0, showAllActivities ? postDetails?.length : 3)
                          ?.map((activity, index) => (
                            <div key={index}>
                              <div className="mt-[20px] text-[#9F9F9F] text-[14px] font-[400] font-['Poppins']">
                                {/* {activity.posted} ago */}
                                {timeago(activity.createdAt)}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="mt-[10px] text-[#535353] text-[18px] font-[600] font-['Poppins']">
                                  {activity?.trainingName}
                                </div>
                                <div className="flex items-center justify-between ">
                                  <div style={{ height: '40%', width: '40%' }} onClick={() => handleDeletePost(activity._id)}>
                                    {/* <img className="cursor-pointer" src={DeteleSvg} alt="" /> */}
                                    <MdDeleteForever className="cursor-pointer" style={{ color: '#e60000', height: '25px', width: '25px', }} />
                                  </div>
                                  <div style={{ height: '50%', width: '50%' }} onClick={() => handleEditClick(activity)}>
                                    <img className="cursor-pointer" src={EditSvg} alt="" />
                                  </div>
                                </div>
                              </div>
                              <div className="mt-[10px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                                {activity.description}
                              </div>
                              <h5 className='font-[600]' style={{ color: '#535353' }}>Wanted skills</h5>
                              <div>
                                {activity.topics.map((val, index) => (
                                  <div key={index}>
                                    <p>{val}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="trainerskill">
                                <h5><span className='font-[600] '>Type of training -</span> <span className='trainerchild'>{activity.typeOfTraining}</span></h5>
                                <h5><span className='font-[600]' >Duration of training -</span> <span className='trainerchild'>{activity.durationCount} {activity.durationType}{activity?.durationCount > 1 ? "'s" : ""}</span></h5>
                                <h5><span className='font-[600]' >Budget -</span> <span className='trainerchild'><span>{activity?.selectedCountry === 'IND' ? '₹' : '$'}</span> {activity.minBudget} - <span>{activity?.selectedCountry === 'IND' ? '₹' : '$'}</span> {activity.maxBudget} /<span className='text-sm'>{activity?.durationType}</span> </span> </h5>
                                {
                                  activity?.tocFile?.tocFileName?.length > 0 ?

                                    <h5 style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}><span className='skillchild font-[600]' >Table of content - <span style={{ color: 'rgb(180, 161, 161)' }}>{activity?.tocFile?.tocFileName}</span></span>
                                      <span className='downlod' onClick={downloadFileHandler}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                                          <path d="M1.33301 14.6673H10.2219M5.77745 1.33398V11.7044M5.77745 11.7044L9.48116 8.00065M5.77745 11.7044L2.07375 8.00065" stroke="#2676C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                      </span>
                                    </h5>
                                    :
                                    ""
                                }
                                <div style={{ display: 'flex' }} >
                                  <h5 style={{ marginRight: '20px', marginTop: "0px", marginBottom: '0px' }}><span className=' font-[600]' style={{ marginBottom: '15px' }}>Start Date</span> <br /> <span className='trainerchild'>{activity.startDate}</span> </h5>

                                  <h5 style={{ margin: '0px' }}><span className='font-[600]' >End Date</span> <br /> <span className='trainerchild'>{activity.endDate}</span> </h5>
                                </div>
                              </div>

                              <div className="mb-[20px] flex items-center justify-between ">
                                <div className="flex">
                                  <div className="mr-[13px] text-[#888] text-[15px] font-[400] font-['Poppins'] capitalize">
                                    Mode of Training -
                                  </div>
                                  <div className="text-[#2676C2] text-[15px] font-[400] font-['Poppins'] capitalize">
                                    {activity?.modeOfTraining}
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="me-3" style={{ display: 'flex', justifyItems: 'center' }}>
                                    <h2 className="me-1">{activity?.likes?.length}</h2>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="19"
                                      viewBox="0 0 20 19"
                                      fill="none"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <path
                                        d="M15.2307 18.5961H5.32688V6.59612L11.9615 0L12.8076 0.846124C12.9115 0.949974 12.9977 1.08747 13.0663 1.25862C13.1348 1.42977 13.1691 1.59099 13.1691 1.74227V1.99612L12.1076 6.59612H18.1923C18.6679 6.59612 19.0881 6.7785 19.4528 7.14325C19.8176 7.50798 20 7.92818 20 8.40383V10.0192C20 10.123 19.9891 10.2352 19.9673 10.3557C19.9455 10.4762 19.9128 10.5884 19.8692 10.6923L17.0038 17.4538C16.8602 17.7743 16.6198 18.0448 16.2827 18.2653C15.9455 18.4858 15.5948 18.5961 15.2307 18.5961ZM3.82693 6.59612V18.5961H0V6.59612H3.82693Z"
                                        fill="#2676C2"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="19"
                                      viewBox="0 0 20 19"
                                      fill="none"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => toggleHandleMessageMore(activity._id)}
                                    >
                                      <path
                                        d="M3.59961 16.9203L5.12357 15.7012L5.13478 15.6926C5.45249 15.4384 5.61281 15.3101 5.79168 15.2188C5.95216 15.1368 6.12328 15.0771 6.2998 15.0408C6.49877 15 6.70603 15 7.12207 15H15.8031C16.921 15 17.4806 15 17.908 14.7822C18.2843 14.5905 18.5905 14.2842 18.7822 13.9079C19 13.4805 19 12.9215 19 11.8036V4.19691C19 3.07899 19 2.5192 18.7822 2.0918C18.5905 1.71547 18.2837 1.40973 17.9074 1.21799C17.4796 1 16.9203 1 15.8002 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002V15.6712C1 16.7369 1 17.2696 1.21846 17.5433C1.40845 17.7813 1.69644 17.9198 2.00098 17.9195C2.35115 17.9191 2.76744 17.5861 3.59961 16.9203Z"
                                        stroke="#8D8D8D"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div style={{ width: "100%" }}>
                                {!messageShowMoreBasedOnProfile[activity._id] ? null : (
                                  <div>
                                    {/* <div className="flex items-center justify-between ">
                                      <img
                                        className="rounded-[50%]"
                                        style={{ height: '50px', width: '50px' }}
                                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt=""
                                      />

                                      <div className='messageChild'>
                                        <form onSubmit={handleAddComment} className='flex'>
                                          <div>
                                            <input value={addNewComment} onChange={(e) => { setAddNewComment(e.target.value) }} type="text" style={{ border: '2px solid whitesmoke', width: '350px', outline: "none", height: '50px', borderTopLeftRadius: '8px', borderEndStartRadius: '8px', borderRight: 'none', paddingLeft: '10px' }} placeholder="Write a comment..." />
                                          </div>
                                          <div>
                                            <button type='submit' onClick={handleAddComment} style={{ padding: '10px 30px', border: '2px solid #2676C2', backgroundColor: '#2676C2', borderStartEndRadius: '8px', borderEndEndRadius: '8px', height: '50px', width: '90px' }}>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
                                                <path d="M3.7877 10.5782L10.6412 10.5782M16.2379 11.9923L3.94466 18.5004C2.84298 19.0837 2.29183 19.3754 1.92856 19.2915C1.61346 19.2188 1.3531 18.9989 1.22953 18.7001C1.08705 18.3555 1.28403 17.7632 1.67834 16.5802L3.51042 11.084C3.573 10.8963 3.60399 10.8026 3.61642 10.7066C3.62745 10.6214 3.62799 10.5353 3.61697 10.45C3.60482 10.3562 3.57418 10.2643 3.51439 10.085L1.67809 4.57606C1.28377 3.3931 1.08676 2.8014 1.22924 2.45681C1.35281 2.15797 1.61313 1.93763 1.92822 1.86487C2.29155 1.78097 2.84286 2.07247 3.9449 2.6559L16.2381 9.16407C17.1045 9.62275 17.5377 9.8523 17.6794 10.1582C17.8027 10.4247 17.8029 10.7319 17.6795 10.9984C17.538 11.3042 17.1048 11.5335 16.2393 11.9917L16.2379 11.9923Z"
                                                  stroke='white' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                              </svg>
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div> */}
                                    <h6
                                      style={{
                                        marginTop: "10px",
                                        color: "#535353",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {" "}
                                      Most Recent comment{" "}
                                    </h6>
                                    <div>
                                      {showAllComments[activity._id] ? (
                                        <div>
                                          {activity?.comments?.map((item, index) => (
                                            <div className='' key={index} style={{ display: 'flex', margin: '5px', marginTop: '10px' }}>
                                              <img className='img2' height='40px' width='40px' src={item.imageUrl} alt="" />
                                              <div style={{ maxWidth: "436px", backgroundColor: '#f0f0f0', padding: '10px', marginLeft: '10px', borderStartEndRadius: '15px', borderEndStartRadius: '15px', borderEndEndRadius: '15px', border: '2px solid #E9E9E9' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                  <div>
                                                    <h5 style={{ fontSize: '14px', margin: '0px', color: '#333333' }}>{item?.commentedByName}</h5>
                                                    <p style={{ fontSize: '12px', margin: '0px', color: '#777777' }}>{item?.commentBycompany}</p>
                                                  </div>
                                                  {/* <div style={{ position: 'static', display: 'inline-block' }}>
                                                    <div
                                                      onClick={() => toggleDropdown(index)}
                                                      style={{ cursor: 'pointer', fontSize: '25px', fontWeight: 'bolder', color: 'gray', paddingLeft: '100px' }}>⋮</div>
                                                    {open3Array[index] && (
                                                      <div style={{ position: 'absolute', top: '61%', left: 0, background: 'white', border: '1px solid #ccc', borderRadius: '5px', zIndex: 1, width: '100px' }}>
                                                        <div className='option' style={{ padding: '5px 30px', cursor: 'pointer', fontSize: '12px' }} onClick={() => deleteComment(activity._id, item._id)}>Delete</div>
                                                        <div className='option' style={{ padding: '5px 30px', cursor: 'pointer', fontSize: '12px' }}>Report</div>
                                                      </div>
                                                    )}
                                                  </div> */}
                                                </div>
                                                <div>
                                                  <p style={{ margin: '0px', color: '#888888', fontSize: '14px' }}>{item?.comment}</p>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div>
                                          {activity?.comments?.slice(-numCommentsToShow).map((item, index) => (
                                            <div key={index} style={{ display: 'flex', margin: '5px', marginTop: '10px' }}>
                                              <img className='img2' height='40px' width='40px' src={item?.commentedByProfile} alt="" />
                                              <div style={{ maxWidth: "436px", backgroundColor: '#f0f0f0', padding: '10px', marginLeft: '10px', borderStartEndRadius: '15px', borderEndStartRadius: '15px', borderEndEndRadius: '15px', border: '2px solid #E9E9E9' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                  <div>
                                                    <h5 style={{ fontSize: '14px', margin: '0px', color: '#333333' }}>{item.commentedByName}</h5>
                                                    <p style={{ fontSize: '12px', margin: '0px', color: '#333333' }}>{item.commentedByCompany}</p>
                                                  </div>
                                                  {/* <div style={{ position: 'relative', display: 'inline-block' }}>
                                                    <div
                                                      onClick={() => toggleDropdown(index)}
                                                      style={{ cursor: 'pointer', fontSize: '25px', fontWeight: 'bolder', color: 'gray', paddingLeft: '100px' }}
                                                    >
                                                      ⋮
                                                    </div>
                                                    {open3Array[index] && (
                                                      <div
                                                        style={{
                                                          position: 'absolute',
                                                          top: '90%', // Position below the three dots icon
                                                          left: 0, // Adjust this value as needed
                                                          background: 'white',
                                                          border: '1px solid #ccc',
                                                          borderRadius: '5px',
                                                          zIndex: 9999,
                                                          width: '100px'
                                                        }}
                                                      >
                                                        <div className='option' style={{ padding: '5px 30px', cursor: 'pointer', fontSize: '12px' }} onClick={() => deleteComment(activity._id, item._id)}>Delete</div>
                                                        <div className='option' style={{ padding: '5px 30px', cursor: 'pointer', fontSize: '12px' }}>Report</div>
                                                      </div>
                                                    )}
                                                  </div> */}
                                                </div>
                                                <div>
                                                  <p style={{ margin: '0px', color: '#888888', fontSize: '14px' }}>{item?.comment}</p>
                                                </div>
                                              </div>
                                            </div>
                                          ))}

                                        </div>
                                      )}

                                      {!showAllComments[activity._id] && numCommentsToShow < activity?.comments?.length && (
                                        <h6
                                          style={{ color: '#2676C2', marginTop: '5px', cursor: 'pointer', fontWeight: '500' }}
                                          onClick={() => handleViewMoreComments(activity._id)}>
                                          View More Comments
                                        </h6>
                                      )}

                                    </div>
                                  </div>
                                )}
                              </div>
                              <hr />
                            </div>
                          ))}
                      </>
                      :
                      <div className="flex justify-center items-center animate-pulse">
                        <span className=" hover:underline cursor-pointer text-[#2676c2]">
                          Please Complete the Basic Details Profile !
                        </span>
                      </div>
                  }
                </div>
              </div>
              {postDetails?.length > 3 && (
                <div className="pl-[18px] pt-[11px]">
                  <p
                    className="text-[#2676C2] text-[18px] font-[600] font-['Poppins'] cursor-pointer"
                    onClick={toggleShowAllActivities}
                  >
                    {showAllActivities
                      ? "Show Less Activities"
                      : "Load More Activities"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="rightsideTrainerProfile w-4/12 ">
            <div className="w-full  h-[auto] bg-[#FFFFFF] border border-[#EEEEEE]">
              <div className="pl-[23px] pt-[20px]">
                <h3 className="text-[#535353] text-[18px] font-[500] font-['Poppins']">
                  Recent Application
                </h3>
                {
                  postDetails?.length > 0 ?
                    <>
                      {postDetails
                        ?.slice(
                          0,
                          showApplication
                            ? postDetails.length
                            : visibleApplications
                        )
                        ?.map((application, index) => (
                          <div key={index}>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Training Program Name
                            </div>
                            <div className=" mt-[4px] text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                              {application?.trainingName}
                            </div>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Company Name
                            </div>
                            <div className="mt-[4px] text-[#2676C2] text-[16px] font-[400]  font-['Poppins']">
                              {application?.postedByCompanyName}
                            </div>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Training Topics & Subjects
                            </div>
                            <div className="mt-[4px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                              <div className="flex space-x-5 capitalize">
                                <div>{application?.topics?.slice(0, 5)?.map((items) => <h2>{items}</h2>)}</div>
                                <div className="bg-[#8888] w-[1px]"></div>
                                <div>{application?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                              </div>
                            </div>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Type Of Training
                            </div>
                            <div className="mt-[5px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                              {application.typeOfTraining}
                            </div>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Duration Of Training
                            </div>
                            <div className="mt-[5px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                              {/* {application.trainingDuration} */}
                              {`${application?.durationCount} ${application?.durationType} ${application?.durationCount > 0 ? "'s" : ""}`}

                            </div>
                            <div className="mt-[10px] flex">
                              <div>
                                <div className="text-[#434343] text-[18px] font-[600] font-['Poppins']">
                                  Start Date
                                </div>
                                <div className="mt-[4px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                                  {application.startDate}
                                </div>
                              </div>
                              <div className="ml-[30px]">
                                <div className="text-[#434343] text-[18px] font-[600] font-['Poppins']">
                                  End date
                                </div>
                                <div className="mt-[4px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                                  {application.endDate}
                                </div>
                              </div>
                            </div>
                            {/* <div className="mt-[10px]  text-[#434343] text-[18px] font-[600] font-['Poppins']">
        Status Of Application
      </div>
      <div className="mt-[11px] mb-[20px] w-[130px] h-[23px] bg-[#2676C2] bg-opacity-20 rounded border  border-sky-600">
        <div className="pl-[36px] pr-[36px] pt-[1px] pb-[1px] text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
          {application.applicationStatus}
        </div>
      </div> */}

                            <hr />
                          </div>
                        ))}
                    </>
                    :
                    <div className="flex justify-start items-center animate-pulse">
                      <span className=" hover:underline cursor-pointer text-[#2676c2]">
                        No Applications Yet!
                      </span>
                    </div>
                }
              </div>
              {postDetails?.length > visibleApplications && (
                <div className="ml-[23px] mt-[9px] mb-[8px] text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                  {showApplication ? (
                    <button onClick={handleViewLess}>View Less</button>
                  ) : (
                    <button onClick={handleViewMore}>View More</button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-[20px] w-full min-h-[428px] h-[auto] bg-[#FFFFFF] border border-[#EEEEEE]">
              <div className="pl-[20px] pt-[20px] pr-[20px]">
                <div className="text-neutral-600 text-base font-medium font-['Poppins']">
                  Notifications
                </div>

                {/* <div className="mt-[20px] ">

                  {visibleNotifications.map((notification, index) => (
                    <div key={index}>
                      <div className="flex mt-[10px]">
                        <div className="">
                          <img
                            className="w-10 h-[40px] rounded-full"
                            src={notification.image}
                            alt=""
                          />
                        </div>
                        <div className="pl-[10px]">
                          <div className="flex justify-start flex-col">
                            <p className="text-[#434343] text-[16px] font-[400] font-['Poppins']">
                              {notification.name}
                            </p>
                            <p className="text-[#B8B8B8] text-[10px] font-[400] font-['Poppins']">
                              {notification.time}
                            </p>
                          </div>
                          {notification.accept && notification.denied && (
                            <div className="mt-[10px] flex item-center justify-center">
                              <button className="w-[125px] h-[30px] mr-[20px] text-[#2676C2] text-[16px] font-[600] font-['Poppins'] border border-[#2676C2] rounded-[8px]">
                                {notification.accept}
                              </button>
                              <button className="w-[125px] h-[30px] text-[#fff] text-[16px] font-[600] font-['Poppins'] bg-[#2676C2] rounded-[8px]">
                                {" "}
                                {notification.denied}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <hr className="mt-[10px]" />
                    </div>
                  ))}
                  {notificationMessages.length > 4 && (
                    <button
                      onClick={handleToggle}
                      className="mt-[13px] mb-[14px] pl-[5px] text-[#2676C2] text-[16px] font-[400] font-['Poppins']"
                    >
                      {showAll ? "Show Less" : "Show All"}
                    </button>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerProfile;
