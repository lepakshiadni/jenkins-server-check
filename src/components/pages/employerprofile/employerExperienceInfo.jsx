import { useDispatch, useSelector } from "react-redux";
import { deleteEmployerExperience, employerDetails, employerExperienceInfoUpdate } from "../../../redux/action/employers.action";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployerExperience = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(employerDetails());
    }, [dispatch]);

    const employer = useSelector(({ employerSignUp }) => {
        return employerSignUp?.employerDetails?.employerDetails;
    });

    const message = useSelector(({ employerSignUp }) => employerSignUp?.employerDetails?.message);
    // console.log(message);

    // useEffect(() => {
    //     if (message) {
    //         toast.success(message);
    //     }
    //     console.log(employer);
    // }, [message]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [designation2, setDesignation2] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const [companyName, setComapanyName] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (e.target.name === "companyName") {
                document.querySelector("[name=designation2]").focus();
            }
        }
    };

    const handleCase2DataReset = () => {
        setComapanyName("");
        setDesignation2("");
        setStartDate("");
        setIsCurrentlyWorking(false);
        setEndDate("");
        setRoleDescription("");
    };

    const experienceData = employer?.experience || [];

    const [storedData, setStoredData] = useState(experienceData);

    useEffect(() => {
        setStoredData(experienceData);
    }, [experienceData]);

    console.log('storedData', storedData);

    const handleCase2Data = (e) => {
        e.preventDefault();

        const experienceDetails = {
            companyName,
            designation2,
            startDate,
            endDate,
            roleDescription,
            status: true,
        };

        setStoredData((prevStoredData) => [...prevStoredData, experienceDetails]);
        toast.success('data added')
        handleCase2DataReset();
    };

    const handleSubmitExperience = () => {
        const originalData = employer?.experience || [];

        // Check if data has changed
        if (JSON.stringify(originalData) !== JSON.stringify(storedData)) {
            dispatch(employerExperienceInfoUpdate(storedData));
            toast.success('Experience Updated');
            navigate('/employerprofile/profileupdate/contact-information');
        }
        else {
            toast.error('Experience Not Added');
            navigate('/employerprofile/profileupdate/contact-information');
        }

    };

    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsCurrentlyWorking(e.target.checked);
        if (e.target.checked) {
            setEndDate("Currently Working");
        } else {
            setEndDate("");
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        if (endDate < e.target.value) {
            setEndDate("");
        }
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const getNextDay = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate.toISOString().split('T')[0];
    };

    const handleDelete = (_id) => {
        dispatch(deleteEmployerExperience(_id));
        toast.success('Experience Data Deleted');
    };


    const handleDesignationChange = (e) => {
        const newDesignation = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetical characters
        setDesignation2(newDesignation);
    };


    return (
        <>
            <div className="contactInfo2">
                <div className="flex justify-between items-center mb-[30px]">
                    <h6
                        style={{
                            color: "#535353",
                            fontWeight: "400",
                            fontSize: "18px",
                            marginTop: "14px",
                            marginBottom: "10px",
                        }}
                    >
                        Experience
                    </h6>
                    <button
                        onClick={handleSubmitExperience}
                        className="bg-[#2676c2] rounded-lg text-white pl-[60px] pr-[60px] pt-[8px] pb-[8px]"
                        disabled={!storedData.length > 0}
                    >
                        Update
                    </button>
                </div>
                <form onSubmit={handleCase2Data}>
                    <span>
                        <label htmlFor="">Company Name *</label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="text"
                            value={companyName}
                            onChange={(e) => setComapanyName(e.target.value)}
                            name="companyName"
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your Company Name"
                            required
                            maxLength="42"
                            autoComplete="off"
                        />
                    </span>
                    <br />
                    <span>
                        <label htmlFor="">Designation *</label>
                        <br />
                        <input
                            style={{ width: "690px" }}
                            type="text"
                            value={designation2}
                            onChange={handleDesignationChange}
                            name="designation2"
                            placeholder="Select your Designation"
                            required
                            maxLength="32"
                            autoComplete="off"
                        />
                    </span>
                    <br />
                    <div className="flex">
                        <span style={{ marginRight: "50px" }}>
                            <label htmlFor="">Start Date *</label>
                            <br />
                            <input
                                style={{ width: "320px", cursor: "pointer" }}
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                name="startDate"
                                required
                            />
                        </span>
                        <span>
                            <label htmlFor="">End Date</label>
                            <input
                                type="checkbox"
                                style={{
                                    height: "15px",
                                    width: "15px",
                                    marginLeft: "7rem",
                                    marginRight: "0.4rem",
                                    marginBottom: "0px",
                                    cursor: 'pointer'
                                }}
                                checked={isCurrentlyWorking}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="">currently Working</label>

                            <br />
                            <input
                                style={{
                                    width: "320px",
                                    filter: isCurrentlyWorking ? "blur(1px)" : "none",
                                    cursor: isCurrentlyWorking ? '' : "pointer"
                                }}
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                name="endDate"
                                min={startDate ? getNextDay(startDate) : ''}
                                disabled={isCurrentlyWorking}
                            />
                        </span>
                    </div>

                    <span>
                        <label htmlFor="">Role Description</label>
                        <br />
                        <textarea
                            value={roleDescription}
                            onChange={(e) => setRoleDescription(e.target.value)}
                            name="roleDescription"
                            id=""
                            cols="67"
                            rows="3"
                            placeholder="Enter your Role Description"
                            maxLength='1020'
                            autoComplete="off"
                        ></textarea>
                    </span>

                    <button
                        type="submit"
                        style={{
                            padding: "8px 60px",
                            backgroundColor: "#2676C2",
                            borderRadius: "10px",
                            color: "white",
                            marginTop: "30px",
                            marginLeft: "540px",
                        }}
                    >
                        Add
                    </button>
                </form>

                <div className="ExperiencStore">

                    <>
                        {
                            storedData?.map((exp, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    color: "#535353",
                                                    fontWeight: "400",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                Experience
                                            </h3>
                                            <span className="delete"
                                                onClick={() => handleDelete(exp._id)}
                                            // onClick={() => {
                                            //     const newArray = [...storedData];
                                            //     newArray.splice(index, 1);
                                            //     setStoredData(newArray);
                                            //     handleDelete(exp._id)
                                            // }}
                                            >

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="22"
                                                    viewBox="0 0 20 22"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M12.1111 8.77778V16.5556M7.66667 8.77778V16.5556M3.22222 4.33333V17.4444C3.22222 18.689 3.22222 19.3109 3.46443 19.7862C3.67748 20.2044 4.01719 20.545 4.43533 20.758C4.91022 21 5.53222 21 6.77434 21H13.0034C14.2456 21 14.8667 21 15.3416 20.758C15.7597 20.545 16.1005 20.2044 16.3136 19.7862C16.5556 19.3113 16.5556 18.69 16.5556 17.4479V4.33333M3.22222 4.33333H5.44444M3.22222 4.33333H1M5.44444 4.33333H14.3333M5.44444 4.33333C5.44444 3.29791 5.44444 2.78045 5.6136 2.37207C5.83914 1.82756 6.27147 1.3947 6.81597 1.16916C7.22435 1 7.74235 1 8.77778 1H11C12.0354 1 12.5531 1 12.9615 1.16916C13.506 1.3947 13.9385 1.82756 14.1641 2.37207C14.3332 2.78045 14.3333 3.29791 14.3333 4.33333M14.3333 4.33333H16.5556M16.5556 4.33333H18.7778"
                                                        stroke="#2676C2"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="experienceSpan">
                                            <h3>
                                                Company Name: <span> {exp.companyName} </span>{" "}
                                            </h3>
                                            <h3>
                                                Designation: <span>{exp.designation2} </span>{" "}
                                            </h3>
                                            <h3>
                                                Start Date: <span>{exp.startDate} </span>{" "}
                                            </h3>
                                            <h3>
                                                End Date: <span>{exp.endDate} </span>{" "}
                                            </h3>
                                            <p className="preview-container whitespace-normal break-words overflow-hidden text-ellipsis">{exp.roleDescription}</p>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })
                        }
                    </>
                </div>
            </div>
        </>
    );
}

export default EmployerExperience;