import React, { useEffect, useState } from "react";
import "../../styles/TrainerProposalManagement.css";
import EmployerProposalCandidacy from "./Employerproposalmanagement/EmpProposalCandidacy";
import EmployerProposalRequest from "./Employerproposalmanagement/EmpProposalRequest";
import { Link, useLocation } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {getAppliedTrainingEmployer,getAllCandidacy} from '../../../redux/action/employers.action'
const EmployerProposalManagement = () => {
  const location = useLocation();
  const dispatch=useDispatch()
  useEffect(() => {
    setActiveOption(getActiveOption(location.pathname));
  }, [location.pathname]);
  const getActiveOption = (pathname) => {
    if (pathname.startsWith("/employerDashboard/proposalsmanagement/candidacy"))
      return "Candidacy";
    if (pathname.startsWith("/employerDashboard/proposalsmanagement/proposals"))
      return "Proposals";
    return "Candidacy";
  };
  const [activeOption, setActiveOption] = useState(
    getActiveOption(location.pathname)
  );
  useEffect(()=>{
    dispatch(getAppliedTrainingEmployer())
    dispatch(getAllCandidacy())
  },[dispatch])

  const appliedTraining=useSelector(({employerSignUp})=>{
    return employerSignUp?.getAppliedTrainingEmployer?.getAppliedTraining
  })
  const getCandidacy=useSelector(({employerSignUp})=>{
    return employerSignUp?.getAllCandidacy?.trainingPostData

  })
  console.log("appliedTraining",appliedTraining);
  const renderComponent = () => {
    switch (activeOption) {
      case "Candidacy":
        return <EmployerProposalCandidacy candidacy={getCandidacy} />;
      case "Proposals":
        return <EmployerProposalRequest appliedTrainingDetails={appliedTraining}/>;
      default:
        return null;
    }
  };
  return (
    <div className="ProposalManagement">
      <div className="Post_Buttons">
        <Link to="/employerDashboard/proposalsmanagement/candidacy">
          <button
            style={{ marginRight: "10px" }}
            className={`Post_T ${activeOption === "Candidacy" ? "active" : ""}`}
          >
            Candidacy
          </button>
        </Link>
        <Link to="/employerDashboard/proposalsmanagement/proposals">
          <button
            className={`Post_J ${activeOption === "Proposals" ? "active" : ""}`}
          >
            Proposals
          </button>
        </Link>
      </div>
      {renderComponent()}
    </div>
  );
};

export default EmployerProposalManagement;
