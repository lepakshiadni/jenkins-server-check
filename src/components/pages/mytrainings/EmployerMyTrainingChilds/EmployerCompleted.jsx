import { React, useState } from "react";
import ppp from "../../../assets/profileTrainer.png";
import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useRef, useEffect } from 'react'
import { addFeedback } from '../../../../redux/action/employers.action'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAcceptedTrainingEmployer } from '../../../../redux/action/employers.action'
const EmployerCompleted = () => {
  let completed;


  const dispatch = useDispatch()

  const [activeSteps] = useState([1, 2, 3]);
  const calculateProgressBarWidth = () => {
    const totalSteps = 3; // Update this based on the total number of steps
    const width = ((activeSteps.length - 1) / (totalSteps - 1)) * 100;
    return `${width}%`;
  };
  useEffect(() => {
    dispatch(getAcceptedTrainingEmployer())
  }, [dispatch])
  const appliedTraining = useSelector(({ employerSignUp }) => {
    return employerSignUp?.getAppliedTrainingEmployer
  })
  console.log('applied', appliedTraining)


  if (appliedTraining?.success) {
    completed = appliedTraining?.getAppliedTraining?.map((details) => {
      return {
        trainerDetails: {
          trainerId: details.trainerId,
          trainerProfileImg: details.trainerProfileImg,
          trainerName: details.trainerName,
          trainerDesignation: details.trainerDesignation,
          trainerRating: details.trainerRating
        },
        training: details?.trainingDetails?.filter(({ appliedStatus, trainingPostDetails }) => {
          if (appliedStatus) {
            // Check if training is completed
            return trainingPostDetails &&
              trainingPostDetails.startDate < new Date().toISOString().substr(0, 10) &&
              trainingPostDetails.endDate < new Date().toISOString().substr(0, 10);
          }
        })
      };
    });
  }
  console.log('completed', completed);



  const [selectedTraining, setSelectedTraining] = useState(null);


  const textareaRefRating = useRef(null);

  const [contentRating, setContentRating] = useState("");
  const [ratingValue, setRatingValue] = useState(0);


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
                  details.training?.map(({ trainingPostDetails, _id, feedBack }) => {

                    return <div>
                      <div className="w-full  lg:h-[400px]  flex gap-2 p-[10px]">
                        <div className="h-full p-[15px]  w-[30%] shadow rounded-tl-md rounded-bl-md overflow-y-scroll Scroll   capitalize">
                          <div className="flex flex-col gap-3">
                            <div>
                              <h1 className=" font-medium lg:text-[16px] md:14px">
                                Training Programming Name
                              </h1>
                              <span className="text-[#2676c2] font-[400] lg:text-[14px] md:text-[12px] truncate ">
                                {trainingPostDetails?.trainingName}

                              </span>
                            </div>
                            <div>
                              <h1 className="text-[16px]">
                                Training Topics & Subjects
                              </h1>

                              <div className="flex flex-col gap-1 text-[14px] text-[#535353]  ">

                                {
                                  trainingPostDetails?.topics?.map((items) => <h2>{items}</h2>)
                                }
                              </div>
                            </div>
                            <div>
                              <h1 className="text-[16px]">
                                Type Of Training
                              </h1>
                              <span className="text-[#535353] text-[14px]">

                                {trainingPostDetails?.typeOfTraining}
                              </span>
                            </div>
                            <div>
                              <h1>
                                Duration Of Training
                              </h1>
                              <span className="text-[#535353] text-[14px]">

                                {trainingPostDetails?.durationCount} {trainingPostDetails?.durationType}{trainingPostDetails?.durationCount > 1 ? "'s" : null}
                              </span>
                            </div>
                            <div>
                              <h1>
                                Budget
                              </h1>
                              <div className="flex gap-3">

                                <h1 className="text-[#535353] text-[14px]">Max-<span className="text-[#2676c2] font-[500]">{trainingPostDetails?.maxBudget}</span></h1>
                                <h1 className="text-[#535353] text-[14px]">Min-<span className="text-[#2676c2] font-[500]">{trainingPostDetails?.minBudget}</span></h1>
                              </div>
                            </div>
                            <div className="flex gap-[50px]">
                              <div>
                                <h1 className="text-[16px]">
                                  Start Date
                                </h1>
                                <span className="text-[#535353] text-[14px]">
                                  {trainingPostDetails.startDate}

                                </span>
                              </div>
                              <div>
                                <h1 className="text-[16px] ">
                                  End Date
                                </h1>
                                <span className="text-[#535353] text-[14px]">
                                  {trainingPostDetails.endDate}

                                </span>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="h-full w-[70%] shadow rounded-tr-md rounded-br-md   capitalize">
                          <div className="Stepper flex flex-col justify-end ">
                            <div className="steps">
                              {[1, 2, 3].map((step) => (
                                <span
                                  key={step}
                                  className={`circle ${activeSteps.includes(step) ? "active" : ""
                                    }`}
                                >
                                  {step}
                                </span>
                              ))}
                              <div className="progress-bar">
                                <span
                                  className="indicator"
                                  style={{
                                    width: calculateProgressBarWidth(),
                                  }}
                                ></span>
                              </div>
                            </div>
                            <div className="">
                              <h4 className="text-[13px]">Program Status</h4>
                              <div className="w-[144px] h-[18px] bg-[#2676C233]  rounded-md flex justify-center items-center ">
                                <span className="text-[11px] text-[#2676c2]">Ended Date:{trainingPostDetails?.endDate}</span>
                              </div>
                            </div>
                          </div>

                          <div className="w-full h-[75%]  flex">
                            <div className="w-[35%] h-full  flex flex-col justify-start items-center p-[10px]">
                              <div>
                                <h1 className="text-[16px] ">
                                  Trainer
                                </h1>
                                <div className="w-[200px] h-[100px] border rounded-md flex">
                                  <Link to={`/employerDashboard/mytrainingmanagement/ongoing/trainerlistprofile/${details?.trainerDetails?.trainerId}`}>
                                    {
                                      details?.trainerDetails?.trainerProfileImg ?
                                        <img
                                          className="w-[80px] h-full rounded-tl-md  rounded-bl-md"
                                          src={details?.trainerDetails?.trainerProfileImg}
                                        />
                                        :
                                        <div className="w-[80px] h-full rounded-tl-md  rounded-bl-md bg-[#f4f6f7] flex justify-center items-center">
                                          <span className="text-[25px] font-bold">
                                            {details?.trainerDetails?.trainerName?.[0]}
                                          </span>
                                        </div>
                                    }
                                  </Link>

                                  <div className="flex flex-col w-[120px] truncate p-[2px] ">
                                    <span className="text-[#2676c2] font-[500] text-[16px] text-ellipsis overflow-hidden whitespace-nowrap  ">
                                      {details?.trainerDetails?.trainerName}
                                    </span>
                                    <span className="text-[#6A6A6A] text-[14px] text-ellipsis overflow-hidden whitespace-nowrap">
                                      {details.trainerDetails?.trainerDesignation}
                                    </span>
                                    <span className="flex gap-1 p-[2px]">
                                      {
                                        details?.trainerDetails?.trainerSkills?.slice(0, 5)?.map(({ name, image }) => {
                                          return <span className="" >
                                            {
                                              image ? <img className="w-[19px] h-[19px]  " src={image} />
                                                :
                                                <span className="w-[19px] h-[19px] rounded-[50%] bg-[#f4f6f7]">
                                                  {name?.[0]}
                                                </span>
                                            }
                                          </span>
                                        })
                                      }
                                    </span>
                                  </div>

                                </div>
                                <div className="flex flex-col">
                                  <span className="font-[500]">
                                    Total Participants
                                  </span>
                                  <span className="text-[#2676c2] text-[24px]">
                                    {trainingPostDetails?.participantCount}
                                  </span>
                                </div>
                                <div className="flex gap-7">
                                  <div className="flex flex-col">
                                    <span className="font-[500]">
                                      Mode
                                    </span>
                                    <span className="text-[#535353] text-[14px]">
                                      {trainingPostDetails?.modeOfTraining}
                                    </span>
                                  </div>
                                  {
                                    trainingPostDetails.modeOfTraining === 'Offline' ?
                                      <div className={`flex flex-col`}>
                                        <span className="font-[500]">
                                          Location
                                        </span>
                                        <span className="text-[#535353] text-[14px]">
                                          {trainingPostDetails?.location}
                                        </span>
                                      </div>
                                      :
                                      null
                                  }
                                </div>
                              </div>

                            </div>
                            <div className="w-[65%] h-full ">
                              <span className="text-[16px] font-[500] text-left">
                                Your FeedBack
                              </span>
                              <div
                                className="w-[98%] h-[90%] border rounded-md bg-[#2676C233] flex flex-col justify-center items-center "
                              >
                                <div
                                  onClick={() => { selectedTraininghandler(_id, details?.trainerDetails?.trainerId) }}
                                  className="w-[95%] h-[90%] bg-white p-[10px] flex flex-col justify-center items-center cursor-pointer"
                                >
                                  <p className="text-center text-[#535353] text-[14px]">
                                    {feedBack?.feedBack || ""}
                                  </p>
                                  <div>

                                  </div>
                                  <Stack spacing={1}>
                                    <Rating
                                      name="half-rating-read"
                                      max={5}
                                      icon={<StarIcon sx={{ color: "DFDFDF", fontSize: 45 }} />}
                                      emptyIcon={<StarBorderIcon sx={{ fontSize: 45, color: "DFDFDF" }} />}
                                      precision={0.5}
                                      value={feedBack?.rating?.$numberDecimal || 0}
                                      readOnly
                                    />
                                  </Stack>
                                </div>
                                {
                                  isAcceptPopupVisible && feedBack === undefined || "" ? (
                                    <div className="fixed top-0 left-0 w-full h-full bg-[#0a0a0a33] z-[9998]">
                                      <div className=" fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white w-[680px] h-[550px] shadow rounded-[20px] z-[9999]  ">
                                        <div className='bg-[#2676c2] w-full h-[40%] rounded-tl-[18px] rounded-tr-[18px] flex justify-evenly items-center ' >
                                          <div className='Rating-Popup-Posted-By'>
                                            <div style={{ marginLeft: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                              {
                                                details?.trainerDetails?.trainerProfileImg ?
                                                  <img src={details?.trainerDetails?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                                  :
                                                  <div className=" flex justify-center items-center bg-slate-400">
                                                    <span className=" capitalize text-3xl">
                                                      {details?.trainerDetails?.trainerName?.[0]}
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
                                              <h1>TrainingName</h1>
                                              <h2 className="">{trainingPostDetails?.trainingName}</h2>

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
