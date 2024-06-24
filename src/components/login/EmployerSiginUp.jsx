import React, { useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import "../styles/Employee.css";
import LOGO from "../assets/Header_Logo_RS.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import Cookies from "js-cookie";
import { employerSignUpAction } from '../../redux/action/employers.action'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


const Employee = () => {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const countries = ["French", "Spanish", "German", "Italian", "Chinese"];
  const phoneNumber = Cookies.get("phoneNumber")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const roleSelection = useSelector(({ roleSelection }) => {
    return roleSelection
  })
  const employerSignUp = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails
  })

  const contactDetails = Cookies.get("contactDetails")

  // Function to check if the string is an email
  const isEmail = (value) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(value);
  };
  console.log("employerSignUp", employerSignUp)
  console.log("role", roleSelection)

  const employerDetails = {
    fullName: '',
    companyName: '',
    designation: '',
    primaryNumber: '',
    email: '',
    role: localStorage.getItem('role'),
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the Enter key
      const form = e.target.form;
      const index = Array.from(form.elements).indexOf(e.target);
      // Focus on the next input field
      const nextElement = form.elements[index + 1];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  // Assign contact info to the appropriate field
  if (isEmail(contactDetails)) {
    employerDetails.email = contactDetails;
  } else {
    employerDetails.primaryNumber = contactDetails;
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    employerDetails.fullName = fullName;
    employerDetails.companyName = companyName;
    employerDetails.designation = designation;

    if (employerDetails?.fullName.length > 1 && employerDetails?.companyName.length > 1) {
      dispatch(employerSignUpAction(employerDetails))
    }
    else {
      toast.info('please fill the details')
    }
    setFullName("");
    setCompanyName("");
    setDesignation("");
  };
  useEffect(() => {
    if (employerSignUp?.success) {
      Cookies.set('token', employerSignUp?.token)
      localStorage.setItem('newUser', true)
      toast.success(employerSignUp?.message)
      navigate('/employerDashboard/feed')
    }

    else {
      toast.error(employerSignUp?.message)
    }
  }, [navigate, employerSignUp])


  return (
    <div className="Employee">
      <div className="Emp_Head">
        <img src={LOGO} alt="Header_Logo" />
        <div className="flex gap-10 mr-[15px]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-2"
          >
            <path
              id="Vector"
              d="M11.2441 11.1227C11.5288 10.2455 12.0503 9.46494 12.7513 8.86581C13.4524 8.26668 14.3063 7.87297 15.2171 7.72846C16.1279 7.58396 17.0604 7.694 17.9124 8.04671C18.7645 8.39943 19.5024 8.98124 20.0446 9.72721C20.5868 10.4732 20.9115 11.3543 20.9839 12.2736C21.0564 13.1929 20.8731 14.1146 20.4545 14.9364C20.0359 15.7581 19.399 16.4475 18.6127 16.9294C17.8264 17.4112 16.9222 17.6663 16 17.6663V19.3337M16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16C31 24.2843 24.2843 31 16 31ZM16.083 24.3333V24.5L15.917 24.5003V24.3333H16.083Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className=" inline-block z-10">
            <div
              onClick={() => setOpen(!open)}
              className={`
                w-[189px] h-[49px]
                ring ring-offset-[-2px]
                font-normal text-base ring-[#ffff] 
                leading-6
                flex items-center justify-around
               hover:bg-[#2676c2] hover:text-[#ffff] hover:cursor-pointer hover:ring-[#2676c2] 
                ${open
                  ? "bg-[#2676c2] text-[#ffff]"
                  : "bg-currentcolor text-[#ffff]"
                }`}
            >
              {open ? (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M1 13H7.66667M1 13C1 19.6274 6.37258 25 13 25M1 13C1 6.37258 6.37258 1 13 1M7.66667 13H18.3333M7.66667 13C7.66667 19.6274 10.0545 25 13 25M7.66667 13C7.66667 6.37258 10.0545 1 13 1M18.3333 13H25M18.3333 13C18.3333 6.37258 15.9455 1 13 1M18.3333 13C18.3333 19.6274 15.9455 25 13 25M25 13C25 6.37258 19.6274 1 13 1M25 13C25 19.6274 19.6274 25 13 25"
                    stroke="#ffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hover:stroke-[#2676C2]"
                >
                  <path
                    id="Vector"
                    opacity="0.8"
                    d="M1 13H7.66667M1 13C1 19.6274 6.37258 25 13 25M1 13C1 6.37258 6.37258 1 13 1M7.66667 13H18.3333M7.66667 13C7.66667 19.6274 10.0545 25 13 25M7.66667 13C7.66667 6.37258 10.0545 1 13 1M18.3333 13H25M18.3333 13C18.3333 6.37258 15.9455 1 13 1M18.3333 13C18.3333 19.6274 15.9455 25 13 25M25 13C25 6.37258 19.6274 1 13 1M25 13C25 19.6274 19.6274 25 13 25"
                    stroke="currentcolor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}

              {selected
                ? selected?.length > 25
                  ? selected?.substring(0, 25) + "..."
                  : selected
                : "English"}
              <BiChevronDown size={30} className={`${open && "rotate-180"}`} />
            </div>
            {open && (
              <ul className=" absolute bg-[#2676c2] text-[#ffff] w-[190px] ">
                {countries?.map((country) => (
                  <li
                    key={country}
                    className={`p-2 text-sm ${country?.toLowerCase() === selected?.toLowerCase()
                      ? "text-[16px] "
                      : "hover:cursor-pointer hover:bg-opacity-20 hover:bg-white"
                      }`}
                    onClick={() => {
                      setSelected(country);
                      setOpen(false);
                    }}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className='Emp_Details'>
        <div className='Details' >
          {/* <ArrowBackRoundedIcon sx={{ color: ' #2676C2;', fontSize: '2.3rem', paddingRight: '36rem' }}  onClick={()=>{ ('/selectrole')}}  /> */}
          <div onClick={() => { navigate('/selectrole') }} style={{ display: "flex", justifyContent: "flex-start", width: '82%', margin: 'auto', marginTop: '2.3rem', cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none">
              <path d="M25 10.8004L1 10.8004M1 10.8004L10.6 20.4004M1 10.8004L10.6 1.20039" stroke="#2676C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h1 style={{ margin: 'auto', marginTop: '1.3rem' }}>
            Welcome Employers ! <br />
            Elevate Team Excellence <br />
            With <span style={{ background: '#2676C2', color: '#FFF' }}>Sissoo Training</span>
          </h1>
        </div>
        <div className='Fill_Details'>
          <form onSubmit={handleSignIn}>
            <label>
              Full Name <span className="text-red-700">*</span>
              <input type='text' required value={fullName} onChange={(e) => (setFullName(e.target.value))} placeholder='Enter Full name' onKeyDown={(e) => handleEnter(e)} />
            </label>

            <label>
              Company Name <span>*</span>
              <input type='text' required value={companyName} onChange={(e) => (setCompanyName(e.target.value))} placeholder='Enter Your Company Name' onKeyDown={(e) => handleEnter(e)} />
            </label>

            <label>
              Designation 

              <input type='text' required value={designation} onChange={(e) => (setDesignation(e.target.value))} placeholder='Enter Your Role' onKeyDown={(e) => handleEnter(e)} />
            </label>

            <button className="outline-none" type='submit' >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Employee;




