import { useState, useEffect, useRef } from "react";
import Banner from "../../assets/Profile Banner.png";
import ProfileTrainer from "../../assets/profileTrainer.png";
import ReactImg from "../../assets/react.png";
import PythonImg from "../../assets/python.png";
import FigmaImg from "../../assets/figma.png";
import AdobImg from "../../assets/adobe.png";
import Certificate from "../../assets/certifyImage.png";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "../../styles/TrainerProfile.css";
import TrainerPopUp from "./TrainerPopUp";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Axios from 'axios'

const TrainerListProfile = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  // const { '*': userId } = useParams()
  const { id } = useParams()
  console.log('id', id)
  // const parts = userId.split('/'); // Splitting the string by '/'
  // const id = parts[parts.length - 1]; // Getting the last part of the array
  // console.log('params id ', id);
  const navigate = useNavigate()
  const [seletedUser, setSeletedUser] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [feedBack, setFeedBack] = useState()

  useEffect(() => {
    Axios.get(`${baseUrl}/employer/getTrainerDetailsById/${id}`)
      .then((resp) => {
        setSeletedUser(resp.data?.trainerDetails)
        setFeedBack(resp.data?.findFeedBack?.[0])

      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
  console.log('feedback', feedBack)
  const handlehirepopup = () => {
    setShowPopup(true)
  }
  console.log('selectedUser', seletedUser)
  const trainerData = {
    id: 1,
    name: "Kowshik",
    designation: "UI UX Developer",
    about:
      "A passionate and experienced trainer with expertise in UI/UX design and frontend development.",
    skillDescription:
      "I am Kowshik, a dedicated UI/ UX Developer and Trainer.With a keen eye for design and a commitment to education, I am on a mission to share my expertise with aspiring designers.",
    skills: [
      { name: "React", imgSrc: ReactImg, percentage: 100 },
      { name: "Python", imgSrc: PythonImg, percentage: 50 },
      { name: "Adobe", imgSrc: AdobImg, percentage: 40 },
      { name: "Figma", imgSrc: FigmaImg, percentage: 70 },
    ],
    certifications: [
      {
        title: "Frontend Development Masterclass",
        description:
          "Completion of a comprehensive masterclass covering the latest frontend development techniques and best practices. Learn how to build responsive and interactive user interfaces using cutting-edge technologies.",
        image: Certificate,
      },
      {
        title: "Another Certification",
        description: "Description for another certification.",
        image: Certificate,
      },
    ],
    reviews: [
      {
        user: "Wills",
        profileImage: ProfileTrainer,
        companyName: "techzoo",
        rating: 4,
        comment:
          "One of the best trainers! Perfect person to teach, they know all the things.",
      },
      {
        user: "Sarah",
        profileImage: ProfileTrainer,
        companyName: "sarah_doe",
        rating: 3,
        comment:
          "Great learning experience. The trainer is knowledgeable and explains concepts clearly.",
      },
      {
        user: "Sarah",
        profileImage: ProfileTrainer,
        companyName: "sarah_doe",
        rating: 1,
        comment:
          "Great learning experience. The trainer is knowledgeable and explains concepts clearly.",
      },
      {
        user: "Sarah",
        profileImage: ProfileTrainer,
        companyName: "sarah_doe",
        rating: 5,
        comment:
          "Great learning experience. The trainer is knowledgeable and explains concepts clearly.",
      },
      {
        user: "Sarah",
        profileImage: ProfileTrainer,
        companyName: "sarah_doe",
        rating: 5,
        comment:
          "Great learning experience. The trainer is knowledgeable and explains concepts clearly.",
      },
    ],
    calculateAverageRating: function () {
      let totalRating = 0;
      const numberOfUsers = this.reviews.length;

      this.reviews.forEach((review) => {
        totalRating += review.rating;
      });

      this.averageRating = numberOfUsers > 0 ? totalRating / numberOfUsers : 0;
    },
  };
  trainerData.calculateAverageRating();

  const [skillValues, setSkillValues] = useState(
    seletedUser?.skills.reduce((acc, skill) => {
      acc[skill.name] = skill.range;
      return acc;
    }, {})
  );
  const [rendered, setRendered] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRendered(true);

      setSkillValues((prevValues) => ({
        ...prevValues,
      }));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  let menuRef = useRef();

  const handleIconClick = () => {
    setIsSelected(!isSelected);
  };
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

  const handleTrainerList = () => {
    // navigate("/employerDashboard/trainerlist")
    window.history.back()
  }
  return (
    <div className="trainerListProfile">
      <div className="w-full flex items-center justify-start h-[40px] sticky top-0 bg-[white]  z-[1000]">
        <div className="flex items-center w-[10%] h-[35px] rounded-md  hover:bg-[#f4f6f7] cursor-pointer" onClick={handleTrainerList}>
          <span className="">
            {/* <svg
            className=""
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
            >
              <path
                d="M21 10.4286L1 10.4286M1 10.4286L9.57143 19M1 10.4286L9.57143 1.85714"
                stroke="#888888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className=""
              />
            </svg> */}
           <ArrowBackIcon className="text-[#535353]"/>
          </span>
          <button className="text-[#535353] text-[16px]  font-[400] pl-[10px]">
            Back
          </button>

        </div>
      </div>
      <section className="flex w-full">
        <section className="leftsideList w-6/12">
          <section className="min-h-[200px] h-auto" style={{ border: "1px solid #EEEEEE" }}>
            <div className="pb-3">

              {
                seletedUser?.basicInfo?.profileBanner ?
                  <img className="w-full h-[90px]" src={seletedUser?.basicInfo?.profileBanner} />
                  :
                  <div className="w-full h-[90px] bg-[#f4f6f7]">
                    <span></span>
                  </div>
              }
              <div
                className="flex items-end relative ms-12 h-[110px] "
                style={{ top: "-20px" }}
              >
                {
                  seletedUser?.basicInfo?.profileImg ?
                    <img
                      style={{ borderRadius: "10px" }}
                      height="100px"
                      width="90px"
                      src={seletedUser?.basicInfo?.profileImg}
                      alt=""
                      className="absolute top-[0]"
                    />

                    :
                    <div className="flex justify-center items-center h-[100px] w-[90px] bg-[#f4f6f7] rounded-[10px] absolute top-0">
                      <span className="capitalize text-3xl">{seletedUser?.fullName?.[0]}</span>
                    </div>
                }

                <div className="absolute left-[120px] ">
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#2676C2",
                    }}
                  >
                    {seletedUser?.fullName}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#6A6A6A",
                    }}
                  >
                    {seletedUser?.basicInfo?.designation || "Not Available"}
                  </p>

                  <Rating
                    name="half-rating-read"
                    max={5}
                    icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 25 }} />}
                    emptyIcon={
                      <StarBorderIcon sx={{ fontSize: 25, color: "#FFDE30" }} />
                    }
                    precision={0.1}
                    defaultValue={feedBack?.averageRating}
                    readOnly
                  />

                </div>
              </div>
            </div>
          </section>
          <section style={{ border: "1px solid #EEEEEE", marginTop: "20px" }}>
            <div style={{ padding: "18px 14px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#535353",
                }}
              >
                Skills
              </h3>
              <div className="mt-2">
                {
                  seletedUser?.skills?.length > 0 ?
                    <>
                      {seletedUser?.skills.map((val, index) => {
                        return (
                          <div className="flex mb-5 gap-2" key={index}>

                            {!val.image ? (
                              <h3 style={{ padding: '6px 12px', fontWeight: 600, backgroundColor: 'gray', color: '#FFF' }}>
                                {val.name[0]}
                              </h3>
                            ) : (
                              <img className="w-[48px] h-[48px]" src={val.image} alt="" />
                            )}
                            <div className="w-full text-end">
                              <h6
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  color: "#6A6A6A",
                                }}
                              >{`${val.name}`}<span className='text-[#2676c2]'> {`${val?.range === undefined ? '' : val?.range}`}</span><span className='text-[#2676c2]'>Years</span></h6>


                              <div
                                className=""
                                style={{
                                  background: "#ddd",
                                  borderRadius: "5px",
                                  height: "8px",
                                  width: "100%", // Set default width
                                  overflow: "hidden", // Hide overflowing content
                                }}
                              >
                                <div
                                  className=" fill w-full rounded-[5px] "
                                  style={{
                                    // "--width": `${val ? (val.range / 15) * 100 + "%" : "0"}`,
                                    // "--width": `${val ? ((val.range / 18) * 100 > 50 ? 100 - ((val.range / 15) * 100 - 50) * 2 : (val.range / 15) * 100) + "%" : "0"}`,
                                    "--width": `${val.range ? ((val.range / 18) * 100 > 50 ? 100 - ((val.range / 15) * 100 - 50) * 2 : (val.range / 15) * 100) + "%" : "0"}`,
                                  }}
                                />
                              </div>

                              {/* <input
                                className=" w-full rounded-[5px]"
                                readOnly
                                type="range"
                                min="0"
                                max="15"
                                value={val?.range ? val?.range : 0}
                                 style={{
                                    transition: "width 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
                                    
                                  }}
                              /> */}

                            </div>
                          </div>
                        )
                      })}
                    </> :
                    null
                }
              </div>
            </div>
          </section>
          <div className="w-[full] flex justify-center items-center mt-[20px]">

            <button
              onClick={handlehirepopup}
              style={{
                padding: "5px 81px",
                backgroundColor: "#2676C2",
                color: "#FFF",
                fontSize: "20px",
                fontWeight: "500",
                borderRadius: "10px",
              }}
            >
              Hire
            </button>
          </div>
        </section>
        <TrainerPopUp trigger={showPopup} setTrigger={setShowPopup} id={seletedUser?._id} />
        {/* <TrainerPopUp isActive={isActive} onToggle={handleToggle}/> */}
        <section
          className="rightsideList w-6/12"
          style={{ border: "1px solid #EEEEEE", marginLeft: "20px" }}
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3
                style={{
                  color: "#232323",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                About {seletedUser?.fullName}
              </h3>
              {/* <div className="flex items-center">

                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <div
                    ref={menuRef}
                    onClick={() => {
                      setOpen(!open);
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "25px",
                      fontWeight: "bolder",
                      color: "gray",
                    }}
                  >
                    ⋮
                  </div>
                  {open && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        zIndex: 1,
                        width: "100px",
                      }}
                    >
                      <div
                        className="option"
                        style={{
                          padding: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Connect
                      </div>
                      <div
                        className="option"
                        style={{
                          padding: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Not Connect
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
            </div>
            <h3
              style={{
                color: "#535353",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "20px",
              }}
            >
              {seletedUser?.basicInfo?.aboutYou || "Not  Available"}


            </h3>
            <p
              style={{
                color: "#535353",
                fontSize: "14px",
                fontWeight: "400",
                marginTop: "20px",
              }}
            >
              {" "}
              {seletedUser?.basicInfo?.objective}
            </p>
            <div>
              <h6
                style={{
                  fontSize: "16px",
                  color: "#232323",
                  fontWeight: "500",
                  marginTop: "20px",
                }}
              >
                Certifications
              </h6>
              {
                seletedUser?.certificateDetails?.length > 0 ?
                  <>

                    {seletedUser?.certificateDetails?.map(({ certification, certificateHead, certificateUrl, certificationDescription, institution }, index) => (
                      <div key={index}>
                        <h6
                          style={{
                            fontSize: "14px",
                            color: "#535353",
                            fontWeight: "500",
                            marginTop: "10px",
                            
                          }}
                        >
                          {certificateHead}
                        </h6>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#535353",
                            fontWeight: "400",
                            marginTop: "20px",
                          }}
                        >
                          {certificationDescription}
                        </p>

                        {certificateUrl.toLowerCase().endsWith('.pdf') ? (
                          <iframe
                            title="Certificate"
                            style={{ width: '100%', height: '417px' }}
                            className="mt-7 h-[221px] w-[500px]" src={certificateUrl} alt="PDF Certificate" />
                        ) : (
                          <img className="mt-[20px]" src={certificateUrl} alt="Image Certificate" />
                        )}
                        <hr className="m-3" />
                      </div>
                    ))}
                  </>
                  :
                  <div>
                    <span className="text-[#535353] text-[15px]">
                      No Certifications
                    </span>

                  </div>
              }
            </div>
          </div>
          <hr className="mt-3 mb-2" />
          <div className="p-5">
            <h3
              style={{
                fontSize: "16px",
                color: "#232323",
                fontWeight: "500",
                marginBottom: "40px",
              }}
            >
              Feedback & Reviews
            </h3>
            {
              feedBack?.feedBackDetails?.length > 0
                ?
                <>
                  {
                    feedBack?.feedBackDetails?.
                      slice(0, showAllReviews ? undefined : 2)
                      ?.map((review, index) => (
                        <div className="flex items-start" key={index}>
                          <img
                            style={{
                              borderRadius: "50px",
                              height: "50px",
                              width: "50px",
                              overflow: "hidden",
                            }}
                            src={review?.reviewedByImg}
                            alt=""
                          />
                          <div className="ms-3">
                            <h6
                              style={{
                                fontSize: "16px",
                                color: "#232323",
                                fontWeight: "400",
                              }}
                            >
                              {review?.reviewedByName}
                            </h6>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#535353",
                                fontWeight: "500",
                              }}
                            >
                              {review?.reviewedByDesignation}
                            </p>
                            <span>
                              <Rating
                                name="half-rating-read"
                                max={5}
                                icon={<StarIcon style={{ color: "#FFDE30" }} />}
                                emptyIcon={
                                  <StarBorderIcon style={{ color: "#FFDE30" }} />
                                }
                                precision={0.1}
                                defaultValue={review?.rating}
                                readOnly
                              />
                            </span>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#535353",
                                fontWeight: "400",
                              }}
                            >
                              {review?.feedBack}
                            </p>
                            <hr className="mt-4 mb-4" />
                          </div>
                        </div>
                      ))
                  }
                  {feedBack?.reviews?.length > 2 && (
                    <h6
                      style={{
                        color: "#2676C2",
                        fontSize: "16px",
                        fontWeight: "500",
                        cursor: "pointer",
                        textAlign: "end",
                      }}
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? "Less feedback" : "More feedback"}
                    </h6>
                  )}

                </>
                :
                <div className="w-full h-[100px] flex justify-center items-center">
                  <span>
                    No Reviews
                  </span>
                </div>
            }
          </div>
        </section>
      </section>
    </div>
  );
};

export default TrainerListProfile;
