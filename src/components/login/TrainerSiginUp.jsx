import React from "react";
import { BiChevronDown } from "react-icons/bi";
import "../styles/RoleSelection.css";
import "../styles/Employee.css";
import "../styles/SkillSet.css"
import LOGO from "../assets/Header_Logo_RS.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { trainerSignUpAction, getSkillsData } from '../../redux/action/trainer.action'
import Select from 'react-select';
import Cookies from 'js-cookie'
import { toast } from "react-toastify";

const SkillsSet = () => {
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [enteredSkill, setEnteredSkill] = useState("");
  const [open, setOpen] = useState(false);
  const countries = ["French", "Spanish", "German", "Italian", "Chinese"];
  const contactDetails = Cookies.get("contactDetails")
  useEffect(() => {
    dispatch(getSkillsData())
  }, [dispatch])
  const roleSelection = useSelector(({ roleSelection }) => {
    return roleSelection
  })

  const trainerSignUp = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails
  })
  const skillsTopics = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.skillData?.skills;
  })
  // Function to check if the string is an email
  const isEmail = (value) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(value);
  };

  const trainerDetails = {
    fullName: '',
    experience: 0,
    skills: [],
    primaryNumber: '',
    email: '',
    role: localStorage.getItem('role')
  }
  const navigate = useNavigate();
  console.log('Trainer', trainerSignUp)
  // console.log('role',roleSelection)
  console.log("skillsTopics", selectedSkills)

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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const inputValue = e.target.value.trim();
      if (inputValue !== "") {
        // Check if the entered value is not empty
        const newSkill = {
          value: inputValue,
          label: inputValue,
          name: inputValue,
          image: null // Set image as needed
        };
        setSelectedSkills((prevSelectedSkills) => [
          ...prevSelectedSkills,
          newSkill
        ]);
        setEnteredSkill(""); // Clear input field after adding the skill
      }
    }
  };

  if (isEmail(contactDetails)) {
    trainerDetails.email = contactDetails;
  } else {
    trainerDetails.primaryNumber = contactDetails;
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    // Handle sign-in logic here
    trainerDetails.fullName = fullName;
    trainerDetails.experience = experience;
    trainerDetails.skills = selectedSkills?.map(({ name, image }) => ({ name, image }));
    // console.log(trainerDetails)
    setFullName("")
    setExperience("")
    setSelectedSkills([])
    if (trainerDetails.fullName.length > 0 && trainerDetails.experience.length > 0) {
      if (trainerDetails.skills.length <= 3) {
        toast.info('Please add at least three skills!');
      }
      else {

        dispatch(trainerSignUpAction(trainerDetails))
      }
    }
    else {
      toast.info('please fill the details')
    }
  };
  React.useEffect(() => {
    if (trainerSignUp?.success) {
      toast.success(trainerSignUp?.message, {

      })
      Cookies.set('token', trainerSignUp?.token)
      localStorage.setItem('newUser', true)
      navigate('/trainerDashboard/feed')
    }
    else {
      toast.error(trainerSignUp?.message, {
      });
    }
  }, [navigate, trainerSignUp])
  return (
    <div className="Trainer">
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
                  ? "bg-[#2676c2] text-[#ffff] ring-[#2676c3]"
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
        <div className='Details'>
          <div style={{ display: "flex", justifyContent: "flex-start", width: '68%', margin: 'auto', marginTop: '2rem' }}>
            <svg onClick={() => { navigate('/selectrole') }} className=" cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none">
              <path d="M25 10.8004L1 10.8004M1 10.8004L10.6 20.4004M1 10.8004L10.6 1.20039" stroke="#2676C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h1 style={{ margin: 'auto', marginTop: '-2rem' }}>
            Trainer's Gateway :<br />
            <span style={{ background: '#2676C2', color: '#FFF', }}>Craft, Inspire, Elevate</span>
          </h1>
        </div>
        <div className='Fill_Details'>
          <form onSubmit={handleSignIn}>
            <div className='trainer-form-details'>
              <label className='trainer-form-label'>
                Full Name
                <input type='text' required value={fullName} onChange={(e) => (setFullName(e.target.value))} placeholder='Enter Full name' onKeyDown={(e) => handleEnter(e)} />
              </label>

              <label className='trainer-form-label'>
                Experience
                <input type='number' required value={experience} onChange={(e) => (setExperience(e.target.value))} placeholder='Select Your Experience Level' onKeyDown={(e) => handleEnter(e)} />
              </label>

              <label>
                Skill Set
                <div className='selectinput-skills' style={{ height: "auto" }}>
                  <Select
                    value={selectedSkills}
                    required
                    onChange={setSelectedSkills}
                    onKeyDown={handleKeyDown}
                    placeholder='Enter Your skills'
                    defaultValue={[]}
                    isMulti
                    name="Qualifications"
                    options={skillsTopics?.map(skill => ({
                      value: skill.name,
                      label: skill.name,
                      name: skill.name,
                      image: skill.image
                    }))}
                    // Allow user to enter custom value
                    createOption={(inputValue) => ({
                      value: inputValue,
                      label: `Add "${inputValue}"`,
                      name: inputValue,
                      image: null // Set image as needed
                    })}
                    isValidNewOption={(inputValue, selectValue, selectOptions) =>
                      inputValue.trim() !== '' && !selectOptions.find(option => option.label === `Add "${inputValue}"`)
                    }
                    className="Multiselector"

                    styles={{

                      placeholder: (provided) => ({
                        ...provided,
                        color: 'var(--icon-color, #FFF)',
                        fontFamily: 'Poppins',
                        fontSize: '1.125rem',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        opacity: 0.3
                      }),
                      control: (provided) => ({
                        ...provided,
                        // padding:0,
                        borderRadius: '0.125rem',
                        width: '21.9rem',
                        minHeight: '2.8rem',
                        height: "auto",
                        flexShrink: 0,
                        border: 'none',
                        fontFamily: 'Poppins',
                        color: '#FFF',
                        fontSize: '1rem',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        background: 'rgba(255, 255, 255, 0.20)',

                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center'
                        // other styles
                      }),
                      input: (provided) => ({
                        ...provided,
                        // height:"auto",
                        color: "#FFF",
                        padding: '0',
                        margin: "0"
                      }),
                      menu: (provided) => ({
                        ...provided,
                        background: '#fff',
                        color: '#7b7b7b',
                        overflow: 'hidden',
                        position: "relative",
                      }),
                      option: (provided) => ({
                        ...provided,
                        '&:hover': {
                          backgroundColor: '#e3e3e3',
                          cursor: 'pointer' // Background color on hover
                        }
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        background: 'rgba(255, 255, 255, 0.20)',
                        // color:'#2676C2',
                        borderRadius: "0 8px 8px 0",
                        // opacity:"0.3",
                        '&:hover': {
                          backgroundColor: '#2676C2',
                          cursor: 'pointer', // Background color on hover
                          color: '#fff'
                        }
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        background: 'rgba(255, 255, 255, 0.20)',
                        borderRadius: "8px",
                        // opacity:0.3,
                        color: '#fff',
                        margin: "6px 3px",
                      }),
                      indicatorContainerRemove: (provided) => ({
                        ...provided,
                        display: 'none'
                      }),
                      menuList: (provided) => ({
                        ...provided,
                        width: "100%",
                        height: '10rem',
                        '::-webkit-scrollbar': {
                          width: '5px', // Set the width of the scrollbar
                        },
                        '::-webkit-scrollbar-thumb': {
                          backgroundColor: '#7b7b7b', // Color of the scrollbar thumb
                          borderRadius: '3px', // Rounded corners of the thumb
                        },
                      }),
                    }}
                  />
                </div>
              </label>
            </div>

            <button type='submit' style={{ cursor: 'pointer' }}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsSet;
