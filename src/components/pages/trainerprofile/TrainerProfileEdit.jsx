import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "../../styles/TrainerProfileEdit.css";
import TrainerHeader from "../../header&footer/TrainerHeader";
import { useEffect } from "react";

const TrainerProfileEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOptionClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <TrainerHeader />
      <div className="updatepage">
        <div className="updateContainer">
          <div
            onClick={() => {
              window.history.back()
            }}
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#888888",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              margin: "10px 0px ",
              position: "fixed",
              top: "120px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
            >
              <path
                d="M16 7.57143L0.999999 7.57143M0.999999 7.57143L7.42857 14M0.999999 7.57143L7.42857 1.14286"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 style={{ marginLeft: "10px" }}>Back</h3>
          </div>
          <div
            className={`updateOptions ${window.location.pathname.endsWith("basic-information") ? "selected" : ""}`}
            onClick={() => handleOptionClick("/trainerprofile/profileupdate/basic-information")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Basic Information</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${window.location.pathname.endsWith("skills") ? "selected" : ""}`}
            onClick={() => handleOptionClick("/trainerprofile/profileupdate/skills")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Skills</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${window.location.pathname.endsWith("certificate-information") ? "selected" : ""}`}
            onClick={() => handleOptionClick("/trainerprofile/profileupdate/certificate-information")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Certifications</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${window.location.pathname.endsWith("contact-information") ? "selected" : ""}`}
            onClick={() => handleOptionClick("/trainerprofile/profileupdate/contact-information")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Contact Information</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${window.location.pathname.endsWith("experience") ? "selected" : ""}`}
            onClick={() => handleOptionClick("/trainerprofile/profileupdate/experience")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Experience</h3>
          </div>
        </div>
        <div className="updateContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TrainerProfileEdit;;
