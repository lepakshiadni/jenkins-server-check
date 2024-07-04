import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./RouteCompo.css";
import PrivateRoute from '../Routes/PrivateRoute.jsx'
import EmployerRoute from '../Routes/EmployerRoute.jsx'
import TrainerRoute from '../Routes/TrainerRoute.jsx'
import Bird from "../components/assets/bird.png";
import EmployerProfile from "../components/pages/employerprofile/EmployerProfile.jsx";
import EmployerProfileEdit from "../components/pages/employerprofile/EmployerProfileEdit.jsx";
import UnAuthorizedError from '../components/utils/UnAuthorizedError.jsx'

import StrictRoute from "./strictRoute.jsx";
import EmployerBasicInfo from "../components/pages/employerprofile/employerBasicInfo.jsx";
import EmployerSkillsInfo from "../components/pages/employerprofile/employerSkillsInfo.jsx";
import EmployerExperience from "../components/pages/employerprofile/employerExperienceInfo.jsx";
import EmployerContactInfo from "../components/pages/employerprofile/employerContactInfo.jsx";
import TrainerBasicInfo from "../components/pages/trainerprofile/trainerBasicInfo.jsx";
import TrainerSkillsInfo from "../components/pages/trainerprofile/trainerSkillsInfo.jsx";
import TrainerExperienceInfo from "../components/pages/trainerprofile/trainerExperienceInfo.jsx";
import TrainerConatctInfo from "../components/pages/trainerprofile/trainerContactInfo.jsx";
import TrainerCertificateInfo from "../components/pages/trainerprofile/trainerCerificateInfo.jsx";

import CreatedSuccessFull from '../components/login/Successpage.jsx'

const Signup = lazy(() => import("./../components/login/Signup"));
const TrainerSiginUp = lazy(() => import("../components/login/TrainerSiginUp"));
const EmployerSignup = lazy(() => import("../components/login/EmployerSiginUp.jsx"));
const RoleSelection = lazy(() => import("../components/login/RoleSelection"));
const Login = lazy(() => import("../components/login/Login"));
const SettingLogin = lazy(() => import("../components/login/SettingLogin.jsx"));
const Dashboard = lazy(() =>
  import("../components/pages/dashboard/employerDashboard/EmployerDashboard.jsx")
);
// const PrivateRoute = lazy(() => import("./PrivateRoute"));
const TrainerDashboard = lazy(() =>
  import("../components/pages/dashboard/trainerDashboard/TrainerDashboard.jsx")
);
const TrainerProfile = lazy(() =>
  import("./../components/pages/trainerprofile/TrainerProfile")
);
const TrainerProfileEdit = lazy(() =>
  import('../components/pages/trainerprofile/TrainerProfileEdit.jsx')
);

function RouteCompo() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="route-lazy-parent">
            <img src={Bird} alt="imglazy" className="lazy-img" />
          </div>
        }
      >
        <Routes>
          {/* <Route element={<StrictRoute />} > */}

          <Route element={<PrivateRoute />}>
            <Route element={<EmployerRoute />}>
              <Route path="/employerDashboard/*" element={<Dashboard />} />
              <Route path="/employerprofile" element={<EmployerProfile />} />
              <Route path="/employerprofile/profileupdate" element={<EmployerProfileEdit />} >
                <Route path="basic-information" element={<EmployerBasicInfo />} />
                <Route path="skills" element={<EmployerSkillsInfo />} />
                <Route path="experience" element={<EmployerExperience />} />
                <Route path="contact-information" element={<EmployerContactInfo />} />
              </Route >
            </Route>
            <Route element={<TrainerRoute />}>
              <Route path="/trainerDashboard/*" element={<TrainerDashboard />} />
              <Route path="/trainerprofile" element={<TrainerProfile />} />
              <Route path="/trainerprofile/profileupdate" element={<TrainerProfileEdit />} >
                <Route path="basic-information" element={<TrainerBasicInfo />} />
                <Route path="skills" element={<TrainerSkillsInfo />} />
                <Route path="certificate-information" element={<TrainerCertificateInfo />} />
                <Route path="experience" element={<TrainerExperienceInfo />} />
                <Route path="contact-information" element={<TrainerConatctInfo />} />
              </Route >
            </Route>
            <Route path="/settingOtpVerify" element={<SettingLogin />} />

          </Route>

          <Route path="/trainersignup" element={<TrainerSiginUp />} />
          <Route path="/selectrole" element={<RoleSelection />} />
          <Route path="/employersignup" element={<EmployerSignup />} />
          <Route path="/otpverify" element={<Login />} />


          {/* </Route> */}

          <Route path="/" element={<Signup />} />
          <Route path='/unautherror' element={<UnAuthorizedError />} />

          <Route path='/createsucess' element={<CreatedSuccessFull/>}/>
          <Route path='/unautherror' element={<UnAuthorizedError/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter >
  );
}
export default RouteCompo;
