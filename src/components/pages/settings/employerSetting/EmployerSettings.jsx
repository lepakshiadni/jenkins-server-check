import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';

function EmployerSetting() {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveSection = () => {
        switch (location.pathname) {
            case '/employerDashboard/settingsaccount-preference':
                return 'Account Preference';
            case '/employerDashboard/settings/login-security':
                return 'Login Security';
            case '/employerDashboard/settings/visibility':
                return 'Visibility';
            case '/employerDashboard/settings/notification':
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
            <div className="Employer-settings-section flex gap-2 p-3 w-full">
                <div className="Employer-settings-leftBar w-[30%] h-[288px] border-[0.5px] border-[#eeeeee]">
                    <div className="settings w-full">
                        <ul>
                            <li
                                onClick={() => navigate('/employerDashboard/settings/account-preference')}
                                className={`list-none cursor-pointer h-[70px] w-full border-b-[0px] flex items-center justify-start duration-300 ease-out transition-all ${activeSection === 'Account Preference' ? 'bg-[#2676c21a] text-[#2676c2] border-l-[8px] border-[#2676c2] border-b-none hover:bg-[#2676c21a]' : 'text-[#535353] hover:bg-[#eeeeee]'}`}
                            >
                                <span className="ml-7 text-[18px]">Account Preference</span>
                            </li>
                            <hr className='border-[0.5px] border-[#eeeeee]' />

                            <li
                                onClick={() => navigate('/employerDashboard/settings/login-security')}
                                className={`list-none cursor-pointer h-[70px] w-full border-b-[0px] flex items-center justify-start duration-300 ease-out transition-all ${activeSection === 'Login Security' ? 'bg-[#2676c21a] text-[#2676c2] border-l-[8px] border-[#2676c2] border-b-none hover:bg-[#2676c21a]' : 'text-[#535353] hover:bg-[#eeeeee]'}`}
                            >
                                <span className="ml-7 text-[18px]">Login and Security</span>
                            </li>
                            <hr className='border-[0.5px] border-[#eeeeee]' />

                            <li
                                onClick={() => navigate('/employerDashboard/settings/visibility')}
                                className={`list-none cursor-pointer h-[70px] w-full border-b-[0px] flex items-center justify-start duration-300 ease-out transition-all ${activeSection === 'Visibility' ? 'bg-[#2676c21a] text-[#2676c2] border-l-[8px] border-[#2676c2] border-b-none hover:bg-[#2676c21a]' : 'text-[#535353] hover:bg-[#eeeeee]'}`}
                            >
                                <span className="ml-7 text-[18px]">Visibility</span>
                            </li>
                            <hr className='border-[0.5px] border-[#eeeeee]' />

                            <li
                                onClick={() => navigate('/employerDashboard/settings/notification')}
                                className={`list-none cursor-pointer h-[70px] w-full border-b-[0px] flex items-center justify-start duration-300 ease-out transition-all ${activeSection === 'Notification' ? 'bg-[#2676c21a] text-[#2676c2] border-l-[8px] border-[#2676c2] border-b-none hover:bg-[#2676c21a]' : 'text-[#535353] hover:bg-[#eeeeee]'}`}
                            >
                                <span className="ml-7 text-[18px]">Notification</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Employer-setting-right w-[70%]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default EmployerSetting;