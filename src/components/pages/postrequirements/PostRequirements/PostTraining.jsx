import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Box from "@mui/material/Box";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import '../../../styles/Requirements.css';
import { addDays, addMonths, addHours } from 'date-fns';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { postTrainingRequirementAction } from "../../../../redux/action/postRequirement.action";
import Axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL
const PostTrainingSection = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeOption,] = useState("postTraining");
    const [trainingType, setTrainingType] = useState("");
    const [participantCount, setParticipantCount] = useState('');
    const [trainingMode, setTrainingMode] = useState("");
    const [durationType, setDurationType] = useState("");
    const [durationCount, setDurationCount] = useState('');
    const [selectedCountry, setSelectedCountry] = useState("IND");
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');
    const [availability, setAvailability] = useState("");
    const [content, setContent] = useState("");
    const [contentt,] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("");
    const [otherLocation, setOtherLocation] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const employer = useSelector(({ employerSignUp }) => {
        return employerSignUp?.employerDetails?.employerDetails
    })
    const dispatch = useDispatch()
    const postRequiement = useSelector(({ postRequirement }) => {
        return postRequirement;
    })

    let states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Delhi",
        "Ladakh",
        "Lakshadweep",
        "Puducherry"
    ];

    const handleSelectChange = (event) => {
        setSelectedState(event.target.value);
        if (event.target.value !== 'Other') {
            setOtherLocation('');
        }
    };

    const startDatePickerRef = useRef(null);
    const endDatePickerRef = useRef(null);

    const handleCalendarIconClick = (ref) => {
        if (ref.current) {
            ref.current.setOpen(true);
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [content, contentt]);

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (date) {
            handleEndDateChange(date, durationCount);
        }
    };

    const handleEndDateChange = (startDate, count) => {
        let endDate;
        if (durationType === "day") {
            endDate = addDays(startDate, count);
        } else if (durationType === "month") {
            endDate = addMonths(startDate, count);
        } else if (durationType === "hour") {
            endDate = addHours(startDate, count);
        }
        setEndDate(endDate);
    };

    const handleDurationCountChange = (count) => {
        setDurationCount(count);
        if (startDate) {
            handleEndDateChange(startDate, count);
        }
    };

    useEffect(() => {
        if (startDate) {
            handleEndDateChange(startDate, durationCount);
        }
    }, [startDate, durationCount, durationType]);

    const [urgentlyNeedTrainer, setUrgentlyNeedTrainer] = useState(false);

    const handleCheckboxChange = (event) => {
        setUrgentlyNeedTrainer(event.target.checked);
    };
    const maxCount = 9999;

    const adjustHeight = () => {
        if (description.current) {
            description.current.style.height = "2.4rem";
            description.current.style.height = `${description.current.scrollHeight}px`;
        }
        if (description2.current) {
            description2.current.style.height = "46px";
            description2.current.style.height = `${description2.current.scrollHeight}px`;
        }
        if (description3.current) {
            description3.current.style.height = "46px";
            description3.current.style.height = `${description3.current.scrollHeight}px`;
        }
    };

    const handleDurationTypeChange = (e) => {
        setDurationType(e.target.value);
        setDurationCount(''); // Reset the duration count when the type changes
    };

    const handleTrainingTypeChange = (e) => {
        setParticipantCount(''); // Reset participant count on training type change
        setTrainingType(e.target.value);
    };

    const handleParticipantCountChange = (count) => {
        setParticipantCount(count);
    };


    const handleInputCount = (e) => {
        let value = e.target.value.replace(/^0+/, ''); // Remove leading zeros
        value = value === '' ? '' : parseInt(value, 10); // Allow empty string or valid number
        handleDurationCountChange(isNaN(value) ? '' : value);
    };

    const handleParticipantInputChange = (e) => {
        let value = e.target.value.replace(/^0+/, ''); // Remove leading zeros
        value = value === '' ? '' : parseInt(value, 10); // Allow empty string or valid number
        handleParticipantCountChange(isNaN(value) ? '' : value); // Handle NaN by setting empty string
    };

    // const getCurrencySymbol = (countryCode) => {
    //     switch (countryCode) {
    //         case 'IND':
    //             return '₹';
    //         case 'USA':
    //             return '$';
    //         // Add more cases as needed
    //         default:
    //             return '₹'; // Default to Indian Rupee symbol
    //     }
    // };

    const placeholders = {
        IND: '₹',
        USA: '$'
    };

    // const handleCountryChange = (e) => {
    //     const selectedOption = e.target.value;
    //     setSelectedCountry(selectedOption);

    //     // Update currency symbol based on the selected country
    //     const symbol = getCurrencySymbol(selectedOption);
    //     setCurrencySymbol(symbol);

    //     // Clear min and max budgets when changing the country (or you can keep existing values if needed)
    //     setMinBudget('');
    //     setMaxBudget('');
    // };
    // const formatCurrencyValue = (amount) => {
    //     if (amount === '') {
    //         return '';
    //     }
    //     const amountWithoutSymbol = amount?.replace(currencySymbol, '').trim();
    //     return `${currencySymbol} ${amountWithoutSymbol}`;
    // };

    const handleTrainingModeChange = (mode) => {
        setTrainingMode(mode);
    };

    const trainingName = useRef()
    const description = useRef()
    const tocFile = useRef()

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePostTrainingSubmit = async () => {
        if (
            !trainingName.current.value ||
            !description.current.value ||
            selectedTopics.length === 0 ||
            !trainingType ||
            !participantCount ||
            !trainingMode ||
            !minBudget ||
            !maxBudget ||
            !durationType ||
            !durationCount ||
            !startDate ||
            !endDate ||
            !availability
        ) {
            toast.error('Please fill in all required fields.');
            return; // Exit the function early if validation fails
        }
        setIsSubmitting(true);

        let formData = new FormData();
        // Append fields to FormData
        formData.append("trainingName", trainingName.current.value);
        formData.append("description", description.current.value);
        formData.append("topics", JSON.stringify(selectedTopics.map(topic => topic.value)));
        formData.append("typeOfTraining", trainingType);
        formData.append("participantCount", participantCount);
        formData.append("modeOfTraining", trainingMode);
        formData.append("location", selectedState === 'Other' ? otherLocation : selectedState);
        formData.append("minBudget", minBudget);
        formData.append("maxBudget", maxBudget);
        formData.append("durationType", durationType);
        formData.append("durationCount", durationCount);
        formData.append("selectedCountry", selectedCountry);
        formData.append("availability", availability);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("urgentlyNeedTrainer", urgentlyNeedTrainer);
        formData.append('postedByName', employer?.fullName)
        formData.append('postedByCompanyName', employer?.companyName)
        formData.append('postedByImg', employer?.profileImg)
        formData.append('postedByDesignation', employer?.designation)
        // console.log('emplooyer', employer?.fullName)
        // Append file to FormData
        if (tocFile.current && tocFile.current.files.length > 0) {
            // console.log("tocFile", tocFile.current.files[0])
            formData.append("tocFile", tocFile.current.files[0], tocFile.current?.files[0]?.name);
        }
        try {
            await dispatch(postTrainingRequirementAction(formData));
            await handleResetPostTraining();
            toast.success('Your Training is posted successfully');
        } catch (error) {
            toast.error('An error occurred while posting your training. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }

    }
    // useEffect(() => {
    //     if (postRequiement?.success) {
    //         toast.success('Your Training is posted successfully!', {
    //             position: "top-right",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //         // setToastShown(true); // Set toastShown to true to prevent further toasts
    //     } else if (!postRequiement?.success && postRequiement?.message) {
    //         toast.error(postRequiement?.message);
    //     }
    // }, [dispatch]);

    const handleResetPostTraining = () => {
        trainingName.current.value = ''
        description.current.value = ''
        setSelectedTopics([])
        setTrainingType('')
        setTrainingMode('')
        setMinBudget('')
        setMaxBudget('')
        setDurationType('')
        setAvailability('')
        setStartDate('')
        setEndDate('')
        setUrgentlyNeedTrainer(false)
        setOtherLocation('')
        setSelectedState('')
        setSelectedFileName('')
    }

    const [selectedTopics, setSelectedTopics] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [skills, setSkills] = useState([]);

    useMemo(() => {
        Axios.get(`${baseUrl}/trainer/skills`)
            .then((resp) => {
                const sortedSkills = resp.data?.skills.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                const formattedSkills = sortedSkills.map(skill => ({
                    value: skill.name,
                    label: skill.name
                }));
                setSkills(formattedSkills);
            })
            .catch((err) => console.log(err));
    }, [baseUrl]);

    const handleTopicChange = (selectedOptions) => {
        setSelectedTopics(selectedOptions);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newOption = { value: inputValue, label: inputValue };
            setSelectedTopics([...selectedTopics, newOption]);
            setInputValue("");
        }
    };

    const handleInputChange = (newValue) => {
        setInputValue(newValue)
    };


    const description2 = useRef()
    const description3 = useRef()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()

            if (event.target === trainingName.current) {
                description.current.focus();
            }
        }
    }

    const handleFileUploadClick = () => {
        tocFile.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files[0] !== undefined) {
            let file = e.target.files[0];
            setSelectedFileName(file.name);
        }
    };

    const handleAvailabilityChange = (e) => {
        const value = e.target.value;
        setAvailability(value);
        if (value === "unavailable" && tocFile.current) {
            setSelectedFileName('');
            tocFile.current.value = '';  // Clear the file input value
        }
    };

    const handleLocationChange = (e) => {
        const value = e.target.value;
        // Allow only letters and spaces
        const regex = /^[A-Za-z\s]*$/;
        if (regex.test(value)) {
            setOtherLocation(value);
        }
    };

    return (
        <div className="Requirements">
            <div className="Buttons_Content">
                {activeOption === "postTraining" && (
                    <div className="Post_Training_content">
                        <div div className="Company">
                            <div className="Training_Name">Training Name *</div>
                            <input
                                type="text" style={{ padding: '0 10px', color: '#333333', }}
                                placeholder="Training Name"
                                ref={trainingName}
                                name="trainingName"
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                                maxLength="32"
                                required
                            />
                        </div>
                        <div className="Training_Description">
                            <label for="description" className="text-[#333333] font-['Poppins'] mb-[10px]">Description *</label>
                            <textarea
                                ref={description}
                                name="description"
                                className="h-auto"
                                onChange={handleChange}
                                id="description"
                                placeholder="Enter your description here"
                                style={{ borderRadius: '0.4rem', minHeight: "2.4rem" }}
                                autoComplete="off"
                                required
                                minLength="80"
                                maxLength='1020'
                            />
                        </div>

                        <div className="Content_Title" style={{ width: '41.3rem', marginBottom: '10px' }}>
                            <p>Technology (Training Topics) *</p>
                            <div className="mt-[10px] mb-[20px]">
                                <Select
                                    defaultValue={[]}
                                    isMulti
                                    name="colors"
                                    options={skills}
                                    className="Multiselector"
                                    placeholder="Select Training Topics"
                                    styles={{
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#888',
                                        }),
                                    }}
                                    value={selectedTopics}
                                    onChange={handleTopicChange}
                                    inputValue={inputValue}
                                    onInputChange={handleInputChange}
                                    onKeyDown={handleInputKeyDown}
                                />
                            </div>
                        </div>
                        <div className="Type_Of_Training">
                            <div className="text-[#333333] font-['Poppins']">Type Of Training *</div>
                            <div className="RadioTOT">
                                <label className={`LLLabel ${trainingType === "Corporate Training" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="trainingType"
                                        value="Corporate Training"
                                        checked={trainingType === "Corporate Training"}
                                        onChange={handleTrainingTypeChange}
                                    />
                                    <h2>Corporate Training</h2>
                                </label>
                                <label className={`LLLabel ${trainingType === "College Training" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="trainingType"
                                        value="College Training"
                                        checked={trainingType === "College Training"}
                                        onChange={handleTrainingTypeChange}
                                    />
                                    <h2>College Training</h2>
                                </label>
                                <label className={`LLLabel ${trainingType === "Individual" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="trainingType"
                                        value="Individual"
                                        checked={trainingType === "Individual"}
                                        onChange={handleTrainingTypeChange}
                                    />
                                    <h2>Individual</h2>
                                </label>
                            </div>

                            {(trainingType === "Corporate Training" || trainingType === "College Training" || trainingType === "Individual") && (
                                <div className="ParticipantCount">
                                    <h5 className="mt-2 mb-2 text-535353 font-Poppins">
                                        Select No Of Participants

                                    </h5>
                                    <div className="RadioTOT_Count">
                                        <button onClick={() => handleParticipantCountChange(Math.max(participantCount - 1, 0))}>-</button>
                                        <input
                                            className="Duration_Input placeholder-[#2676C2] placeholder:ps-2"
                                            value={participantCount}
                                            onChange={handleParticipantInputChange}
                                            style={{ width: `30px`, textAlign: 'center' }}
                                            maxLength="3"
                                            placeholder="0"

                                        />
                                        <button onClick={() => handleParticipantCountChange(Math.min(participantCount + 1, 999))}>+</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="Mode_Of_Training">
                            <div className="text-[#333333] font-['Poppins']">Mode Of Training *</div>
                            <div className="Radio_MOT">
                                <label className={`LLLabel font-['Poppins'] ${trainingMode === "Online" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="trainingMode"
                                        value="Online"
                                        checked={trainingMode === "Online"}
                                        onChange={() => handleTrainingModeChange("Online")}
                                    />
                                    Online
                                </label>
                                <label className={`LLLabel font-['Poppins'] ${trainingMode === "Offline" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="trainingMode"
                                        value="Offline"
                                        checked={trainingMode === "Offline"}
                                        onChange={() => handleTrainingModeChange("Offline")}
                                    />
                                    Offline
                                </label>
                            </div>
                            {trainingMode === 'Offline' && (
                                <div className="SelectLocation">
                                    <label className="LLLabel">
                                        <h5 className="mt-[10px] mb-[10px] text-[#535353] font-['Poppins']">Your Location</h5>
                                    </label>
                                    <select
                                        value={selectedState}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Select Location</option>
                                        {states.map((state, index) => (
                                            <option key={index} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                        <option value="Other">Other</option>
                                    </select>
                                    {selectedState === 'Other' && (
                                        <input
                                            type="text"
                                            value={otherLocation}
                                            onChange={handleLocationChange}
                                            placeholder="Enter your location"
                                            className="mt-[10px] mb-[10px] text-[#2676C2] font-['Poppins'] text-[16px] p-1"
                                            style={{ border: '1px solid #CECECE', outline: 'none', borderRadius: '5px' }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        {/* <div className="Select_Experience">
                            <p className="mt-[5px] mb-[5px]">Select Experience</p>
                            <h5 className="mt-[5px] mb-[5px]">Slide To Set Your Experience</h5>
                            <div
                                style={{
                                    width: '40rem',
                                    marginTop: '10px',
                                    position: 'relative',
                                    marginBottom: '15px',
                                }}
                            >
                                <input
                                    type="range"
                                    value={experience}
                                    onChange={handleExperienceChange}
                                    onMouseDown={handleDragStart}
                                    onMouseUp={handleDragEnd}
                                    onTouchStart={handleDragStart}
                                    onTouchEnd={handleDragEnd}
                                    min={0}
                                    max={50}
                                    aria-label="Experience Range (Post Training)"
                                    step={1}
                                    style={{
                                        width: '100%',
                                        height: '5px',
                                        cursor: 'pointer',
                                        appearance: 'none',
                                        outline: 'none',
                                        borderRadius: '5px',
                                        zIndex: 1,
                                        ...trackBackground,
                                    }}
                                />
                                {showValueLabel && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '20px',
                                            left: `calc(${(experience / 50) * 100}%)`,
                                            transform: 'translateX(-50%)',
                                            textAlign: 'center',
                                            color: '#2676C2',
                                            fontFamily: 'Poppins',
                                            fontSize: '0.855rem',
                                            fontStyle: 'normal',
                                            fontWeight: 'bold',
                                            paddingLeft: '3.1rem',
                                            paddingTop: '0.5rem',
                                        }}
                                    >
                                        {experience} years
                                    </div>
                                )}
                            </div>
                        </div> */}
                        <div className="Duration_Of_Time">
                            <div className="font-Poppins">Duration Of Training *</div>
                            <div className="Radio_Duration">
                                <label className={`LLLabel font-Poppins ${durationType === "hour" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="durationType"
                                        value="hour"
                                        checked={durationType === "hour"}
                                        onChange={handleDurationTypeChange}
                                    />
                                    Hourly
                                </label>
                                <label className={`LLLabel font-Poppins ${durationType === "day" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="durationType"
                                        value="day"
                                        checked={durationType === "day"}
                                        onChange={handleDurationTypeChange}
                                    />
                                    Day
                                </label>
                                <label className={`LLLabel font-Poppins ${durationType === "month" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="durationType"
                                        value="month"
                                        checked={durationType === "month"}
                                        onChange={handleDurationTypeChange}
                                    />
                                    Month
                                </label>
                            </div>
                            {(durationType === "day" || durationType === "month" || durationType === "hour") && (
                                <div className="DurationCount">
                                    <h5 className="mt-2 mb-2 text-535353 font-Poppins">
                                        Select No Of {durationType === "day" ? "Days" : durationType === "month" ? "Months" : "Hours"}

                                    </h5>
                                    <div className="Radio_Duration_Count">
                                        <button onClick={() => handleDurationCountChange(Math.max(durationCount - 1, 0))}>-</button>
                                        <input
                                            className="Duration_Input placeholder-[#2676C2] placeholder:ps-2"
                                            value={durationCount}
                                            onChange={handleInputCount}
                                            style={{ width: `30px`, textAlign: 'center' }}
                                            maxLength="3"
                                            placeholder="0"

                                        />
                                        <button onClick={() => handleDurationCountChange(Math.min(durationCount + 1, 999))}>+</button>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="Budgets">
                            <p className="text-lg font-[500] font-['Poppins']">Budgets *</p>
                            <span className="Budget_MM">
                                <select
                                    className=""
                                    style={{
                                        borderRadius: '0.5rem',
                                        paddingLeft: '0.3rem',
                                        color: '#2676C2',
                                        fontFamily: 'Poppins',
                                        fontSize: '0.875rem',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                    value={selectedCountry}
                                    onChange={(e) => {
                                        setSelectedCountry(e.target.value);
                                        setMinBudget('');
                                        setMaxBudget('');
                                    }}
                                >
                                    <option value="IND" >IND</option>
                                    <option value="USA">USA</option>

                                </select>
                                <span>
                                    <input
                                        style={{
                                            border: ' 1.5px #DADADA solid ',
                                            borderRadius: '0.5rem 0 0 0.5rem',
                                            width: '6rem',
                                            borderRight: '0.7px #DADADA solid',
                                        }}
                                        type="text"
                                        value={minBudget}
                                        onChange={(e) => setMinBudget(e.target.value.replace(/\D/, ''))}
                                        placeholder={placeholders[selectedCountry]}
                                        maxLength="7"
                                        required
                                    />
                                    <input
                                        style={{
                                            border: ' 1.5px #DADADA solid',
                                            borderRadius: '0 0.5rem 0.5rem 0 ',
                                            width: '6rem',
                                            borderLeft: '0.7px #DADADA solid',
                                        }}
                                        type="text"
                                        value={maxBudget}
                                        onChange={(e) => setMaxBudget(e.target.value.replace(/\D/, ''))}
                                        placeholder={placeholders[selectedCountry]}
                                        maxLength="7"
                                        required
                                    />
                                </span>
                            </span>
                        </div>
                        <div className="TOC">
                            <p >TOC (Table of content) *</p>

                            <div className="TOC_Radio">
                                <label className={`font-['Poppins'] ${availability === "available" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        value="available"
                                        checked={availability === "available"}
                                        onChange={handleAvailabilityChange}
                                        style={{ borderRadius: '0' }}
                                    />
                                    Available
                                </label>

                                <label className={`font-['Poppins'] ${availability === "unavailable" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        value="unavailable"
                                        checked={availability === "unavailable"}
                                        onChange={handleAvailabilityChange}
                                    />
                                    Unavailable
                                </label>
                            </div>
                            {availability === "available" && (
                                <div className="UPLOADFILE">
                                    <span className="flex items-center justify-between w-[100%] px-1">
                                        <h4 className=" h-[100%] w-[190px] overflow-hidden whitespace-nowrap text-ellipsis">{selectedFileName || "Select File"}</h4>
                                        <FileUploadOutlinedIcon
                                            sx={{ color: "#2676C2", fontSize: "1.3rem", cursor: 'pointer' }}
                                            onClick={handleFileUploadClick}
                                        />
                                    </span>
                                    <input
                                        type="file"
                                        ref={tocFile}
                                        onChange={handleFileChange}
                                        style={{ cursor: 'pointer', display: 'none' }}

                                    />
                                </div>

                            )}
                        </div>
                        <div className="Training_Dates">
                            <p className=" font-['Poppins']">Training Dates *</p>
                        </div>
                        <div className="Training_Dates" style={{ display: 'flex', gap: '1rem' }}>
                            <div className="date-picker">
                                <p>Start Date *</p>
                                <div style={{ width: '16rem', display: 'flex', }}>
                                    <DatePicker
                                        className="end"
                                        selected={startDate}
                                        onChange={date => handleStartDateChange(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        isClearable={true}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="DD/MM/YYYY"
                                        ref={startDatePickerRef}
                                        minDate={new Date()}
                                    />
                                    <div className="CalenderIcon" onClick={() => handleCalendarIconClick(startDatePickerRef)}>
                                        <CalendarMonthOutlinedIcon color="#333" sx={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                            </div>
                            < div className="date-picker">
                                <p>End Date *</p>
                                <div style={{ width: '16rem', display: 'flex' }}>
                                    <DatePicker
                                        className="end"
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        isClearable={true}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="DD/MM/YYYY"
                                        ref={endDatePickerRef}
                                        filterDate={() => false}
                                    />
                                    <div className="CalenderIcon" onClick={() => handleCalendarIconClick(endDatePickerRef)}>
                                        <CalendarMonthOutlinedIcon color="#333" sx={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Box sx={{ mt: '10px', mb: '10px' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={urgentlyNeedTrainer}
                                            onChange={handleCheckboxChange}
                                            name="urgentlyNeedTrainer"
                                            color="primary" // You can customize the color
                                        />
                                    }
                                    label="If you urgently need a trainer"
                                    className="custom-label"
                                />

                            </Box>
                        </div>
                        {activeOption === "postTraining" && (
                            <div className="Post_Button mb-[20px]">
                                <button
                                    style={{ borderRadius: "5px" }}
                                    className="Reset_Btn flex justify-center items-center"
                                >
                                    <span onClick={handleResetPostTraining}>Reset</span>
                                </button>
                                <button
                                    style={{ borderRadius: "5px" }} onClick={handlePostTrainingSubmit} disabled={isSubmitting} className="Submit_Btn flex justify-center items-center">
                                    <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostTrainingSection;

