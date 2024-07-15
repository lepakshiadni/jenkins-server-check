import { useState, useEffect, useMemo } from 'react';
import '../styles/TrainerSignUp.css'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LOGO from "../assets/Header_Logo_RS.png"; // Make sure to replace this with the actual path to your logo
import { BiChevronDown } from 'react-icons/bi';
import Axios from 'axios'
import Select from 'react-select';
import { trainerSignUpAction } from '../../redux/action/trainer.action';
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { setToken } from '../utils/TokenUtils';
import HelpPopUp from "./HelpPopUp";

const baseUrl = process.env.REACT_APP_API_URL;
function TrainerSignUp() {
    const [selected, setSelected] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillsTopics, setSkillsTopics] = useState([])
    const [enteredSkill, setEnteredSkill] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const countries = ["French", "English", "Spanish", "German", "Italian", "Chinese"];

    const [errorMessage, setErrorMessage] = useState("");
    const trainer = useSelector(({ trainerSignUp }) => trainerSignUp?.trainerDetails, shallowEqual)

    const [values, setValues] = useState({
        fullName: {
            value: "",
            errorMessage: ""
        },
        experience: {
            value: "",
            errorMessage: ""
        },
        skills: {
            value: [],
            errorMessage: ""
        }
    });
    useMemo(() => {
        Axios.get(`${baseUrl}/trainer/skills`)
            .then((resp) => {
                const sortedSkills = resp.data?.skills.sort((a, b) => a.name.localeCompare(b.name));
                setSkillsTopics(sortedSkills)
            })
            .catch((err) => console.log(err))
    }, [])

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
                setValues((prev) => {
                    return {
                        ...prev,
                        skills: {
                            value: [...prev.skills.value, newSkill],
                            errorMessage: ""
                        }
                    }
                })

                setEnteredSkill(""); // Clear input field after adding the skill
            }
        }
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        let filteredValue = value;
        let errorMessage = "";

        if (name === "fullName") {
            const regex = /^[a-zA-Z ]*$/;
            filteredValue = value.replace(/[^a-zA-Z ]/g, ""); // Remove non-alphabetic characters
            if (!regex.test(filteredValue)) {
                errorMessage = "Should contain only letters (a-z, A-Z) and spaces";
            } else if (filteredValue.length < 2 || filteredValue.length > 32) {
                errorMessage = "Should be between 2 and 32 characters";
            }
        } else if (name === "experience") {
            // Allow up to two decimal places, but not exceed 100
            const regex = /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0{1,2})?)$/;
            filteredValue = value.replace(/[^0-9.]/g, ""); // Filter only valid numeric and decimal characters
            if (!regex.test(filteredValue)) {
                errorMessage = "experience Should be less than 100";
            }
        }

        setValues(prevValues => ({
            ...prevValues,
            [name]: {
                value: filteredValue,
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

        // Validate experience field
        const experienceValue = newValues.experience.value;
        const experienceRegex = /^\d{0,2}(\.\d{1,2})?$/;
        if (!experienceRegex.test(experienceValue) || parseFloat(experienceValue) > 100) {
            newValues.experience.errorMessage = "Sholud be a valid experience";
            hasError = true;
        } else if (experienceValue.length > 2 && !experienceValue.includes(".")) {
            newValues.experience.errorMessage = "Sholud be a valid experience";
            hasError = true;
        }
        // Validate skills separately
        if (selectedSkills.length < 2) {
            setErrorMessage("Please select at least 2 skills.");
            hasError = true;
        } else {
            setErrorMessage("");
        }

        setValues(newValues);

        if (!hasError) {
            console.log("Form submitted successfully with values: ", newValues);
            const trainerDetails = {
                fullName: newValues.fullName.value,
                experience: newValues.experience.value,
                skills: selectedSkills?.map(({ name, image }) => ({ name, image })),
                role: 'trainer',
                contactValue: Cookies.get('contactDetails')
            };
            // Dispatch an action or navigate to another page here
            dispatch(trainerSignUpAction(trainerDetails));
        }
    };

    useEffect(() => {
        if (trainer?.success) {
            toast.success(trainer?.message);
            Cookies.set('token', trainer?.token)
            localStorage.setItem('newUser', true)
            navigate('/trainerDashboard/feed')
            console.log('Success:', trainer?.message);
        } else if (trainer?.error) {
            toast.error(trainer?.error);
        }
    }, [trainer?.success, trainer?.message]);

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
    console.log('trainer', trainer)
    const [showHelpPopUp, setShowHelpPopUp] = useState(false);

    return (
        <>
           <HelpPopUp
        trigger={showHelpPopUp}
        setTrigger={setShowHelpPopUp}
      />
        <div className=" w-full min-h-screen trainerSignupContent">
            <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 lg:px-12 gap-4 md:gap-6 lg:gap-8">
                <div className="w-[200px] h-[73px]">
                    <img src={LOGO} alt="Logo" />
                </div>
                <div className="hidden md:flex gap-10 mr-[15px] cursor-pointer " >
                    <svg
                    onClick={()=>{setShowHelpPopUp(true)}}
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
            <div className="flex justify-center mt-[30px]">
                <div className="w-[90%] md:w-[80%] lg:w-[90%] h-auto md:h-[23rem] flex flex-col md:flex-row">
                    <div className="w-full md:w-[60%] bg-white p-4 rounded-l-[5px]">
                        <div className="flex flex-col gap-5 justify-start w-[85%] m-auto mt-[2.3rem]">
                            <div className="cursor-pointer" onClick={() => { navigate('/selectrole') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none">
                                    <path d="M25 10.8004L1 10.8004M1 10.8004L10.6 20.4004M1 10.8004L10.6 1.20039" stroke="#2676C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#2676c2] font-[600] text-[24px] md:text-[30px] md:text-wrap lg:text-[45px]">
                                    Trainer's Gateway :
                                    Craft, Inspire, Elevate
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#2676c2] rounded-r-[5px] w-full h-auto md:w-[40%] p-4 ">
                        <div className="flex justify-center items-center w-full h-full ">
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
                                        Experience (eg : 0-99years)*
                                    </label>
                                    <input
                                        onChange={handleOnChange}
                                        onKeyDown={handleEnter}
                                        className="w-full h-[46px] bg-[#ffffff30] rounded-sm text-white placeholder: pl-[10px] placeholder:text-[#CECECE] placeholder:text-sm outline-none"
                                        type="text"
                                        maxLength={4}
                                        required
                                        value={values.experience.value}
                                        name="experience"
                                        placeholder="Enter Your Experience Level"
                                        min="0"
                                        autoComplete='off'
                                    />
                                    {values.experience.errorMessage && (
                                        <span className="text-red-700 text-sm">
                                            {values.experience.errorMessage}
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-3 ">
                                    <label className="text-white font-[300] text-[16px]">
                                        Skills Set*
                                    </label>
                                    {errorMessage && (
                                        <span className="text-red-700 text-sm">
                                            {errorMessage}
                                        </span>
                                    )}
                                    <>
                                    <Select
                                        className="MultipleSelector"
                                        value={selectedSkills}
                                        required
                                        onChange={setSelectedSkills}
                                        onKeyDown={handleKeyDown}
                                        placeholder='Enter Your skills'
                                        inputValue={enteredSkill} // Control the input field value
                                        onInputChange={(newValue) => setEnteredSkill(newValue)}
                                        defaultValue={[]}
                                        isMulti
                                        name="skills"
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

                                        styles={{

                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#CECECE',
                                                fontFamily: 'Poppins',
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                                                             // opacity: 0.3    
                                            }),
                                            control: (provided) => ({
                                                ...provided,
                                                // padding:0,
                                                borderRadius: '0.125rem',
                                                width: '100%',
                                                minHeight: '2.8rem',

                                                height: "auto",
                                                flexShrink: 0,
                                                border: 'none',
                                                fontFamily: 'Poppins',
                                                color: '#FFFf',
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
                                                height: "auto",
                                                color: "#FFF",
                                                padding: '0',
                                                margin: "0"
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                background: '#ffff',
                                                color: '#7b7b7b',
                                                overflow: 'hidden',
                                                position: "absolute",
                                                // height:'200px',
                                                zIndex: 9999,
                                                top: '-175px',
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
                                    </>
                                 
                                </div>
                                <button
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

export default TrainerSignUp;