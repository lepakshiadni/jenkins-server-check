import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

function TrainerSetting() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveSection = () => {
    switch (location.pathname) {
      case '/trainerDashboard/settings/account-preference':
        return 'Account Preference';
      case '/trainerDashboard/settings/login-security':
        return 'Login Security';
      case '/trainerDashboard/settings/visibility':
        return 'Visibility';
      case '/trainerDashboard/settings/notification':
        return 'Notification';
      default:
        return 'Account Preference';
    }
  };

  const [activeSection, setActiveSection] = useState(getActiveSection());

  useEffect(() => {
    setActiveSection(getActiveSection());
  }, [location]);

  return (
    <div className="flex">
      <div className="trainer-settings-section flex gap-2 p-3 w-full">
        <div className="trainer-settings-leftBar w-[30%] h-[288px] border-[0.5px] border-[#eeeeee]">
          <div className="settings w-full">
            <ul >
              <li
                onClick={() => navigate('/trainerDashboard/settings/account-preference')}
                className={`list-none cursor-pointer h-[70px] w-full border-b-[0px] flex items-center justify-start duration-300 ease-out transition-all ${activeSection === 'Account Preference' ? 'bg-[#2676c21a] text-[#2676c2] border-l-[8px] border-[#2676c2] border-b-none hover:bg-[#2676c21a]' : 'text-[#535353] hover:bg-[#eeeeee]'}`}
              >
                <span className="ml-7 text-[18px]">Account Preference</span>
              </li>
              <hr className='border-[0.5px] border-[#eeeeee]' />
              <li
                onClick={() => navigate('/trainerDashboard/settings/login-security')}
                className={`list-none cursor-pointer h-[70px] w-full border-b-[0px] flex items-center justify-start duration-300 ease-out transition-all ${activeSection === 'Login Security' ? 'bg-[#2676c21a] text-[#2676c2] border-l-[8px] border-[#2676c2] border-b-none hover:bg-[#2676c21a]' : 'text-[#535353] hover:bg-[#eeeeee]'}`}
              >
                <span className="ml-7 text-[18px]">Login and Security</span>
              </li>
              <hr className='border-[0.5px] border-[#eeeeee]'/>
              <li
                onClick={() => navigate('/trainerDashboard/settings/visibility')}
                className={`list-none cursor-pointer h-[70px] w-full border-b-[0px] flex items-center justify-start duration-300 ease-out transition-all ${activeSection === 'Visibility' ? 'bg-[#2676c21a] text-[#2676c2] border-l-[8px] border-[#2676c2] border-b-none hover:bg-[#2676c21a]' : 'text-[#535353] hover:bg-[#eeeeee]'}`}
              >
                <span className="ml-7 text-[18px]">Visibility</span>
              </li>
              <hr className='border-[0.5px] border-[#eeeeee]' />
              <li
                onClick={() => navigate('/trainerDashboard/settings/notification')}
                className={`list-none cursor-pointer h-[70px] w-full border-b-[0px] flex items-center justify-start duration-300 ease-out transition-all ${activeSection === 'Notification' ? 'bg-[#2676c21a] text-[#2676c2] border-l-[8px] border-[#2676c2] border-b-none hover:bg-[#2676c21a]' : 'text-[#535353] hover:bg-[#eeeeee]'}`}
              >
                <span className="ml-7 text-[18px]">Notification</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="trainer-setting-right w-[70%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TrainerSetting;
