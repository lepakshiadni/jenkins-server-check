import '../../styles/EmployerMypost.css'
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deletePostTrainingRequirement, getPostTrainingRequirementAction } from '../../../redux/action/postRequirement.action'
import ProfileImage from '../../utils/ProfileImage'
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom'
import { S3 } from 'aws-sdk'
import DeteleSvg from '../../assets/Delete.svg'
import { MdDeleteForever } from "react-icons/md";
import EditSvg from '../../assets/edit.svg'
import EmployerPostEdit from '../employerprofile/employerprofileedit/EmployerPostEdit';

const EmployerMyPosts = () => {
  const [selectedPost, setSelectedPost] = useState(null)

  const dispatch = useDispatch()
  const s3 = new S3();
  console.log(process.env.REACT_APP_S3_ACCESSKEY_KEY)

  const trainer = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails?.trainerDetails;
  })
  // console.log(trainer);
  const currentUserId = trainer?._id
  useEffect(() => {
    dispatch(getPostTrainingRequirementAction())
  }, [dispatch, selectedPost])

  const PostTrainingData = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails
  })

  console.log('PostTrainingData', PostTrainingData);

  const [showMoreArray, setShowMoreArray] = useState(new Array(PostTrainingData?.length).fill(false));

  const handleShowMoreClick = (index, post) => {
    const newShowMoreArray = [...showMoreArray];
    newShowMoreArray[index] = !newShowMoreArray[index];
    setShowMoreArray(newShowMoreArray);
    setSelectedPost(post)
  };
  let showmoreRef2 = useRef()

  useEffect(() => {
    let handler = (e) => {

      if (showmoreRef2.current && !showmoreRef2.current.contains(e.target)) {
        setShowMoreArray([]);
      }

    };
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  });


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

  const array = [1, 2, 3]

  let commentRef = useRef();
  let messageref = useRef()
  let menuRef = useRef(null)

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen([])
      }
      if (commentRef.current && !commentRef.current.contains(e.target)) {
        setShowAllComments(false);
      }
      if (messageref.current && !messageref.current.contains(e.target)) {
        setMessageShowMoreBasedOnProfile([]);
      }
      if (
        commentRef.current &&
        !commentRef.current.contains(e.target) &&
        !showAllComments
      ) {
        setNumCommentsToShow((prevNum) => Math.min(prevNum + 4));
      }
      if (resetComments) {
        setShowAllComments(false);
        setNumCommentsToShow(1);
        setResetComments(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });


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

  // const [addNewComment, setAddNewComment] = useState('')
  // const handleAddComment = async (e) => {
  //   e.preventDefault()
  //   if (addNewComment !== '') {
  //     const comment = {
  //       commentedByUserId: employer?._id,
  //       commentedByProfile: employer?.basicInfo?.profileImg,
  //       commentedByName: employer?.fullName,
  //       commentedByCompany: employer?.basicInfo?.company,
  //       comment: addNewComment
  //     }
  //     // const postId = selectedPost?._id
  //     // console.log(comment, postId)
  //     // await dispatch(addPostTrainerComments(postId, comment))
  //     setAddNewComment('')
  //   }
  // }


  const [model2, setModel2] = useState(false)
  const [selectedPostDetails, setSelectedPostDetails] = useState(null);

  const handleEditClick = (post) => {
    setSelectedPostDetails(post);
    setModel2(true);
    setOpen([])
  };
  const [open, setOpen] = useState(new Array(PostTrainingData?.length).fill(false));

  const handleMenuClick = (index) => {
    const updatedOpenState = [...open];
    updatedOpenState[index] = !updatedOpenState[index];
    setOpen(updatedOpenState.map((isOpen, idx) => (idx === index ? isOpen : false)));
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePostTrainingRequirement(postId))
    setOpen([])
  }

  return (
    <section >
      <EmployerPostEdit trigger={model2} setTrigger={setModel2} postDetails={selectedPostDetails} />

      <section className='feedcontentRight' ref={showmoreRef2} style={{ height: '650px', overflowY: 'scroll' }} >
        {PostTrainingData?.length > 0 ? <>
          {PostTrainingData?.map((post, index) => (

            <div className='' key={post._id}>
              <div className='centered-section2'>
                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex' }}>
                    <Link to={`/employerprofile`}>
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

                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div
                      onClick={() => handleMenuClick(index)}
                      style={{ cursor: 'pointer', fontSize: '25px', fontWeight: 'bolder', color: 'gray' }}
                    >
                      ⋮
                    </div>
                    {open[index] && (
                      <div
                        ref={menuRef}
                        style={{
                          position: 'absolute',
                          top: '100%', // Position below the three dots
                          left: -100,
                          background: 'white',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          width: '100px',
                          zIndex: 9999, // Set a high z-index value
                        }}
                      >
                        <div className='option flex items-center justify-between cursor-pointer' style={{ padding: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }} onClick={() => handleDeletePost(post._id)}>
                          <h3>Delete</h3>
                          {/* <img width='22%' height='22%' src={DeteleSvg} alt="" /> */}
                          <MdDeleteForever style={{color:'#e60000',height:'18%',width:'28%'}}/>
                        </div>
                        <div className='option flex items-center justify-between cursor-pointer' style={{ padding: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }} onClick={() => handleEditClick(post)}>
                          <h3>Edit</h3>
                          <img width='30%' height='30%' src={EditSvg} alt="" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <div className="flex items-center justify-between ">
                    <div style={{ height: '40%', width: '40%' }} onClick={() => handleDeletePost(post._id)}>
                      <img className="cursor-pointer" src={DeteleSvg} alt="" />
                    </div>
                    <div style={{ height: '50%', width: '50%' }} onClick={() => handleEditClick(post)}>
                      <img className="cursor-pointer" src={EditSvg} alt="" />
                    </div>
                  </div> */}
                </div>
                <h5 className='font-[600]' style={{ fontSize: '15px', color: '#535353', marginTop: '10px' }}>{post?.trainingName}</h5>
                <p
                  className={showMoreArray[index] ? "show-more2" : "show-less2"} style={{ fontSize: '14px', color: '#535353' }}>
                  {post.description}
                  {/* <hr style={{ margin: '10px 0px' }} /> */}
                  <div className='skilldata'>

                    <div style={{ display: 'flex', marginTop: '10px', height: '25px' }}>
                      <h5 className='font-[600]' style={{ color: '#535353' }}>Wanted skills</h5>
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
                    <h5><span className='skillchild font-[600]' >Budget -</span> <span className='skillchild2'><span>{post?.selectedCountry === 'IND' ? '₹' : '$'}</span> {post.minBudget} - <span>{post?.selectedCountry === 'IND' ? '₹' : '$'}</span> {post.maxBudget} /<span className='text-sm'>{post?.durationType}</span> </span> </h5>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h5 style={{ margin: '0px' }}> <span className='skillchild font-[600]' >Mode of Training</span> <span className='skillchild2'>- {post?.modeOfTraining}</span> </h5>
                      <div className="flex">
                        <div className="me-3" style={{ display: 'flex', justifyItems: 'center' }}>
                          <h2 className="me-1">{post?.likes?.length}</h2>
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
                            onClick={() => toggleHandleMessageMore(post._id)}
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
                  </div>
                </p>
                <button onClick={() => handleShowMoreClick(index, post)} style={{ background: 'none', border: 'none', color: '#2676C2', cursor: 'pointer', padding: "0px", margin: '0px' }}>
                  {showMoreArray[index] ? 'Show Less' : 'Show more'}
                </button>

                {!showMoreArray[index] && (

                  <section>
                    <hr style={{ margin: '10px 0px' }} />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                      <div className='skillFooter'>
                        <p style={{ color: '#2676C2', fontWeight: '400px', margin: '0px' }}> <span>{post?.selectedCountry === 'IND' ? '₹' : '$'}</span> {post?.minBudget} - <span>{post?.selectedCountry === 'IND' ? '₹' : '$'}</span> {post.maxBudget} /<span className='text-sm'>{post?.durationType}</span></p>
                        <p style={{ margin: '0px' }}> <span style={{ color: 'gray' }}>Mode of Training</span> <span style={{ color: '#2676C2', fontWeight: '400px' }}>- {post?.modeOfTraining}</span> </p>
                      </div>
                      <div className="flex">
                        <div className="me-3" style={{ display: 'flex', justifyItems: 'center' }}>
                          <h2 className="me-1">{post?.likes?.length}</h2>
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
                            onClick={() => toggleHandleMessageMore(post._id)}
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
                  </section>
                )}

              </div>
              <div style={{ width: "100%" }}>
                {!messageShowMoreBasedOnProfile[post._id] ? null : (
                  <div ref={messageref}>
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
                      {showAllComments[post._id] ? (
                        <div>
                          {post?.comments?.map((item, index) => (
                            <div className='' key={index} style={{ display: 'flex', margin: '5px', marginTop: '10px' }}>
                              <img className='img2' height='40px' width='40px' src={item.imageUrl} alt="" />
                              <div style={{ maxWidth: "436px", backgroundColor: '#f0f0f0', padding: '10px', marginLeft: '10px', borderStartEndRadius: '15px', borderEndStartRadius: '15px', borderEndEndRadius: '15px', border: '2px solid #E9E9E9' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div>
                                    <h5 style={{ fontSize: '14px', margin: '0px', color: '#333333' }}>{item?.commentedByName}</h5>
                                    <p style={{ fontSize: '12px', margin: '0px', color: '#777777' }}>{item?.commentBycompany}</p>
                                  </div>
                                </div>
                                <div>
                                  <p style={{ margin: '0px', color: '#888888', fontSize: '14px' }}>{item?.commentText}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          {post?.comments?.slice(-numCommentsToShow).map((item, index) => (
                            <div key={index} style={{ display: 'flex', margin: '5px', marginTop: '10px' }}>
                              <img className='img2' height='40px' width='40px' src={item?.commentedByProfile} alt="" />
                              <div style={{ maxWidth: "436px", backgroundColor: '#f0f0f0', padding: '10px', marginLeft: '10px', borderStartEndRadius: '15px', borderEndStartRadius: '15px', borderEndEndRadius: '15px', border: '2px solid #E9E9E9' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div>
                                    <h5 style={{ fontSize: '14px', margin: '0px', color: '#333333' }}>{item.commentedByName}</h5>
                                    <p style={{ fontSize: '12px', margin: '0px', color: '#333333' }}>{item.commentedByCompany}</p>
                                  </div>
                                </div>
                                <div>
                                  <p style={{ margin: '0px', color: '#888888', fontSize: '14px' }}>{item?.commentText}</p>
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
              <hr />
              <br />
            </div>

          ))}

        </>
          :

          <>
            <div className="flex justify-center items-center bg-[#f4f6f7] h-[400px] w-full">
              <span>
                No Post Yet !
              </span>
            </div>
          </>
        }

      </section>


    </section>
  );
}

export default EmployerMyPosts;