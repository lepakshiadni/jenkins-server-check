import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Requirements.css";
import PostTrainingsection from './PostRequirements/PostTraining'
import PostJobSection from './PostRequirements/PostJob'
import { useDispatch } from "react-redux";
import { getPostTrainingRequirementAction } from "../../../redux/action/postRequirement.action";

const Requirements = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPostTrainingRequirementAction());
  // }, [dispatch]);
  const getActiveOption = (pathname) => {
    if (
      pathname.startsWith("/employerDashboard/postarequirements/post-training")
    )
      return "postTraining";
    if (pathname.startsWith("/employerDashboard/postarequirements/post-job"))
      return "postJob";
    return "postTraining"; // Default if none matches
  };
  useEffect(() => {
    setActiveOption(getActiveOption(location.pathname));
  }, [location.pathname]);
  const [activeOption, setActiveOption] = useState(
    getActiveOption(location.pathname)
  );

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  const renderComponent = () => {
    switch (activeOption) {
      case "postTraining":
        return <PostTrainingsection />;
      case "postJob":
        return <PostJobSection />;
      default:
        return null;
    }
  };
  return (
    <div className="Requirements">
      <div className="Post_Buttons pt-[14px] pb-[15px]">
        <Link
          to="/employerDashboard/postarequirements/post-training"
        >
         <button className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${
            activeOption === "postTraining" ? "active" : ""
          }`}>Post Training</button> 
        </Link>
        <Link
          to="/employerDashboard/postarequirements/post-job"
          
        >
            <button className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${
            activeOption === "postJob" ? "active" : ""
          }`}>Post Job</button>
        </Link>
      </div>
      <div className="Content_Wrapper">
        <div className="Buttons_Content">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Requirements;