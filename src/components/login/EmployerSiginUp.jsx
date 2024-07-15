import { useState, useMemo, useEffect } from 'react';
import '../styles/EmployerSignUp.css'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LOGO from "../assets/Header_Logo_RS.png"; // Make sure to replace this with the actual path to your logo
import { BiChevronDown } from 'react-icons/bi';
import { employerSignUpAction } from '../../redux/action/employers.action'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { setToken } from '../utils/TokenUtils';
import HelpPopUp from "./HelpPopUp";

function EmployerSignup() {

  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const countries = ["French", "Spanish", "German", "English", "Italian", "Chinese"];
  const [values, setValues] = useState({
    fullName: {
      value: "",
      errorMessage: ""
    },
    companyName: {
      value: "",
      errorMessage: ""
    },
    designation: {
      value: "",
      errorMessage: ""
    }
  });
  const employer = useSelector(({ employerSignUp }) => { return employerSignUp?.employerDetails }, shallowEqual)

  console.log('employer', employer)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[a-zA-Z ]*$/;

    let filteredValue = value.replace(/[^a-zA-Z ]/g, ""); // Remove non-alphabetic characters
    let errorMessage = "";

    if (!regex.test(filteredValue)) {
      errorMessage = "Should contain only letters (a-z, A-Z) and spaces";
    } else if (filteredValue.length < 2 || filteredValue.length > 32) {
      errorMessage = "Should be between 2 and 32 characters";
    }

    setValues(prevValues => ({
      ...prevValues,
      [name]: {
        value: filteredValue,
        errorMessage: errorMessage
      }
    }));
  };

  const handleCompanyNameChange = (e) => {
    const { value } = e.target;
    const maxLength = 32; // Define max length if needed
    let errorMessage = "";

    if (value.length < 2 || value.length > maxLength) {
      errorMessage = `Should be between 2 and ${maxLength} characters`;
    }

    setValues(prevValues => ({
      ...prevValues,
      companyName: {
        value: value,
        errorMessage: errorMessage
      }
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newValues = { ...values };
    let hasError = false;

    Object.keys(newValues).forEach(key => {
      if (!newValues[key].value) {
        newValues[key].errorMessage = `${key.replace(/([A-Z])/g, ' $1').trim()} is required`;
        hasError = true;
      }
    });

    setValues(newValues);

    if (!hasError) {
      console.log("Form submitted successfully with values: ", newValues);
      const employerDetails = {
        fullName: newValues.fullName.value,
        companyName: newValues.companyName.value,
        designation: newValues.designation.value,
        role: 'employer',
        contactValue: Cookies.get('contactDetails')
      };
      // Dispatch an action or navigate to another page here
      dispatch(employerSignUpAction(employerDetails));

    }
  }


  useEffect(() => {
    if (employer?.success) {
      toast.success(employer?.message);
      setToken(employer?.token)
      localStorage.setItem('newUser', true)
      console.log('Success:', employer?.message);
      navigate('/employerDashboard/feed')

    } else if (employer?.error) {
      toast.error(employer?.error);
    }
  }, [employer?.success, employer?.error]);


  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.from(form.elements).indexOf(e.target);
      const nextElement = form.elements[index + 1];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };
  const [showHelpPopUp, setShowHelpPopUp] = useState(false);


  return (
    <>
     <HelpPopUp
        trigger={showHelpPopUp}
        setTrigger={setShowHelpPopUp}
      />
    <div className=" w-full min-h-screen employerSignupContent">
      <div className="flex flex-col md:flex-row justify-between items-center  md:p-6 lg:px-12 gap-4 md:gap-6 lg:gap-8">
        <div className="w-[200px] h-[60px]">
          <img src={LOGO} alt="Logo" />
        </div>
        <div className="hidden md:flex gap-10 mr-[15px] cursor-pointer">
          <svg
           onClick={()=>setShowHelpPopUp(true)}
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="relative inline-block z-10">
            <div
              onClick={() => setOpen(!open)}
              className={`
                w-[189px] h-[49px]
                ring ring-offset-[-2px]
                font-normal text-base ring-[#ffff] 
                leading-6
                rounded-sm
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {selected
                ? selected.length > 25
                  ? selected.substring(0, 25) + "..."
                  : selected
                : "English"}
              <BiChevronDown size={30} className={`${open && "rotate-180"}`} />
            </div>
            {/* {open && (
              <ul className="absolute bg-[#2676c2] text-[#ffff] w-[190px]">
                {countries.map((country) => (
                  <li
                    key={country}
                    className={`p-2 text-sm ${country.toLowerCase() === selected.toLowerCase()
                      ? "text-[16px]"
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
            )} */}
          </div>
        </div>
      </div>
      <div className=" 
       flex justify-center mt-[30px] ">
        <div className="w-[90%] md:w-[80%] lg:w-[90%] h-auto md:h-[23rem] flex flex-col md:flex-row  ">
          <div className="w-full md:w-[60%] bg-white rounded-l-[5px] p-4">
            <div className="flex flex-col gap-5 justify-start w-[85%] m-auto mt-[2.3rem]">
              <div className="cursor-pointer" onClick={() => { navigate('/selectrole') }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none">
                  <path d="M25 10.8004L1 10.8004M1 10.8004L10.6 20.4004M1 10.8004L10.6 1.20039" stroke="#2676C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-[#2676c2] font-[600] text-[24px] md:text-[30px] md:text-wrap lg:text-[45px]">
                  Welcome, Employers!<br />
                  Elevate Team Excellence <br />
                  with Sisso Training
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#2676c2] rounded-r-[5px] w-full md:w-[40%] p-4">
            <div className="flex justify-center items-center w-full h-full">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full md:w-[80%]"
              >
                <div>
                  <label className="text-white font-[300] text-[16px]">
                    Full Name*
                  </label>
                  <input
                    onChange={handleOnChange}
                    onKeyDown={handleEnter}
                    className="w-full h-[46px] bg-[#ffffff30] rounded-sm text-white placeholder: pl-[10px] placeholder:text-[#CECECE] placeholder:text-sm outline-none"
                    type="text"
                    minLength={2}
                    maxLength={32}
                    required
                    value={values.fullName.value}
                    name="fullName"
                    placeholder="Enter Full Name"
                    autoComplete='off'
                  />
                  {/* {values.fullName.errorMessage && (
                    <span className="text-red-700 text-sm">
                      {values.fullName.errorMessage}
                    </span>
                  )} */}
                </div>
                <div className="space-y-3">
                  <label className="text-white font-[300] text-[16px]">
                    Company Name*
                  </label>
                  <input
                    onChange={handleCompanyNameChange}
                    onKeyDown={handleEnter}
                    className="w-full  h-[46px] bg-[#ffffff30] rounded-sm text-white placeholder: pl-[10px] placeholder:text-[#CECECE] placeholder:text-sm outline-none"
                    type="text"
                    minLength={2}
                    maxLength={32}
                    required
                    value={values.companyName.value}
                    name="companyName"
                    placeholder="Enter Company Name"
                    autoComplete='off'
                  />
                  {/* {values.companyName.errorMessage && (
                    <span className="text-red-700 text-sm">
                      {values.companyName.errorMessage}
                    </span>
                  )} */}
                </div>
                <div className="space-y-3">
                  <label className="text-white font-[300] text-[16px]">
                    Designation*
                  </label>
                  <input
                    onChange={handleOnChange}
                    onKeyDown={handleEnter}
                    className="w-full  h-[46px] bg-[#ffffff30] rounded-sm text-white placeholder: pl-[10px] placeholder:text-[#CECECE] placeholder:text-sm outline-none"
                    type="text"
                    minLength={2}
                    maxLength={32}
                    required
                    value={values.designation.value}
                    name="designation"
                    placeholder="Enter Designation"
                    autoComplete='off'
                  />
                  {/* {values.designation.errorMessage && (
                    <span className="text-red-700 text-sm">
                      {values.designation.errorMessage}
                    </span>
                  )} */}
                </div>
                <button
                r
                  type='submit'
                  className="w-full rounded-sm h-[46px] bg-white text-[#2676c2] font-medium"
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default EmployerSignup;
