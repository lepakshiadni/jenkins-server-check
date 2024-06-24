import "../../styles/TrainerMypost.css";
import { useEffect, useState, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { employerDetails } from "../../../redux/action/employers.action";
import { Skeleton } from "@mui/material";
import { addPostTrainerComments, deletePostTrainerComment, getTrainerCreatePostById, deteteTrainerPostById } from "../../../redux/action/trainercreatepost.action";

const TrainerMyPosts = () => {

  const [selectedPost, setSelectedPost] = useState(null)
  const [addNewComment, setAddNewComment] = useState('')
  const dispatch = useDispatch()

  const employer = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails?.employerDetails;
  });

  const currentUserId = employer?._id
  console.log('employer', currentUserId)

  useEffect(() => {
    dispatch(employerDetails())
    dispatch(getTrainerCreatePostById())
  }, [dispatch, selectedPost])

  const trainerCreatePostDetails = useSelector(({ trainerCreatePost }) => {
    return trainerCreatePost?.trainerCreatePostDetails?.trainercreatePost
  })

  console.log('PostTrainingData', trainerCreatePostDetails);

  const handleDeletePost = (postId, userId) => {
    dispatch(deteteTrainerPostById(postId, userId))
  }

  const [likedPosts, setLikedPosts] = useState([]);

  // useEffect(() => {
  //   if (trainerCreatePostDetails) {
  //     trainerCreatePostDetails?.forEach(post => {
  //       post.likes.forEach(like => {
  //         setLikedPosts(prevLikedPosts => [...prevLikedPosts, like._id]);
  //       });
  //     });
  //   }

  // }, [trainerCreatePostDetails, dispatch]);


  // const handleIconClick2 = async (postId, currentUserId) => {
  //   try {
  //     console.log('Liked post:', postId);

  //     // Optimistically update the UI to indicate that the post is liked
  //     setLikedPosts(prevLikedPosts => [...prevLikedPosts, currentUserId]);
  //     // Dispatch the action to like the post
  //     await dispatch(addlikePostTrainer(postId, currentUserId));

  //   } catch (error) {
  //     console.error('Error:', error);
  //     setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== currentUserId));
  //   }
  // };



  let commentRef = useRef();
  let messageref = useRef()

  useEffect(() => {
    let handler = (e) => {

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

  const toggleHandleMessageMore = (post, selectedpostDetails) => {
    setMessageShowMoreBasedOnProfile((prevState) => {
      const updatedState = [...prevState]; // Make a copy of the current state array
      updatedState[post] = !updatedState[post]; // Toggle the value at the specified index
      return updatedState;
    });
    setSelectedPost(selectedpostDetails)
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
    await dispatch(deletePostTrainerComment(postId, comentId))
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
      const postId = selectedPost?._id
      console.log(comment, postId)
      await dispatch(addPostTrainerComments(postId, comment))
      setAddNewComment('')
    }
  }

  return (
    <section>
      <section className='feedcontentRight' style={{ height: "650px", overflowY: "scroll", marginTop: '10px' }} >

        {trainerCreatePostDetails?.length > 0 ? <>
          {trainerCreatePostDetails.map((post, index) => (

            <div key={post._id}>
              <div className="centered-section2 " >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: 'center' }}>
                    <Link to={`/trainerProfile`}>
                      <div style={{ marginRight: "10px" }}>
                        {/* <img className='img2' height='60px' width='60px' src={post?.postedByImg} alt="" /> */}
                        {
                          post?.postedByImg ?
                            <img className='img2' height='60px' width='60px' src={post.postedByImg} alt="" />
                            :
                            <div className='flex justify-center items-center h-[60px] w-[60px] rounded-full bg-slate-200'>
                              <span>
                                {post?.postedByName[0]}
                              </span>
                            </div>
                        }
                      </div>
                    </Link>
                    <div style={{ textAlign: "start" }}>
                      <h5
                        style={{
                          fontSize: "20px",
                          margin: "0px",
                          color: "#333333",
                        }}
                      >
                        {post?.postedByName}
                      </h5>
                      <h5
                        style={{
                          fontSize: "15px",
                          color: "#535353",
                          // marginTop: "10px",
                        }}
                      >
                        {post?.postedByDesignation}
                      </h5>
                      <p
                        style={{
                          fontSize: "14px",
                          margin: "0px",
                          color: "#535353",
                        }}
                      >
                        {post?.postedByCompanyName}
                      </p>
                    </div>
                  </div>

                  <div onClick={() => handleDeletePost(post._id, post.postedById)}>
                    {/* <img className="cursor-pointer" src={DeteleSvg} alt="" /> */}
                    <MdDeleteForever className="cursor-pointer" style={{ color: '#e60000', height: '25px', width: '25px', }} />
                  </div>
                </div>

                <p style={{ fontSize: '14px', color: '#888888', marginTop: '10px', marginBottom: '10px' }}>
                  {post.postedDescrition}
                </p>
                <img width='100%' src={post.postedImg.postImg} alt="" />

                <section>
                  <hr style={{ margin: '10px 0px' }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
                </section>
              </div>
              <div style={{ width: "100%" }}>
                {!messageShowMoreBasedOnProfile[post._id] ? null : (
                  <div ref={messageref} className="messageFooter">

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
                                  <p style={{ margin: '0px', color: '#888888', fontSize: '14px' }}>{item?.comment}</p>
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
                                  <p style={{ margin: '0px', color: '#888888', fontSize: '14px' }}>{item?.comment}</p>
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

          ))}

        </> :

          <>
           <div className="flex justify-center items-center bg-slate-200 h-[400px] w-full">
            <span>
              No Post Yet !
            </span>
           </div>
          </>
        }
      </section>
    </section>
  );
};

export default TrainerMyPosts;
