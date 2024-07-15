import { React, useState } from "react";
import ppp from "../../../assets/profileTrainer.png";
import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useRef, useEffect } from 'react'
import { addFeedback } from '../../../../redux/action/employers.action'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
const EmployerCompleted = ({ completed }) => {
  console.log('completed', completed);
  const dispatch = useDispatch()
  const completedData = {
    programName: "Full Stack Developer",
    topics: "Java, Js, Python, React Native",
    trainingType: "Corporate",
    duration: "10 Days",
    startDate: "01-12-2023",
    endDate: "01-01-2024",
    programStatus: "Completed",
    completedDate: "20/12/2024",
    trainer: {
      name: "Kowshik",
      role: "UI/UX Developer",
      rating: 4.5,
    },
    totalApplications: 20,
    mode: "Offline",
    location: "Bangalore",
    notes:
      "One of the best trainer Perfect person to teach they know a lot of things",
    rating: 4.5,
  };
  const [activeSteps] = useState([1, 2, 3]);
  const calculateProgressBarWidth = () => {
    const totalSteps = 3; // Update this based on the total number of steps
    const width = ((activeSteps.length - 1) / (totalSteps - 1)) * 100;
    return `${width}%`;
  };

  function generateRandomColor(name) {
    // Get the character code of the first letter of the name
    const charCode = name.charCodeAt(0);

    // Generate random offsets for more variation
    const randomOffsetR = Math.floor(Math.random() * 256);
    const randomOffsetG = Math.floor(Math.random() * 256);
    const randomOffsetB = Math.floor(Math.random() * 256);

    // Generate RGB values based on the character code and random offsets
    const red = (charCode * 7 + randomOffsetR) % 256;
    const green = (charCode * 13 + randomOffsetG) % 256;
    const blue = (charCode * 19 + randomOffsetB) % 256;

    // Construct the RGB color string
    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
  }

  const [selectedTraining, setSelectedTraining] = useState(null);


  const textareaRefRating = useRef(null);

  const [contentRating, setContentRating] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [completedDataState, setCompletedDataState] = useState({
    notes: '',
    rating: 0,
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isAcceptPopupVisible, setIsAcceptPopupVisible] = useState(false);

  useEffect(() => {
    adjustRating();
  }, [contentRating]);

  const adjustRating = () => {
    if (textareaRefRating.current) {
      textareaRefRating.current.style.height = "149px";
      textareaRefRating.current.style.overflowY = "auto";
    }
  };

  const handleChangeRating = (event, newValue) => {
    setRatingValue(newValue);
    setIsSubmitDisabled(newValue === 0 || contentRating.trim() === '');
  };

  const handleChangeFeedback = (event) => {
    setContentRating(event.target.value);
    setIsSubmitDisabled(event.target.value.trim() === '' || ratingValue === 0);
  };

  const handleRatingSubmit = () => {
    // setCompletedDataState({
    //   ...completedData,
    //   notes: contentRating,
    //   rating: ratingValue,
    // });
    const feedBack = {
      trainerId: selectedTraining?.trainerId,
      rating: ratingValue,
      feedBack: contentRating,
    }
    dispatch(addFeedback(feedBack, selectedTraining?.trainingDetailsId));

    setIsAcceptPopupVisible(false);
  };
  const selectedTraininghandler = (trainingPostDetails, trainer) => {
    // console.log("trainingPostDetails",trainingPostDetails,"trainer",trainer);
    setSelectedTraining({ ...selectedTraining, trainingDetailsId: trainingPostDetails, trainerId: trainer });
    setIsAcceptPopupVisible(true)
  }


  return (
    <>

      {
        completed?.length > 0 ?
          <>
            {
              completed?.map((details) => {
                return details?.training?.length > 0 ?
                  details.training?.map(({ trainingPostDetails, _id, feedBackDetails }) => {
                    return <div className="Training_Programm">
                      <div className="Trainer_Infoo">
                        <div className="TTTDD">
                          <p>Training Program Name</p>
                          <h3 className="Blue_H22">{trainingPostDetails.trainingName}</h3>
                          <p>Training Topics & Subjects</p>
                          {/* <h2>{completedData.topics}</h2> */}
                          <div className=" capitalize truncate ...">
                            <div className="flex space-x-2">{trainingPostDetails?.topics?.slice(0, 5)?.map((items) => <h2>{items}</h2>)}</div>
                            {/* <div className="bg-[#8888] w-[1px]"></div> */}
                            <div className="flex space-x-2">{trainingPostDetails?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                          </div>
                          <p>Type Of Training</p>
                          <h2>{trainingPostDetails.typeOfTraining}</h2>
                          <p>Duration Of Training</p>
                          <h2>{trainingPostDetails.durationCount}</h2>
                          <div className="SDEDD">
                            <div className="SDD">
                              <p>Start Date</p>
                              <h2>{trainingPostDetails.startDate}</h2>
                            </div>
                            <div className="EDD">
                              <p>End Date</p>
                              <h2>{trainingPostDetails.endDate}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="Emp_Completed_Program_Info p-[10px]">
                        <div
                          className="Stepper"
                          style={{ height: "2.5rem", marginTop: "1.5rem" }}
                        >
                          <div className="steps">
                            {[1, 2, 3].map((step) => (
                              <span
                                key={step}
                                className={`circle ${activeSteps.includes(step) ? "active" : ""
                                  }`}
                              // onClick={() => handleStepClick(step)}
                              >
                                {step}
                              </span>
                            ))}
                            <div className="progress-bar">
                              <span
                                className="indicator"
                                style={{ width: calculateProgressBarWidth() }}
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div className="Step3PS">
                          <h4>Program Status</h4>
                          <p>Completed Date: {trainingPostDetails.endDate}</p>
                        </div>
                        <div className="Program_Status">
                          <div className="Total_Partt">
                            <p>Trainer</p>
                            <div
                              className="PB"
                              style={{ border: "1px solid #DADADA", borderRadius: "10px" }}
                            >
                              <Link to={`/employerDashboard/mytrainingmanagement/completed/trainerlistprofile/${details?.trainerDetails?.trainerId}`}>
                                {
                                  details?.trainerDetails?.trainerProfileImg ?
                                    <img src={details?.trainerDetails?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                    :
                                    <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl" style={{ backgroundColor: '#f4f6f7'}}>{details?.trainerDetails?.trainerName[0]}</div>
                                }
                              </Link>
                              <div className="Trainer_Details">
                                <h2>{details?.trainerDetails?.trainerName}</h2>
                                <h3>{details.trainerDetails?.trainerDesignation}</h3>
                                <Stack
                                  spacing={1}
                                  sx={{
                                    width: "3rem",
                                    height: "0.95363rem",
                                    marginTop: "0.31rem",
                                  }}
                                  direction="row"
                                  alignItems="center"
                                >
                                  <Rating
                                    name="half-rating-read"
                                    max={5}
                                    icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 20 }} />}
                                    emptyIcon={
                                      <StarBorderIcon sx={{ fontSize: 20, color: "#FFDE30" }} />
                                    }
                                    precision={0.1}
                                    value={1} // value from api
                                    readOnly
                                  />
                                </Stack>
                              </div>
                            </div>
                            <p>Total Application</p>
                            <div className="P205">
                              <h1>{trainingPostDetails?.participantCount}</h1>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <p>Mode</p>
                                <h2>{trainingPostDetails.modeOfTraining}</h2>
                              </div>
                              {
                                trainingPostDetails.modeOfTraining === 'offline' ?
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <p>Location</p>
                                    <h2>{trainingPostDetails.location}</h2>
                                  </div>
                                  :
                                  null
                              }
                            </div>
                          </div>
                          <div className="Notess" onClick={() => { selectedTraininghandler(_id, details?.trainerDetails?.trainerId) }}>
                            <p>{feedBackDetails?.feedBack || ""}</p>
                            <Stack spacing={1}>
                              <Rating
                                name="half-rating-read"
                                max={5}
                                icon={<StarIcon sx={{ color: "DFDFDF", fontSize: 45 }} />}
                                emptyIcon={<StarBorderIcon sx={{ fontSize: 45, color: "DFDFDF" }} />}
                                precision={0.5}
                                value={feedBackDetails?.rating?.$numberDecimal || 0}
                                readOnly
                              />
                            </Stack>
                          </div>
                          {
                            isAcceptPopupVisible && feedBackDetails === undefined || "" ? (
                              <div className="Rating-Popup">
                                <div className="Rating-Popup-modalContainer ">
                                  <div className='Rating-Popup-Top' >
                                    <div className='Rating-Popup-Posted-By'>
                                      <div style={{ marginLeft: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        {
                                          details?.trainerDetails?.trainerProfileImg ?
                                            <img src={details?.trainerDetails?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                            :
                                            <div className=" flex justify-center items-center bg-slate-400">
                                              <span className=" capitalize text-3xl">
                                                {details?.trainerDetails?.trainerName[0]}
                                              </span>
                                            </div>
                                        }
                                        <div >
                                          <h2>{details?.trainerDetails?.trainerName}</h2>
                                          <h2>{details?.trainerDetails?.trainerDesignation}</h2>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='Rating-Popup-info'>
                                      <div className='Rating-C-T-B'>
                                        <h1>Company</h1>
                                        <h2>{trainingPostDetails?.postedByCompanyName}</h2>
                                        <h1>Start Date</h1>
                                        <h2>{trainingPostDetails.startDate}</h2>
                                        <h1>End Date</h1>
                                        <h2>{trainingPostDetails.endDate}</h2>
                                      </div>
                                      <div className='Rating-M-L'>
                                        <h1>Mode</h1>
                                        <h2>{trainingPostDetails?.modeOfTraining}</h2>
                                        <h1>Participants</h1>
                                        <h2>{trainingPostDetails?.participantCount}</h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='Rating-Popup-Bottom'>
                                    <h1>Give Your Feedback About This Training !</h1>
                                    <Stack spacing={1}>
                                      <Rating
                                        name="half-rating-read"
                                        max={5}
                                        icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 70 }} />}
                                        emptyIcon={<StarBorderIcon sx={{ fontSize: 70, color: "DFDFDF" }} />}
                                        precision={0.5}
                                        value={ratingValue}
                                        onChange={handleChangeRating}
                                      />
                                    </Stack>
                                    <div className="Rating_Description">
                                      <textarea
                                        ref={textareaRefRating}
                                        className=""
                                        value={contentRating}
                                        onChange={handleChangeFeedback}
                                        placeholder="Write your feedback about this training !"
                                        style={{ borderRadius: '0.4rem', minHeight: "149px", background: 'F7F7F7', }}
                                      />
                                      <button
                                        onClick={handleRatingSubmit}
                                        disabled={isSubmitDisabled}
                                        style={{ backgroundColor: (ratingValue !== 0 && contentRating.trim() !== '') ? '#2676c2' : '#DFDFDF' }}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                              :
                              null
                          }
                        </div>
                      </div>
                    </div>

                  })
                  :
                  // <div className="flex justify-center items-center w-full h-[300px] bg-slate-200 rounded-md mt-[10px]">
                  //   <span>
                  //     No Completed Training Yet !
                  //   </span>
                  // </div>
                  null
              })
            }
          </>
          :
          <div className="flex justify-center items-center w-full h-[300px] bg-[#f4f6f7] rounded-md">
            <span>
              No Completed Training Yet !
            </span>
          </div>
      }
    </>


  );
};

export default EmployerCompleted;
