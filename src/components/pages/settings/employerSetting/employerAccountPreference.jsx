import React, { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function EmployerAccountPreferance() {

    const navigate = useNavigate()

    const [activeSubSection, setActiveSubSection] = useState(null);
    const [selectLanguage, setSelectLanguage] = useState('English');
    const [showProfile, setShowProfile] = useState('Public')
    const [showMobNum, setShowMobNum] = useState('Public')

    const renderSubSection = () => {
        switch (activeSubSection) {
            case 'Language':
                return (
                    <div className="languageSet-sub p-3">
                        <button onClick={() => setActiveSubSection(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
                        <div className="mt-5">
                            <p>Select the language you used on SISSOO.</p>
                            <select className='border-2 border-[#eeeeee] p-1 w-[200px] mt-3' name="" id="language" value={selectLanguage} onChange={(e) => { setSelectLanguage(e.target.value) }} >
                                <option value="English">English</option>
                                <option value="Kannada">Kannada</option>
                                <option value="Telugu">Telugu</option>
                                <option value="Tamil">Tamil</option>

                            </select>
                        </div>

                    </div>
                );
            case 'Show Profile':
                return (
                    <div className="showProfile-sub p-3">
                        <button onClick={() => setActiveSubSection(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
                        <div className="mt-5">
                            <p>Show your profile</p>
                            <div className="flex flex-col items-start gap-5 mt-2">
                                <div className="flex mt-2 items-center gap-2">
                                    <input className='h-4 w-4' onChange={(e) => { setShowProfile(e.target.value) }} value={'Private'} checked={showProfile === 'Private'} id='noOne' type="radio" />
                                    <label htmlFor='noOne'>No one</label>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <input className='h-4 w-4' value={'Friends'} onChange={(e) => { setShowProfile(e.target.value) }} checked={showProfile === 'Friends'} id='friends' type="radio" />
                                    <label htmlFor='friends'>Friends</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input className='h-4 w-4' value={'Public'} onChange={(e) => { setShowProfile(e.target.value) }} checked={showProfile === 'Public'} id='all' type="radio" />
                                    <label htmlFor='all'>All SISSOO members</label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Contact Information':
                return (
                    <div className="contact-sub p-3">
                        <button onClick={() => setActiveSubSection(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
                        <div className="mt-5">
                            <p>Show your contact information</p>
                            <div className="flex flex-col items-start gap-5 mt-2">
                                <div className="flex mt-2  items-center gap-2">
                                    <input className='h-4 w-4' onChange={(e) => { setShowMobNum(e.target.value) }} value={'Private'} checked={showMobNum === 'Private'} id='noOne' type="radio" />
                                    <label htmlFor='noOne'>No one</label>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <input className='h-4 w-4' value={'Friends'} onChange={(e) => { setShowMobNum(e.target.value) }} checked={showMobNum === 'Friends'} id='friends' type="radio" />
                                    <label htmlFor='friends'>Friends</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input className='h-4 w-4' value={'Public'} onChange={(e) => { setShowMobNum(e.target.value) }} checked={showMobNum === 'Public'} id='all' type="radio" />
                                    <label htmlFor='all'>All SISSOO members</label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
                        <div className="profile-info w-full border-[0.5px] border-[#eeeeee] h-[111px]">
                            <div className="profile-info-head p-3 h-[50%] flex items-center">
                                <h3 className='text-[18px] text-[#535353]'>Profile Information</h3>
                            </div>
                            <hr className='border-[0.5px] border-[#eeeeee]' />

                            <div className="profile-info-setting p-3 h-[50%] hover:bg-[#f6f6f6] flex items-center justify-between cursor-pointer" onClick={() =>navigate('/employerprofile/profileupdate/basic-information')}>
                                <p className='text-[14px] text-[#535353]'>Name, Occupation, Company, Skills, Certification, & Contact Information</p>
                                <div>
                                    <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="general-info mt-5 border-[0.5px] border-[#eeeeee]">
                            <div className="general-info-head p-3">
                                <h3 className='text-[18px] text-[#535353]'>General Preference</h3>
                            </div>
                            <div className="general-settings">
                                <div onClick={() => setActiveSubSection('Language')} className="language-setting p-3 h-[55px] cursor-pointer hover:bg-[#f6f6f6] flex items-center justify-between">

                                    <p className='text-[14px] text-[#535353] w-[70%]'>Language</p>
                                    <span className='text-[16px] text-[#a2a2a2] ml-[25rem] w-[20%] text-end'>{selectLanguage}</span>


                                    <div className='w-[10%]'>
                                        <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                                    </div>
                                </div>
                                <hr className='border-[0.5px] border-[#eeeeee]' />

                                <div onClick={() => setActiveSubSection('Show Profile')} className="show-profile-setting p-3 h-[55px] cursor-pointer hover:bg-[#f6f6f6] flex items-center justify-between">
                                    <p className='text-[14px] text-[#535353] w-[70%]'>Show Profile</p>
                                    <span className='text-[16px] ml-96 text-[#a2a2a2] text-end w-[20%]'>{showProfile}</span>

                                    <div className='w-[10%]'>
                                        <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                                    </div>
                                </div>
                                <hr className='border-[0.5px] border-[#eeeeee]' />

                                <div onClick={() => setActiveSubSection('Contact Information')} className="contact-setting p-3 h-[55px] cursor-pointer hover:bg-[#f6f6f6] flex items-center justify-between">
                                    <p className='text-[14px] text-[#535353] w-[70%]'>Contact Information</p>
                                    <span className='text-[16px] ml-[25rem] text-[#a2a2a2] w-[20%] text-end'>{showMobNum}</span>

                                    <div className='w-[10%]'>
                                        <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="account-preference-section w-full">
            {renderSubSection()}
        </div>
    );
}

export default EmployerAccountPreferance;

