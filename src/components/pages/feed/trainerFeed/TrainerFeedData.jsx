import '../../../styles/Feed.css'
import { useEffect, useState, useRef } from 'react';
import RequestSound from '../../../assets/requestsound.mp3'
import PopUp from './PopUp';
import { useDispatch, useSelector } from 'react-redux'
import {createConversation, getConversation, getAllRequestedConnection } from '../../../../redux/action/trainer.action'
import { getAllPostTrainingRequirementAction, addPostTrainingComments, addlikePostTraining, deletePostTrainingComment, addHidePost, addBookMarkPostTraining } from '../../../../redux/action/postRequirement.action'
import TrainerApplyPopup from './../../../utils/TrainerApplyPopUp';
import ProfileImage from '../../../utils/ProfileImage'
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { S3 } from 'aws-sdk'


const TrainerFeeData = ({ postrainingData }) => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [addNewComment, setAddNewComment] = useState('')
  const [connectSound] = useState(new Audio(RequestSound));
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch()
  const s3 = new S3();
  console.log(process.env.REACT_APP_S3_ACCESSKEY_KEY)
  console.log('url', process.env.REACT_APP_BASE_URL)

  const trainer = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails?.trainerDetails;
  })
  // console.log(trainer);
  const currentUserId = trainer?._id
  useEffect(() => {
    // dispatch(getAllPostTrainingRequirementAction())
    dispatch(getConversation(currentUserId))
    dispatch(getAllRequestedConnection())
  }, [dispatch, selectedPost])

  const connections = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.connections?.conversation;
  })
  const requested = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.newRequest;
  })
  const existRequest = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.requestedConnections?.conversation;
  })

  console.log('existeRequest', existRequest)


  // useEffect(() => {
  //   if (requested?.success === true) {
  //     connectSound?.play();
  //   }
  //   toast.info(requested?.message, {
  //     position: "top-right",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  // }, [requested]);
  // console.log('resquest', requested)
  // console.log('PostTrainingData', PostTrainingData);


  const [likedPosts, setLikedPosts] = useState([]);
  const [appliedPost, setAppliedPosts] = useState([])
  const [bookMarkPost, setBookMarkPost] = useState([])

  useEffect(() => {
    if (postrainingData) {
      postrainingData?.forEach(post => {
        post?.likes?.forEach(like => {
          setLikedPosts(prevLikedPosts => [...prevLikedPosts, like._id]);
        });
      });
    }
    if (postrainingData) {
      postrainingData?.forEach(post => {
        post?.bookMark?.forEach(book => {
          setBookMarkPost(prevBookMarkedPosts => [...prevBookMarkedPosts, book._id]);
        });
      });
    }
    if (postrainingData) {
      const appliedIds = [];
      postrainingData.forEach(post => {
        post?.applicants?.forEach(applicant => {
          appliedIds.push(applicant.appliedBy);
        });
      });
      setAppliedPosts(prevApply => [...prevApply, ...new Set(appliedIds)]);
    }
  }, [postrainingData, dispatch]);


  const handleIconClick = async (postId, currentUserId) => {
    await dispatch(addBookMarkPostTraining(postId, currentUserId))
    setBookMarkPost([...bookMarkPost, postId]);
  };

  const handleIconClick2 = async (postId, currentUserId) => {
    try {
      await dispatch(addlikePostTraining(postId, currentUserId));

      setLikedPosts([...likedPosts, postId]); // Update likedPosts state

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleIconClick3 = async (postId, currentUserId) => {
    try {
      console.log('hide post:', postId);
      await dispatch(addHidePost(postId, currentUserId));
      setOpen2([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [open2, setOpen2] = useState(Array(postrainingData.length).fill(false));

  const handleMenuClick = (index, post) => {
    setSelectedPost(post)
    const updatedOpenState = [...open2];
    updatedOpenState[index] = !updatedOpenState[index];
    setOpen2(updatedOpenState.map((isOpen, idx) => (idx === index ? isOpen : false)));
  };

  const [open3Array, setOpen3Array] = useState([]);
  // Function to toggle the dropdown menu for a specific comment
  const toggleDropdown = (index) => {
    setOpen3Array((prevOpenArray) => {
      const newOpen3Array = [...prevOpenArray];
      newOpen3Array[index] = !newOpen3Array[index];

      // Close all other dropdowns
      for (let i = 0; i < newOpen3Array.length; i++) {
        if (i !== index) {
          newOpen3Array[i] = false;
        }
      }
      return newOpen3Array;
    });
  };

  const [showMoreArray, setShowMoreArray] = useState(new Array(postrainingData?.length).fill(false));

  const handleShowMoreClick = (index, post) => {
    const newShowMoreArray = [...showMoreArray];
    newShowMoreArray[index] = !newShowMoreArray[index];
    setShowMoreArray(newShowMoreArray);
    setSelectedPost(post)
  };

  const [messageShowMoreBasedOnProfile, setMessageShowMoreBasedOnProfile] = useState([]);

  const toggleHandleMessageMore = (post, selectedpostDetails) => {
    setMessageShowMoreBasedOnProfile(prevState => {
      const updatedState = [...prevState]; // Make a copy of the current state array
      updatedState[post] = !updatedState[post]; // Toggle the value at the specified index
      return updatedState;
    });
    setSelectedPost(selectedpostDetails)
    setResetComments(true);
  };

  const [numCommentsToShow, setNumCommentsToShow] = useState(1);
  const [resetComments, setResetComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState(new Array(postrainingData?.length).fill(false));

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

  const [PopUpButton, setPopUpButton] = useState(false)
  const [applyPopUp, setApplyPopUp] = useState(false)
  let menuRef2 = useRef(null)
  let menuRef3 = useRef()
  let commentRef = useRef()
  let showmoreRef2 = useRef()
  let messageref = useRef()

  useEffect(() => {
    let handler = (e) => {

      if (menuRef2.current && !menuRef2.current.contains(e.target)) {
        setOpen2([]);
      }
      if (menuRef3.current && !menuRef3.current.contains(e.target)) {
        setOpen3Array([]);
      }
      if (commentRef.current && !commentRef.current.contains(e.target)) {
        setShowAllComments(false);
      }
      if (commentRef.current && !commentRef.current.contains(e.target) && !showAllComments) {
        setNumCommentsToShow((prevNum) => Math.min(prevNum + 4));
      }
      if (showmoreRef2.current && !showmoreRef2.current.contains(e.target)) {
        setShowMoreArray([]);
      }
      if (messageref.current && !messageref.current.contains(e.target)) {
        setMessageShowMoreBasedOnProfile([]);
      }
      if (resetComments) {
        setShowAllComments(false);
        setNumCommentsToShow(1);
        setResetComments(false);
      }

    };
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [open2, open3Array, showMoreArray, showAllComments, messageShowMoreBasedOnProfile, numCommentsToShow]);

  const deleteComment = async (postId, comentId) => {
    await dispatch(deletePostTrainingComment(postId, comentId))
    setOpen3Array([]);
  };

  let errorComment;
  const handleAddComment = async (e) => {
    e.preventDefault()
    // if (addNewComment !== '') {
    //   const comment = {
    //     commentedByUser: trainer?._id,
    //     commentText: addNewComment
    //   }
    //   const postId = selectedPost?._id
    //   await dispatch(addPostTrainingComments(postId, comment))
    //   setAddNewComment('')
    // }
    // else{
    //   alert('Please enter a comment')
    // }
    if (addNewComment?.length > 0) {
      const comment = {
        commentedByUser: trainer?._id,
        commentText: addNewComment
      }
      const postId = selectedPost?._id
      await dispatch(addPostTrainingComments(postId, comment))
      setAddNewComment('')
    }
    else {
      errorComment = true
      alert('Please enter a comment')
    }
    // if(addNewComment ?.length===0){
    //   errorComment = true
    // }

  }
  // console.log('selectedPost', selectedPost)
  const connectionHandler = (post) => {
    setSelectedPost(post)
    dispatch(createConversation(trainer?._id, selectedPost?.postedById));
    toast.info('Requested Successfully Waiting for Accept')

  }

  //for dowload the file 
  // const downloadFileHandler = async () => {
  //   const fileData = selectedPost?.tocFile?.fileData?.data;
  //   const buffer = new Uint8Array(fileData).buffer;
  //   const bufferBlob = new Blob([buffer], { type: "application/octet-stream" });
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     const arrayBuffer = fileReader.result;
  //     const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
  //     try {
  //       const url = window.URL.createObjectURL(blob);
  //       const link = createDownloadLink(url, selectedPost?.tocFile?.tocFileName);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(url);
  //     } catch (error) {
  //       alert("An error occurred while downloading the file. Please try again later.");
  //     }
  //   };
  //   fileReader.readAsArrayBuffer(bufferBlob);
  // }
  const downloadFileHandler = async () => {
    const fileLink = selectedPost?.tocFile?.tocUrl;

    if (!fileLink) {
      alert("File link is not available.");
      return;
    }


    try {
      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME, // Replace with your bucket name
        Key: '', // Replace with your file key
        ResponseContentDisposition: 'attachment; filename="download"',
      };

      const url = await s3.getSignedUrlPromise('getObject', params);
      window.location.href = url;
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };


  // const downloadFileHandler = async () => {
  //   const fileLink = selectedPost?.tocFile?.tocUrl;

  //   if (!fileLink) {
  //     alert("File link is not available.");
  //     return;
  //   }

  //   try {
  //     // Create a temporary anchor element
  //     const link = document.createElement('a');
  //     link.href = fileLink;
  //     link.download = selectedPost?.tocFile?.tocFileName || 'download'; // Set the default filename if not provided
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error downloading file:', error);
  //     alert('Error downloading file. Please try again.');
  //   }
  // };


  const createDownloadLink = (href, downloadName) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = downloadName;
    return a;
  }

  const array = [1, 2, 3]
  console.log('errormessage', errorComment)
  return (
    <section >

      <PopUp trigger={PopUpButton} setTrigger={setPopUpButton}>
      </PopUp>
      <TrainerApplyPopup trigger={applyPopUp} setTrigger={setApplyPopUp} selectedPost={selectedPost} trainderId={trainer?._id} ></TrainerApplyPopup>

      <section className='feedcontentRight' ref={showmoreRef2} style={{ height: '650px', overflowY: 'scroll' }} >
        {postrainingData?.length > 0 ? <>
          {postrainingData?.map((post, index) => (

            <>
              {
                post?.hide?.some(hide => hide._id === currentUserId) ? null : (

                  <div className='' key={post._id}>
                    <div className='centered-section2'>
                      <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                          <Link to={`/trainerDashboard/feed/employerprofilelist/${post?.postedById}`}>
                            <div style={{ marginRight: '10px' }}>
                              {/*                                 
                                  // <img className='img2' height='60px' width='60px' src={post.postedByImg} alt="" />
                                  // :
                                  // <div className='flex justify-center items-center h-[60px] w-[60px] rounded-full bg-slate-200'>
                                  //   <span>
                                  //     {post?.postedByName[0]}
                                  //   </span>
                                  // </div> */}
                              <ProfileImage image={post?.postedByImg} name={post?.postedByName} w={60} h={60} r={'full'} />
                            </div>
                          </Link>
                          <div style={{ textAlign: 'start' }}>
                            <h5 style={{ fontSize: '18px', margin: '0px', color: '#333333' }}>{post.postedByName}</h5>
                            <p style={{ fontSize: '14px', margin: '0px', color: "#535353" }}>{post.postedByCompanyName}</p>
                          </div>
                        </div>
                        <div className='flex items-center'>
                          {/* {
                            post?.urgentlyNeedTrainer === 'true' ?

                              <div>
                                <span className=' text-red-600 animate-pulse text-sm'>
                                  Urgently Required
                                </span>
                              </div>
                              :
                              null

                          } */}
                          <div className='inst me-5' onClick={() => handleIconClick(post._id, currentUserId)}>

                            {bookMarkPost.includes(currentUserId) && post?.bookMark?.some(instId => instId._id === currentUserId) ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 18" fill="none" >
                                <path d="M0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V18L7 15L0 18Z" fill="#2676C2" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"  >
                                <path d="M4.16699 17.5V4.16667C4.16699 3.70833 4.33019 3.31597 4.65658 2.98958C4.98296 2.66319 5.37533 2.5 5.83366 2.5H14.167C14.6253 2.5 15.0177 2.66319 15.3441 2.98958C15.6705 3.31597 15.8337 3.70833 15.8337 4.16667V17.5L10.0003 15L4.16699 17.5ZM5.83366 14.9583L10.0003 13.1667L14.167 14.9583V4.16667H5.83366V14.9583Z" fill="#8D8D8D" className='icon-path' />
                              </svg>
                            )}
                          </div>

                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <div
                              onClick={() => handleMenuClick(index, post)}
                              style={{ cursor: 'pointer', fontSize: '25px', fontWeight: 'bolder', color: 'gray', marginRight: "30px" }}
                            >
                              ⋮
                            </div>
                            {open2[index] && (
                              <div
                                ref={menuRef2}
                                style={{
                                  position: 'absolute',
                                  background: 'white',
                                  border: '1px solid #ccc',
                                  borderRadius: '5px',
                                  zIndex: 9999,
                                  width: '100px',
                                  right: 30,
                                }}
                              >
                                <div>
                                  {
                                    connections?.some(conversation =>
                                      conversation?.members?.some(member => member?._id === currentUserId) &&
                                      conversation?.members?.some(member => member?._id === selectedPost?.postedById) &&
                                      conversation?.requestStatus === 'accepted'
                                    ) ?
                                      (
                                        // If conversation exists, show "Connected" message
                                        <p style={{
                                          color: 'green', padding: "5px",
                                          fontSize: "12px",
                                          fontWeight: "bold"
                                        }}>
                                          Connected
                                        </p>
                                      )
                                      :
                                      (

                                        <div className='option' >
                                          {/* Connect */}
                                          {requested?.success ||
                                            existRequest?.some(conversation =>
                                              conversation?.members?.some(member => member?._id === currentUserId) &&
                                              conversation?.members?.some(member => member?._id === selectedPost?.postedById) &&
                                              conversation?.requestStatus === 'pending') ?
                                            <span className="text-[#2676c2] text-[12px] p-[5px] ">Requested</span> :
                                            <span className="" onClick={() => { connectionHandler(post) }} style={{ padding: '5px', cursor: 'pointer', fontSize: '12px' }}>
                                              Connect
                                            </span>
                                          }
                                        </div>
                                      )
                                  }
                                </div>
                                <div onClick={() => handleIconClick3(post._id, currentUserId)} className='option' style={{ padding: '5px', cursor: 'pointer', fontSize: '12px' }}>Not Interested!</div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                      <h5 className='font-[600]' style={{ fontSize: '15px', color: '#535353', marginTop: '10px' }}>{post?.trainingName}</h5>
                      <p
                        // className={showMoreArray[index] ? "show-more" : "show-less"}
                        style={{ fontSize: '14px', color: '#535353' }}>
                        {post.description}
                        {/* <hr style={{ margin: '10px 0px' }} /> */}
                        <div className='skilldata'>

                          <div style={{ display: 'flex', marginTop: '10px', height: '25px', justifyContent: 'space-between' }}>
                            <h5 className='font-[600]' style={{ color: '#535353' }}>Wanted skills</h5>
                            <button onClick={() => {
                              setApplyPopUp(true);
                              setSelectedPost(post)
                            }} 
                              disabled={appliedPost.includes(currentUserId) && post?.applicants?.some(user => user?.appliedBy === currentUserId)}
                            >
                              {appliedPost.includes(currentUserId) && post?.applicants?.some(user => user?.appliedBy === currentUserId) ? <span className='text-[white] bg-[green] px-11 py-1.5 rounded-md block'>Applied</span> : <span className='text-[white] bg-[#2676C2] px-11 py-1.5 rounded-md block'>Apply</span>}

                            </button>

                          </div>
                          <div>
                            {post.topics.map((val, index) => (
                              <div key={index}>
                                <p>{val}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='skilldata2'>
                          <h5><span className='skillchild font-[600]'>Type of training -</span> <span className='skillchild2'>{post.typeOfTraining}</span></h5>
                          {/* <h5><span className='skillchild font-[600]' >Experience - </span><span className='skillchild2'>{post.experience} years</span></h5> */}
                          <h5><span className='skillchild font-[600]' >Duration of training -</span> <span className='skillchild2'>{post.durationCount} {post.durationType}{post?.durationCount > 1 ? "'s" : ""}</span></h5>
                          <h5><span className='skillchild font-[600]' >Budget -</span> <span className='skillchild2'> <span>{post?.selectedCountry === 'IND' ? '₹' : '$'}</span> {post.minBudget} - <span>{post?.selectedCountry === 'IND' ? '₹' : '$'}</span> {post.maxBudget} /<span className='text-sm'>{post?.durationType}</span> </span> </h5>
                          {
                            post?.tocFile?.tocFileName?.length > 0 ?

                              <h5 style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}><span className='skillchild font-[600]' >Table of content - <span style={{ color: 'rgb(180, 161, 161)' }}>{post?.tocFile?.tocFileName}</span></span>
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
                            <h5 style={{ marginRight: '20px', marginTop: "0px", marginBottom: '0px' }}><span className='skillchild font-[600]' style={{ marginBottom: '15px' }}>Start Date</span> <br /> <span className='skillchild2'>{post.startDate}</span> </h5>

                            <h5 style={{ margin: '0px' }}><span className='skillchild font-[600]' >End Date</span> <br /> <span className='skillchild2'>{post.endDate}</span> </h5>

                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <h5><span className='skillchild font-[600]' >Mode of Training -</span><span className='skillchild2'>{post?.modeOfTraining}</span></h5>
                            <div className='skillfooter2'>
                              <h2 className="text-[#2676C2] font-[500] ">{post?.likes?.length}</h2>
                              <div onClick={() => handleIconClick2(post._id, currentUserId)} >
                                {likedPosts.includes(currentUserId) && post.likes.some(like => like._id === currentUserId) ?
                                  (
                                    <svg className='comments' xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none" style={{ cursor: 'pointer', marginLeft: '5px' }}>
                                      <path d="M15.2307 18.5961H5.32688V6.59612L11.9615 0L12.8076 0.846124C12.9115 0.949974 12.9977 1.08747 13.0663 1.25862C13.1348 1.42977 13.1691 1.59099 13.1691 1.74227V1.99612L12.1076 6.59612H18.1923C18.6679 6.59612 19.0881 6.7785 19.4528 7.14325C19.8176 7.50798 20 7.92818 20 8.40383V10.0192C20 10.123 19.9891 10.2352 19.9673 10.3557C19.9455 10.4762 19.9128 10.5884 19.8692 10.6923L17.0038 17.4538C16.8602 17.7743 16.6198 18.0448 16.2827 18.2653C15.9455 18.4858 15.5948 18.5961 15.2307 18.5961ZM3.82693 6.59612V18.5961H0V6.59612H3.82693Z" fill="#2676C2" />
                                    </svg>

                                  ) : (
                                    <div>

                                      <svg className='like ' xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="#2676c3" style={{ cursor: 'pointer', marginLeft: '5px' }}>
                                        <path d="M5.17851 6.64395H1H0.85V6.79395V17.5939V17.7439H1H5.09038H5.24038H5.39038H14.7077C15.0676 17.7439 15.4113 17.6344 15.7365 17.4218L15.6544 17.2962L15.7365 17.4218C16.0604 17.21 16.2977 16.9455 16.4403 16.6272L16.4404 16.6272L16.4416 16.6244L19.0204 10.539L19.021 10.5392L19.0251 10.5263C19.0567 10.428 19.0849 10.3226 19.11 10.2103C19.1362 10.0931 19.15 9.98101 19.15 9.8747V8.42088C19.15 7.94945 18.9674 7.53406 18.6137 7.1803C18.2599 6.82651 17.8445 6.64395 17.3731 6.64395H11.5316L12.4446 2.68767L12.4484 2.67102V2.65394V2.42547C12.4484 2.26652 12.4124 2.1024 12.3451 1.93439L12.3451 1.93438C12.2776 1.76617 12.1901 1.62384 12.0791 1.51288L12.0791 1.51287L11.3176 0.751356L11.2118 0.645598L11.1058 0.751048L5.17851 6.64395ZM5.09038 16.0939H2.49998V8.29393H5.09038V16.0939ZM14.7077 16.0939H6.74036V7.43087L10.503 3.68382L9.49031 8.11048L9.44834 8.29393H9.63653H17.3731C17.4184 8.29393 17.4452 8.30703 17.4661 8.32789C17.4869 8.34874 17.5 8.37552 17.5 8.42088V9.91323L14.916 15.9598C14.8925 16.0146 14.8636 16.0431 14.833 16.059L14.833 16.059C14.7843 16.0845 14.743 16.0939 14.7077 16.0939Z" fill="#8D8D8D" stroke="#8D8D8D" stroke-width="0.3" className='icon-path' />
                                      </svg>
                                    </div>
                                  )}
                              </div>

                              <svg className='comments' xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" onClick={() => toggleHandleMessageMore(post._id, post)} style={{ cursor: 'pointer' }}>
                                <path d="M3.59961 16.9203L5.12357 15.7012L5.13478 15.6926C5.45249 15.4384 5.61281 15.3101 5.79168 15.2188C5.95216 15.1368 6.12328 15.0771 6.2998 15.0408C6.49877 15 6.70603 15 7.12207 15H15.8031C16.921 15 17.4806 15 17.908 14.7822C18.2843 14.5905 18.5905 14.2842 18.7822 13.9079C19 13.4805 19 12.9215 19 11.8036V4.19691C19 3.07899 19 2.5192 18.7822 2.0918C18.5905 1.71547 18.2837 1.40973 17.9074 1.21799C17.4796 1 16.9203 1 15.8002 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002V15.6712C1 16.7369 1 17.2696 1.21846 17.5433C1.40845 17.7813 1.69644 17.9198 2.00098 17.9195C2.35115 17.9191 2.76744 17.5861 3.59961 16.9203Z" stroke="#8D8D8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <svg className='sendFooter' xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none" onClick={() => setPopUpButton(index)} >
                                <path d="M3.7877 10.5782L10.6412 10.5782M16.2379 11.9923L3.94466 18.5004C2.84298 19.0837 2.29183 19.3754 1.92856 19.2915C1.61346 19.2188 1.3531 18.9989 1.22953 18.7001C1.08705 18.3555 1.28403 17.7632 1.67834 16.5802L3.51042 11.084C3.573 10.8963 3.60399 10.8026 3.61642 10.7066C3.62745 10.6214 3.62799 10.5353 3.61697 10.45C3.60482 10.3562 3.57418 10.2643 3.51439 10.085L1.67809 4.57606C1.28377 3.3931 1.08676 2.8014 1.22924 2.45681C1.35281 2.15797 1.61313 1.93763 1.92822 1.86487C2.29155 1.78097 2.84286 2.07247 3.9449 2.6559L16.2381 9.16407C17.1045 9.62275 17.5377 9.8523 17.6794 10.1582C17.8027 10.4247 17.8029 10.7319 17.6795 10.9984C17.538 11.3042 17.1048 11.5335 16.2393 11.9917L16.2379 11.9923Z" stroke="#8D8D8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>

                            </div>
                          </div>
                        </div>
                      </p>
                      {/* <button onClick={() => handleShowMoreClick(index, post)} style={{ background: 'none', border: 'none', color: '#2676C2', cursor: 'pointer', padding: "0px", margin: '0px' }}>
                        {showMoreArray[index] ? 'Less' : 'more'}
                      </button>

                      {!showMoreArray[index] && (

                        <section>
                          <hr style={{ margin: '10px 0px' }} />

                          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>

                            <div className='skillFooter'>
                              <p style={{ color: '#2676C2', fontWeight: '400px', margin: '0px' }}>  <span>{post?.selectedCountry === 'IND' ? '₹' : '$'}</span> {post.minBudget} - <span>{post?.selectedCountry === 'IND' ? '₹' : '$'}</span> {post.maxBudget} /<span className='text-sm'>{post?.durationType}</span></p>
                              <p style={{ margin: '0px' }}> <span style={{ color: 'gray' }}>Mode of Training</span> <span style={{ color: '#2676C2', fontWeight: '400px' }}>- {post?.modeOfTraining}</span> </p>
                            </div>
                            <div className='skillfooter2'>
                              <h2 className="text-[#2676C2] font-[500]">{post?.likes?.length}</h2>
                              <div onClick={() => handleIconClick2(post._id, currentUserId)} >
                                {likedPosts.includes(currentUserId) && post.likes.some(like => like._id === currentUserId) ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" style={{ cursor: 'pointer', marginLeft: '5px' }}>
                                    <path d="M15.2307 18.5961H5.32688V6.59612L11.9615 0L12.8076 0.846124C12.9115 0.949974 12.9977 1.08747 13.0663 1.25862C13.1348 1.42977 13.1691 1.59099 13.1691 1.74227V1.99612L12.1076 6.59612H18.1923C18.6679 6.59612 19.0881 6.7785 19.4528 7.14325C19.8176 7.50798 20 7.92818 20 8.40383V10.0192C20 10.123 19.9891 10.2352 19.9673 10.3557C19.9455 10.4762 19.9128 10.5884 19.8692 10.6923L17.0038 17.4538C16.8602 17.7743 16.6198 18.0448 16.2827 18.2653C15.9455 18.4858 15.5948 18.5961 15.2307 18.5961ZM3.82693 6.59612V18.5961H0V6.59612H3.82693Z" fill="#2676C2" />
                                  </svg>) : (
                                  <svg className='like' xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="#2676c3" style={{ cursor: 'pointer', marginLeft: '5px' }}>
                                    <path d="M5.17851 6.64395H1H0.85V6.79395V17.5939V17.7439H1H5.09038H5.24038H5.39038H14.7077C15.0676 17.7439 15.4113 17.6344 15.7365 17.4218L15.6544 17.2962L15.7365 17.4218C16.0604 17.21 16.2977 16.9455 16.4403 16.6272L16.4404 16.6272L16.4416 16.6244L19.0204 10.539L19.021 10.5392L19.0251 10.5263C19.0567 10.428 19.0849 10.3226 19.11 10.2103C19.1362 10.0931 19.15 9.98101 19.15 9.8747V8.42088C19.15 7.94945 18.9674 7.53406 18.6137 7.1803C18.2599 6.82651 17.8445 6.64395 17.3731 6.64395H11.5316L12.4446 2.68767L12.4484 2.67102V2.65394V2.42547C12.4484 2.26652 12.4124 2.1024 12.3451 1.93439L12.3451 1.93438C12.2776 1.76617 12.1901 1.62384 12.0791 1.51288L12.0791 1.51287L11.3176 0.751356L11.2118 0.645598L11.1058 0.751048L5.17851 6.64395ZM5.09038 16.0939H2.49998V8.29393H5.09038V16.0939ZM14.7077 16.0939H6.74036V7.43087L10.503 3.68382L9.49031 8.11048L9.44834 8.29393H9.63653H17.3731C17.4184 8.29393 17.4452 8.30703 17.4661 8.32789C17.4869 8.34874 17.5 8.37552 17.5 8.42088V9.91323L14.916 15.9598C14.8925 16.0146 14.8636 16.0431 14.833 16.059L14.833 16.059C14.7843 16.0845 14.743 16.0939 14.7077 16.0939Z" fill="#8D8D8D" stroke="#8D8D8D" stroke-width="0.3" className='icon-path' />

                                  </svg>
                                )}
                              </div>

                              <svg className='comments' xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" style={{ cursor: 'pointer' }}
                                onClick={() => toggleHandleMessageMore(post._id, post)}
                              >
                                <path d="M3.59961 16.9203L5.12357 15.7012L5.13478 15.6926C5.45249 15.4384 5.61281 15.3101 5.79168 15.2188C5.95216 15.1368 6.12328 15.0771 6.2998 15.0408C6.49877 15 6.70603 15 7.12207 15H15.8031C16.921 15 17.4806 15 17.908 14.7822C18.2843 14.5905 18.5905 14.2842 18.7822 13.9079C19 13.4805 19 12.9215 19 11.8036V4.19691C19 3.07899 19 2.5192 18.7822 2.0918C18.5905 1.71547 18.2837 1.40973 17.9074 1.21799C17.4796 1 16.9203 1 15.8002 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002V15.6712C1 16.7369 1 17.2696 1.21846 17.5433C1.40845 17.7813 1.69644 17.9198 2.00098 17.9195C2.35115 17.9191 2.76744 17.5861 3.59961 16.9203Z" stroke="#8D8D8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

                              </svg>
                              <svg className='sendFooter' xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none" onClick={() => setPopUpButton(true)}  >
                                <path d="M3.7877 10.5782L10.6412 10.5782M16.2379 11.9923L3.94466 18.5004C2.84298 19.0837 2.29183 19.3754 1.92856 19.2915C1.61346 19.2188 1.3531 18.9989 1.22953 18.7001C1.08705 18.3555 1.28403 17.7632 1.67834 16.5802L3.51042 11.084C3.573 10.8963 3.60399 10.8026 3.61642 10.7066C3.62745 10.6214 3.62799 10.5353 3.61697 10.45C3.60482 10.3562 3.57418 10.2643 3.51439 10.085L1.67809 4.57606C1.28377 3.3931 1.08676 2.8014 1.22924 2.45681C1.35281 2.15797 1.61313 1.93763 1.92822 1.86487C2.29155 1.78097 2.84286 2.07247 3.9449 2.6559L16.2381 9.16407C17.1045 9.62275 17.5377 9.8523 17.6794 10.1582C17.8027 10.4247 17.8029 10.7319 17.6795 10.9984C17.538 11.3042 17.1048 11.5335 16.2393 11.9917L16.2379 11.9923Z" stroke="#8D8D8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </section>
                      )} */}

                    </div>

                    <div style={{ width: '100%' }}>

                      {!messageShowMoreBasedOnProfile[post._id] ? null : (
                        <div ref={messageref}>

                          <div className='messageFooter'>

                            <div className='messageContent'>
                              {/* <img className='img2' height='50px' width='50px' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /> */}
                              {
                                trainer?.basicInfo?.profileImg ?
                                  <img className="h-[50px] w-[50px] rounded-full" alt='Imgae' src={trainer?.basicInfo?.profileImg} />
                                  :
                                  <div className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-slate-300 ">
                                    <span>
                                      {trainer?.fullName[0]}
                                    </span>
                                  </div>

                              }

                              <div className='messageChild'>
                                <form onSubmit={handleAddComment} className='flex items-center justify-center'>
                                  <div>
                                    {
                                      errorComment === true ?
                                        <span className='text-xs text-red-900 flex  items-center'>
                                          Please enter the value

                                        </span>
                                        :
                                        null
                                    }
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

                            </div>
                            <h6 style={{ marginTop: '10px', color: '#535353', fontSize: '14px', fontWeight: '500' }}> Most Recent comment </h6>

                            {showAllComments[post._id] ? (

                              <div>
                                {post?.comments?.map((item, index) => (

                                  <div className='' key={index} style={{ display: 'flex', margin: '5px', marginTop: '10px' }}>

                                    {
                                      item?.commentedByProfile ? <>
                                        <img className='img2 rounded-[50%]' height='30px' width='30px' src={item?.commentedByProfile} alt="" />
                                      </>
                                        :
                                        <div className=' capitalize flex justify-center items-center h-[35px] w-[35px] bg-[#f4f6f7]'>
                                          <span >
                                            {item?.commentedByName?.charAt(0)}
                                          </span>
                                        </div>
                                    }
                                    <div style={{ maxWidth: "50%", backgroundColor: '#f0f0f0', padding: '10px', marginLeft: '10px', borderStartEndRadius: '15px', borderEndStartRadius: '15px', borderEndEndRadius: '15px', border: '2px solid #E9E9E9' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                        <p>
                                          comment{item?.commentText}
                                        </p>
                                        <div className='me-5'>
                                          <h5 style={{ fontSize: '14px', margin: '0px', color: '#333333' }}>{item?.commentedByName}</h5>
                                          {/* <p style={{ fontSize: '12px', margin: '0px', color: '#777777' }}>{item?.commentedByCompany}</p> */}
                                        </div>
                                        {
                                          item?.commentedByUser === currentUserId ?
                                            <div style={{ position: 'static', display: 'inline-block' }}>
                                              <div
                                                onClick={() => toggleDropdown(index)}
                                                style={{ cursor: 'pointer', fontSize: '25px', fontWeight: 'bolder', color: 'gray' }}>⋮</div>
                                              {open3Array[index] && (
                                                <div ref={menuRef3} style={{ position: 'absolute', top: '61%', left: 0, background: 'white', border: '1px solid #ccc', borderRadius: '5px', zIndex: 1, width: '100px' }}>
                                                  <div className='option' style={{ padding: '5px 30px', cursor: 'pointer', fontSize: '10px' }} onClick={() => deleteComment(post._id, item._id)}>Delete</div>
                                                  <div className='option' style={{ padding: '5px 30px', cursor: 'pointer', fontSize: '10px' }}>Report</div>
                                                </div>
                                              )}
                                            </div>
                                            : null
                                        }
                                      </div>
                                      <div>
                                        <p style={{ margin: '0px', color: '#888888', fontSize: '10px' }}>{item?.commentText}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                            ) : (

                              <div>

                                {post?.comments?.slice(0, numCommentsToShow).map((item, index) => (
                                  <div key={index} style={{ display: 'flex', margin: '5px', marginTop: '10px' }}>
                                    {/* <img className='img2' height='40px' width='40px' src={item?.commentedByProfile} alt="" /> */}
                                    {
                                      item?.commentedByProfile ? <>
                                        <img className='img2 rounded-full h-[60px] w-[60px]' src={item?.commentedByProfile} alt="" />
                                      </>
                                        :
                                        <div className=' capitalize flex justify-center items-center h-[35px] w-[35px] bg-[#f4f6f7] rounded-full'>
                                          <span >
                                            {item?.commentedByName?.charAt(0)}

                                          </span>
                                        </div>
                                    }
                                    <div style={{ maxWidth: "90%", backgroundColor: '#f0f0f0', padding: '5px', marginLeft: '10px', borderStartEndRadius: '15px', borderEndStartRadius: '15px', borderEndEndRadius: '15px', border: '2px solid #E9E9E9' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className='me-5'>
                                          <h5 style={{ fontSize: '14px', margin: '0px', color: '#333333' }}>{item?.commentedByName}</h5>
                                          {/* <p style={{ fontSize: '12px', margin: '0px', color: '#777777' }}>{item.commentedByCompany}</p> */}
                                        </div>
                                        {
                                          item?.commentedByUser === currentUserId ?
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                              <div

                                                onClick={() => toggleDropdown(index)}
                                                style={{ cursor: 'pointer', fontSize: '25px', fontWeight: 'bolder', color: 'gray' }}
                                              >
                                                ⋮
                                              </div>
                                              {open3Array[index] && (
                                                <div
                                                  ref={menuRef3}
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
                                                  <div className='option' style={{ padding: '5px 30px', cursor: 'pointer', fontSize: '12px' }} onClick={() => deleteComment(post._id, item._id)}>Delete</div>
                                                  <div className='option' style={{ padding: '5px 30px', cursor: 'pointer', fontSize: '12px' }}>Report</div>
                                                </div>
                                              )}
                                            </div>
                                            : null
                                        }
                                      </div>
                                      <div>
                                        <p style={{ color: '#888888', fontSize: '14px' }}>{item?.commentText}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                              </div>

                            )}

                            {!showAllComments[post._id] && numCommentsToShow < post?.comments?.length && (
                              <h6
                                style={{ color: '#2676C2', marginTop: '5px', cursor: 'pointer', fontWeight: '500' }}
                                onClick={() => handleViewMoreComments(post._id)}>
                                View More Comments
                              </h6>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <br />
                  </div>
                )
              }

            </>
          ))}

        </>
          :
          <>
            {
              array?.map(() => {
                return <>
                  <div className='flex gap-2 justify-start'>
                    <Skeleton variant="circular" width={50} height={50} />
                    <Skeleton variant="text" width={500} sx={{ fontSize: '1rem' }} />
                  </div>
                  <div className='flex flex-col ml-[38px] gap-1 '>
                    <Skeleton className='rounded-sm' variant="rectangular" width={500} height={60} />
                    <Skeleton variant="text" width={500} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" width={500} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" width={500} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" width={500} sx={{ fontSize: '1rem' }} />
                  </div>
                  <br /><br />

                </>
              })
            }
          </>
        }

      </section>


    </section>
  );
}

export default TrainerFeeData;