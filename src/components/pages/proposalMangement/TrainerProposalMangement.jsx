import React, { useEffect, useState } from "react";
import "../../styles/TrainerProposalManagement.css";
import '../../styles/TrainerMyTrainings.css'
import '../../styles/Requirements.css'
import Image15 from "../../assets/image 15.png";
import TrainerProposalApplied from './TrainerProposalManagement/TrainerProposalApplied';
import TrainerProposalRequest from './TrainerProposalManagement/TrainerProposalRequest'
import TrainerProposalDenied from './TrainerProposalManagement/TrainerProposalDenied'
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { gettrainerAppliedTraining, getAllRequestTrainer } from '../../../redux/action/trainer.action'

const TrainerProposalManagement = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  let trainingRequest = [];
  let denied=[];
  const getActiveOption = (pathname) => {
    if (pathname.startsWith("/trainerDashboard/proposalmanagement/applied")) {

      return "Applied";
    }
    if (
      pathname.startsWith(
        "/trainerDashboard/proposalmanagement/proposalrequest"
      )
    ) {

      return "Proposal";
    }
    if(
      pathname.startsWith(
        "/trainerDashboard/proposalmanagement/denied"
      )
    ){
      return "Denied"
    }
    return "Applied"; // Default if none matches
  };

  const [activeOption, setActiveOption] = useState(
    getActiveOption(location.pathname) || "Applied"
  );

  useEffect(() => {
    setActiveOption(getActiveOption(location.pathname));
  }, [location.pathname]);
  const proposalData = {
    trainingName: "Full Stack Developer",
    topics: "Java, JS, Python, React Native",
    trainingType: "Corporate",
    duration: "10 Days",
    startDate: "01-12-2023",
    endDate: "01-01-2024",
    postedByImage: Image15,
    postedBy: "Eleesa",
    companyPosted: "Zipro",
    budget: "$1000-$2000",
    mode: "Online",
    proposer: "Kowshik",
  };

  useEffect(() => {
    dispatch(gettrainerAppliedTraining())
    dispatch(getAllRequestTrainer())
  }, [dispatch])

  const appliedTraining = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.gettrainerAppliedTraining?.trainingPostData;
  })
  const requestTrainer = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.getAllRequestTraining?.trainingPostData
  })
  // console.log("requestTraineraads", requestTrainer)



  if (requestTrainer) {
    trainingRequest = requestTrainer?.map((training) => {
      return {
        trainerDetails: {
          employerId: training?.employerId || "",
          trainerDesignation: training?.trainerDesignation || "",
          trainerId: training?.trainerId || "",
          trainerName: training?.trainerName || "",
          trainerProfileImg: training?.trainerProfileImg || "",
        },
        trainingDetails: training?.trainingDetails?.filter(({ appliedStatus, applicationstatus }) => {
          if (appliedStatus === false && applicationstatus == 'Requested') {
            return training
          }
        })
      }
    });
    denied = appliedTraining?.filter(({ appliedStatus,applicationstatus }) => appliedStatus === false &&  applicationstatus ==='Denied')

  }

  // console.log('requestTriner', trainingRequest);



  const renderComponent = () => {
    switch (activeOption) {
      case "Applied":
        return <TrainerProposalApplied training={appliedTraining} />;
      case "Proposal":
        return <TrainerProposalRequest training={trainingRequest} />;
      case 'Denied':
      return <TrainerProposalDenied denied={denied} />;
      default:

        return null;
    }
  };

  return (
    <div className="w-[100%] h-auto text-[#333] ">
      <div className="Post_Buttons flex space-x-5 items-center">
        <Link to="/trainerDashboard/proposalmanagement/applied">
          <button  className={`rounded-[2.5rem] border-[1px] border-[#b6adad] mr-[10px] bg-[#dcdcdc1a] text-[#888] text-[1rem] not-italic font-normal leading-normal cursor-pointer w-[8rem] h-[2rem]  ${activeOption === "Applied" ? "text-[#2676c2] bg-[#2676c21a] " : ""}`}>
            Applied
          </button>
        </Link>
        <Link to="/trainerDashboard/proposalmanagement/proposalrequest">
          <button className={`rounded-[2.5rem] border-[1px] border-[#b6adad] mr-[10px] bg-[#dcdcdc1a] text-[#888] text-[1rem] not-italic font-normal leading-normal cursor-pointer w-[8rem] h-[2rem] ${activeOption === "Proposal" ? "text-[#2676c2] bg-[#2676c21a] " : ""}`}>Proposal</button>
        </Link>
        <Link to="/trainerDashboard/proposalmanagement/denied">
          <button className={`rounded-[2.5rem] border-[1px] border-[#b6adad] mr-[10px] bg-[#dcdcdc1a] text-[#888] text-[1rem] not-italic font-normal leading-normal cursor-pointer w-[8rem] h-[2rem] ${activeOption === "Denied" ? "text-[#2676c2] bg-[#2676c21a] " : ""}`}>Denied</button>
        </Link>
      </div>
      <div className="ProposalManagement w-[100%] h-auto text-[#333]">{renderComponent()}</div>
    </div>
  );
};

export default TrainerProposalManagement;


