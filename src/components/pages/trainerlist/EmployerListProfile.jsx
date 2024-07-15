import { useState, useEffect, useRef } from "react";
import ProfileTrainer from "../../assets/profileTrainer.png";
import ReactImg from "../../assets/react.png";
import PythonImg from "../../assets/python.png";
import FigmaImg from "../../assets/figma.png";
import AdobImg from "../../assets/adobe.png";
import Certificate from "../../assets/certifyImage.png";
import "../../styles/TrainerProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import timeago from 'timesago'
import Axios from 'axios'

const EmployerProfileList = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams()
  console.log('id', id)
  const navigate = useNavigate()
  const [seletedUser, setSeletedUser] = useState(null)
  const [postedDetails, setPostedDetails] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  useEffect(() => {
    Axios.get(`${baseUrl}/trainer/getEmployerProfileById/${id}`)
      .then((resp) => {
        setSeletedUser(resp.data?.employerDetails)
        setPostedDetails(resp.data?.employerPost)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
  console.log('user', seletedUser)
  console.log('details', postedDetails)
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
    <div className="EmployerProfileList">
      <div className="w-full flex items-center justify-start h-[70px] sticky top-0 bg-[#FFF] z-[1000]">
        <div className="flex items-center cursor-pointer" onClick={handleTrainerList}>
          <span className="">
            <svg
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
              />
            </svg>
          </span>
          <button className="text-[#888] text-[16px] font-[400] pl-[10px]">
            Back
          </button>

        </div>
      </div>
      <section className="flex w-full">
        <section className="leftsideList w-5/12">
          <section className="min-h-[200px] h-auto"
            style={{ border: "1px solid #EEEEEE" }}
          >
            <div className="pb-3">

              {
                seletedUser?.basicInfo?.profileBanner ?
                  <img className="w-full h-[90px]" src={seletedUser?.basicInfo?.profileBanner} />
                  :
                  <div className="w-full h-[90px] bg-slate-300">
                    <span></span>
                  </div>
              }
              <div
                className="flex items-end relative ms-12 h-[100px] "
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
                    <div className="flex justify-center items-center h-[100px] w-[90px] bg-slate-400 rounded-[10px] absolute top-0">
                      <span className="capitalize text-3xl">{seletedUser?.fullName[0]}</span>
                    </div>
                }

                <div className="absolute left-[120px] top-6">
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#2676C2",
                    }}
                  >
                    {seletedUser?.basicInfo?.firstName + seletedUser?.basicInfo?.lastName || seletedUser?.fullName}
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

                  {/* <Rating
                    name="half-rating-read"
                    max={5}
                    icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 25 }} />}
                    emptyIcon={
                      <StarBorderIcon sx={{ fontSize: 25, color: "#FFDE30" }} />
                    }
                    precision={0.1}
                    defaultValue={trainerData.averageRating}
                    readOnly
                  /> */}
                </div>
              </div>
            </div>
          </section>
          <section
            style={{ border: "1px solid #EEEEEE", marginTop: "20px" }}
          >
            <div style={{ padding: "18px 14px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#333333",
                }}
              >
                Experience
              </h3>
              <div className="mt-3">
                {
                  seletedUser?.experience?.length > 0 ?
                    <>
                      {
                        seletedUser?.experience?.map((exp) => {
                          return <>
                            <div className="flex flex-col space-y-3 ">
                              <div className="flex justify-start items-center gap-1 flex-wrap  lg:font-semibold lg:text-[16px]  md:font-medium md:text-[14px]  ">
                                <span>
                                  CompanyName :
                                </span>
                                <span className=" capitalize text-[#2676c2]">
                                  {exp?.companyName}
                                </span>
                              </div>
                              <div className="flex justify-start items-center gap-1 flex-wrap font-semibold  ">
                                <span>
                                  Designation :
                                </span>
                                <span className=" capitalize text-[#2676c2]">
                                  {exp?.designation2}
                                </span>
                              </div>
                              <div className="flex justify-start items-center gap-1 flex-wrap font-semibold  ">
                                <span>
                                  Start Date :
                                </span>
                                <span className=" capitalize text-[#2676c2]">
                                  {exp?.startDate}
                                </span>
                              </div>
                              <div className=" capitalize text-[#535353] text-[14px] flex flex-wrap">
                                <p className="whitespace-normal break-words overflow-hidden text-ellipsis">
                                  {exp?.roleDescription}
                                </p>
                              </div>
                              <hr className="bg-[#DEDEDE]  h-[1px] border-[1px]" />
                            </div>
                          </>
                        })
                      }
                    </>
                    :
                    <div>
                      <span>
                        No Experience added yet. Click on "+" button to add experience.
                      </span>
                    </div>
                }

              </div>

            </div>
          </section>
        </section>

        <section
          className="rightsideList w-7/12 "
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
                About {seletedUser?.basicInfo?.firstName || seletedUser?.fullName}
              </h3>
              <div className="flex items-center">

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
              </div>
            </div>
            <h3
              style={{
                color: "#535353",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "20px",
              }}

            >
              {seletedUser?.basicInfo?.aboutYou || 'Not Avaiable '}
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
              {seletedUser?.basicInfo?.objective || 'Not Avaiable '}
            </p>
            <hr />

            <div>
              <h6
                style={{
                  fontSize: "16px",
                  color: "#232323",
                  fontWeight: "500",
                  marginTop: "20px",
                }}
              >
                Recent Posts
              </h6>
              <div>
                {
                  postedDetails?.length > 0 ?
                    <>

                      {postedDetails
                        ?.map((activity, index) => (
                          <div key={index}>
                            <div className="mt-[20px] text-[#9F9F9F] text-[14px] font-[400] font-['Poppins']">
                              {/* {activity.posted} ago */}
                              Posted this {timeago(activity.createdAt)}
                            </div>
                            <div className="mt-[10px] text-[#535353] text-[16px] font-[500] font-['Poppins']">
                              {activity?.trainingName}

                            </div>
                            <div className="mt-[10px] text-[#535353] text-[14px] font-[400] font-['Poppins']">
                              {activity.description}
                            </div>
                            {/* <div className="mt-[10px] text-[#2676C2] text-[18px] font-[600] font-['Poppins']">
                                {activity.availability}
                              </div> */}
                            <div className="mt-[10px] flex items-center">
                              <div className="pl-[6px] pr-[7px] text-[#2676C2] text-[18px] font-[500] font-['Poppins']">
                                <span>{activity?.selectedCountry === 'IND' ? '₹' : '$'}</span> {activity.minBudget}
                              </div>
                              <span className="pr-[7px] text-[#2676C2]">-</span>
                              <div className="pl-[6px] text-[#2676C2] text-[18px] font-[500] font-['Poppins']">
                                <span>{activity?.selectedCountry === 'IND' ? '₹' : '$'}</span> {activity.maxBudget}
                              </div>
                            </div>
                            <div className="mt-[10px] mb-[20px] flex">
                              <div className="mr-[13px] text-[#888] text-[16px] font-[400] font-['Poppins'] capitalize">
                                Mode of Training -
                              </div>
                              <div className="text-[#2676C2] text-[16px] font-[400] font-['Poppins'] capitalize">
                                {activity?.modeOfTraining}
                              </div>
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
          </div>
          <hr className="mt-3 mb-2" />
        </section>
      </section>
    </div>
  );
};

export default EmployerProfileList;
