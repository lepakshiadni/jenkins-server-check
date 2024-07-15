import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../../styles/TrainerSettings.css'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import { generateOtp } from '../../../../redux/action/siginup.action';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';

function TrainerLoginSecurity() {
  const [loginActive, setLoginActive] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails?.trainerDetails;
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("")

  const validatePhoneNumber = (input) => {
    const numericValue = input.replace(/\D/g, '');
    console.log(numericValue);
    // Update the state
    setPhoneNumber(numericValue);
  }

  const handleSignOut = () => {

    Cookies.remove('token')
    window.location.reload()
  }

  const handleEmailOtpSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (email.trim() === '') {
      alert('Please enter an email address');
      return;
    }

    dispatch(generateOtp(email));
    Cookies.set('contactDetails', email);
    navigate('/settingOtpVerify');
  };

  const handlePhoneOtpSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (email.trim() === '') {
      alert('Please enter Phone Number');
      return;
    }

    dispatch(generateOtp(phoneNumber));
    Cookies.set('contactDetails', phoneNumber);
    navigate('/settingOtpVerify');
  };

  const renderLoginActive = () => {
    switch (loginActive) {
      case 'mobile Email': return (
        <>
          <div className="border-[0.5px] border-[#eeeeee]  w-full p-5">
            <button onClick={() => setLoginActive(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
            <div className="mt-5">
              <div className="flex gap-5">
                <p>{user?.contactInfo?.primaryNumber}</p><span className='text-[#2676C2]'>Verified</span>
              </div>
              <div className="mt-2">
                <p>If you want to change your registered Number</p>
                <div className="mt-3">
                  <label>New Mobile Number</label>
                  <div className="w-96 border-[0.5px] border-gray-300 flex  p-2">
                    <form action="" onSubmit={handlePhoneOtpSubmit}>
                      <input className='new-num border-none focus:outline-none w-[80%]'
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => validatePhoneNumber(e.target.value)}
                        placeholder='Enter new mobile number'
                        maxLength={10}
                        minLength={10}
                      />
                      <button className='text-[#2676c2]'
                        type="submit"
                      >Get OTP</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex gap-5">
                <p>{user?.contactInfo?.email}</p><span className='text-[#2676C2]'>Verified</span>
              </div>
              <div className="mt-2">
                <p>If you want to change your registered Email </p>
                <div className="mt-3">
                  <label>New Email Number</label>
                  <div className="w-96 border-[0.5px] border-gray-300 flex justify-between p-2">
                    <form action="" onSubmit={handleEmailOtpSubmit}>
                      <input className='new-num border-none focus:outline-none w-[80%]'
                        type="email"
                        placeholder='Enter new Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button className='text-[#2676c2]'
                        type="submit"
                      >Get OTP</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
      case 'Activated Devices': return (
        <>
          <div className="border-[0.5px] border-[#eeeeee]  w-full p-5">
            <button onClick={() => setLoginActive(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
            <div className="mt-5">
              <div className="">
                <p>This profile Activated in 2 days</p>
              </div>
              <div className="mt-2 flex justify-between">
                <span> Desktop windows</span>
                <span className='hover:underline text-[#2676c2] cursor-pointer'> Deactivate</span>
              </div>
            </div>
          </div>
        </>
      )
      case 'close account': return (
        <>

          <div className="border-[0.5px] border-[#eeeeee]  w-full p-5">
            <button onClick={() => setLoginActive(null)} className="text-blue-500 cursor-pointer"><span><ArrowBackIcon /></span> <span>Back</span></button>
            <div className="mt-5">
              <div className="">
                <p>Close Account</p>
              </div>
              <div className="mt-2 ">
                <span>Sure!, do you want to close your SISSOO account</span>
                <div className="mt-5 flex gap-5">
                  <button className='p-[5px] w-40 border-[0.5px] border-[#2676C2] text-[#2676c2] bg' onClick={handleSignOut} >Sign out</button>
                  <button onClick={() => { setLoginActive(null) }} className='p-[5px] w-40 text-white bg-[#2676c2]'>Cancel</button>
                </div>
              </div>
            </div>
          </div>

        </>
      )
      default: return (
        <>
          <div className="login-security border-[0.5px] border-[#eeeeee]">
            <div className="p-3 ">
              <h3 className='text-[18px] font-[400] text-[#535353] '>Account Access</h3>
            </div>

            <div className="login-settings ">
              <div onClick={() => { setLoginActive('mobile Email') }} className="mob-email p-3 h-[55px] cursor-pointer  hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between">
                <p className='text-[14px] font-[400] text-[#535353]'>Mobile and Email</p>
                <div className="">
                  <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                </div>
              </div>
              <div onClick={() => { setLoginActive('Activated Devices') }} className="activated cursor-pointer  p-3 h-[55px] hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between">
                <p className='text-[14px] font-[400] text-[#535353]'>Activated Devices</p>
                <div className="">
                  <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                </div>
              </div>
              <div onClick={() => { setLoginActive('close account') }} className="cursor-pointer p-3 h-[55px] hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between">
                <p className='text-[14px] font-[400] text-[#535353]'>Close Account</p>
                <div className="">
                  <NavigateNextIcon sx={{ color: 'gray', fontSize: '30px' }} />
                </div>
              </div>
            </div>

          </div>
        </>
      )
    }
  }
  return (
    <>

      <div className="w-full">
        {
          renderLoginActive()
        }
      </div>
    </>
  )
}

export default TrainerLoginSecurity;
