import { useNavigate, Outlet, useLocation } from "react-router-dom";
import '../../styles/EmployerProfileEdit.css';
import EmployerHeader from '../../header&footer/EmployerHeader';
import { useEffect } from "react";

const EmployerProfileEdit = () => {
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
      <EmployerHeader />
      <div className="updatepage">
        <div className="updateContainer">
          <div
            onClick={() => {
              navigate("/employerprofile");
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
            onClick={() => handleOptionClick("/employerprofile/profileupdate/basic-information")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Basic Information</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${window.location.pathname.endsWith("skills") ? "selected" : ""}`}
            onClick={() => handleOptionClick("/employerprofile/profileupdate/skills")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Skills</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${window.location.pathname.endsWith("experience") ? "selected" : ""}`}
            onClick={() => handleOptionClick("/employerprofile/profileupdate/experience")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Experience</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${window.location.pathname.endsWith("contact-information") ? "selected" : ""}`}
            onClick={() => handleOptionClick("/employerprofile/profileupdate/contact-information")}
          >
            <div className="updateDiv" style={{ height: "67px", width: "7px" }}></div>
            <h3 className="textHelp">Contact Information</h3>
          </div>
        </div>
        <div className="updateContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileEdit;
