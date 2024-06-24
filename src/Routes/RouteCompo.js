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
import CreatedSuccessFull from '../components/login/Successpage.jsx'
const Signup = lazy(() => import("./../components/login/Signup"));
const TrainerSiginUp = lazy(() => import("../components/login/TrainerSiginUp"));
const Employee = lazy(() => import("../components/login/EmployerSiginUp.jsx"));
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
const UpdateProfile = lazy(() =>
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
          <Route element={<PrivateRoute />}>
            <Route element={<EmployerRoute/>}>
              <Route path="/employerDashboard/*" element={<Dashboard />} />
              <Route path="/employerprofile" element={<EmployerProfile />} />
              <Route path="/employerprofile/profileupdate" element={<EmployerProfileEdit />} />
            </Route>
            <Route element={<TrainerRoute/>}>
              <Route path="/trainerDashboard/*" element={<TrainerDashboard />} />
              <Route path="/trainerprofile" element={<TrainerProfile />} />
              <Route path="/trainerprofile/profileupdate" element={<UpdateProfile />} />
            </Route>
            <Route path="/settingOtpVerify" element={<SettingLogin />} />
          </Route>

          <Route path="/trainersignup" element={<TrainerSiginUp />} />
          <Route path="/selectrole" element={<RoleSelection />} />
          <Route path="/employersignup" element={<Employee />} />
          <Route path="/" element={<Signup />} />

          <Route path="/otpverify" element={<Login />} />
          <Route path='/createsucess' element={<CreatedSuccessFull/>}/>
          <Route path='/unautherror' element={<UnAuthorizedError/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default RouteCompo;
