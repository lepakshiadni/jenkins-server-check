import React, { useEffect, useMemo, useState } from "react";
import "../../styles/TrainerSettings.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { generateOtp } from "../../../redux/action/siginup.action";
import { strictRouteAction } from "../../../redux/action/strictRoute.action";


function EmployerSettings() {

    const dispatch = useDispatch();

    const user = useSelector(({ employerSignUp }) => {
        return employerSignUp?.employerDetails?.employerDetails;
    });

    const location = useLocation();


    const [activeOption, setActiveOption] = useState("Account Preference");
    const [model, setModel] = useState(0);
    const [modell, setModell] = useState(0);
    const [modelv, setModelv] = useState(0);
    const [modeln, setModeln] = useState(0);

    const handleOptionClick = (option) => {
        setActiveOption(option);
        setModel(0);
        setModell(0);
        setModelv(0);
        setModeln(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const [selectLanguage, setSelectLanguage] = useState("English");
    const [selectedValuevm, setSelectedValuevm] = useState(null);
    const [selectedValuevp, setSelectedValuevp] = useState(null);
    const [selectedValuevb, setSelectedValuevb] = useState(null);
    const [selectedValuevc, setSelectedValuevc] = useState(null);
    const [selectedValueva, setSelectedValueva] = useState(null);
    const [selectedValueasc, setSelectedValueasc] = useState(null);
    const [selectedValueasp, setSelectedValueasp] = useState(null);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("")

    const validatePhoneNumber = (input) => {
        const numericValue = input.replace(/\D/g, '');
        console.log(numericValue);
        // Update the state
        setPhoneNumber(numericValue);
    }
    const navigate = useNavigate();

    // const handleGenerateOTP = useMemo(() => {
    //     return async () => {
    //         if (phoneNumber.length !== 10) {
    //             toast.error("Please enter a 10-digit number");
    //         }
    //         else {
    //             await dispatch(generateOtp(phoneNumber));
    //             navigate("/otpverify");
    //             Cookies.set("phoneNumber", phoneNumber);
    //         }
    //     };
    // }, [dispatch, phoneNumber]);

    const handleLanguage = (e) => {
        setModel(0);
        // setModell(0);
        // setModelv(0);
        // setModeln(0);
        setSelectLanguage(e.target.value);
    };

    const handleRadioAccountProfile = (value) => {
        setModel(0);

        setSelectedValueasp(value);

        // Log boolean values based on the selected radio button

        let profileVisiility = {
            noOne: value === "No one",
            yourFriends: value === "Your Friends",
            allSissoMembers: value === "All sisso members",
        };
        console.log("profileVisiility:", profileVisiility);
    };
    const handleRadioAccountContact = (value) => {
        setModel(0);

        setSelectedValueasc(value);

        let ShowConatctTo = {
            noOne: value === "No one",
            yourFriends: value === "Your Friends",
            allSissoMembers: value === "All sisso members",
        };
        console.log("ShowConatctTo:", ShowConatctTo);
    };

    const handleRadioMode = (value) => {
        setModelv(0);

        setSelectedValuevm(value);
        let ModeOfColour = {
            dark: value === "Dark",
            light: value === "Light",
            normal: value === "Normal",
        };
        console.log("ModeOfColour:", ModeOfColour);
    };
    const handleRadioProfile = (e) => {
        setModelv(0);
        const value = e.target.value;
        setSelectedValuevp(value);

        let profilePic = {
            noOne: value === "No one",
            yourFriends: value === "Your Friends",
            allSissoMembers: value === "All sisso members",
        };
        console.log("profilePic:", profilePic);
    };

    const handleRadioBannerImage = (value) => {
        setModelv(0);
        setSelectedValuevb(value);

        let BannerShow = {
            noOne: value === "No one",
            yourFriends: value === "Your Friends",
            allSissoMembers: value === "All sisso members",
        };
        console.log("BannerShow:", BannerShow);
    };
    const handleRadioCertificationInformation = (value) => {
        setModelv(0);

        setSelectedValuevc(value);

        let CertificateInfo = {
            noOne: value === "No one",
            yourFriends: value === "Your Friends",
            allSissoMembers: value === "All sisso members",
        };
        console.log("CertificateInfo:", CertificateInfo);
    };
    const handleRadioAvailableDates = (value) => {
        setModelv(0);

        setSelectedValueva(value);

        let AvailableDates = {
            noOne: value === "No one",
            yourFriends: value === "Your Friends",
            allSissoMembers: value === "All sisso members",
        };
        console.log("AvailableDates:", AvailableDates);
    };
    const handdleProfileNavigate = () => {
        if (location.pathname.startsWith("/employerDashboard/settings")) {
            navigate("/employerprofile")
        }
        else if (location.pathname.startsWith("/trainerDashboard/settings")) {
            navigate("/trainerprofile")
        }
        else {
            return null
        }
    }
    const handleSignOut = () => {

        Cookies.remove('token')
        window.location.reload()
    }

    return (
        <div className="trainer-settings">
            <div className="main-setting">
                <div className="settings">
                    <button
                        className={activeOption === "Account Preference" ? "active" : ""}
                        onClick={() => handleOptionClick("Account Preference")}
                    >
                        Account Preference
                    </button>
                    <button
                        className={activeOption === "Login and Security" ? "active" : ""}
                        onClick={() => handleOptionClick("Login and Security")}
                    >
                        Login and Security
                    </button>
                    <button
                        className={activeOption === "Visibility" ? "active" : ""}
                        onClick={() => handleOptionClick("Visibility")}
                    >
                        Visibility
                    </button>
                    <button
                        className={activeOption === "Notification" ? "active" : ""}
                        onClick={() => handleOptionClick("Notification")}
                    >
                        Notification
                    </button>
                </div>
                {model === 0 ? (
                    <div className="content-settings">
                        <div className="account-preference">
                            {activeOption === "Account Preference" && (
                                <div>
                                    <div className="border1 flex flex-col ">
                                        <h4
                                            style={{
                                                color: "#263128",
                                                paddingLeft: "20px",
                                                paddingRight: "12px",
                                                paddingTop: "10px",
                                            }}
                                        >
                                            Profile Information
                                        </h4>
                                        <div onClick={handdleProfileNavigate} className="settings-para">
                                            <p
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    height: "60px",
                                                    paddingLeft: "20px",
                                                    paddingRight: "10px",
                                                }}
                                            >
                                                Name, Occupation, Company, skills, certification &
                                                Contact Information{" "}
                                                <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                            </p>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="border2">
                                        <h4
                                            style={{
                                                color: "#263128",
                                                paddingLeft: "20px",
                                                paddingTop: "10px",
                                            }}
                                        >
                                            General Preference
                                        </h4>
                                        <div className="settings-para">
                                            <p
                                                onClick={() => {
                                                    setModel(1);
                                                }}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    height: "60px",
                                                    alignItems: "center",
                                                    paddingLeft: "20px",
                                                    paddingRight: "10px",
                                                }}
                                            >
                                                <p style={{ marginBottom: "10px" }}>Language</p>{" "}
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        gap: "10px",
                                                        color: "#b6b6b6",
                                                    }}
                                                >
                                                    <div>{selectLanguage}</div>
                                                    <div>
                                                        {" "}
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </div>
                                                </span>
                                            </p>
                                        </div>

                                        <hr />
                                        <div className="settings-para">
                                            <p
                                                onClick={() => {
                                                    setModel(2);
                                                }}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    height: "60px",
                                                    alignItems: "center",
                                                    paddingLeft: "20px",
                                                    margin: "auto",
                                                    paddingRight: "10px",
                                                }}
                                            >
                                                Showing Profile
                                                <button
                                                    style={{
                                                        display: "inline-flex",
                                                        gap: "10px",
                                                        color: "#b6b6b6",
                                                    }}
                                                >
                                                    <div>{selectedValueasp}</div>
                                                    <div>
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </div>
                                                </button>
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="settings-para">
                                            {" "}
                                            <p
                                                onClick={() => {
                                                    setModel(3);
                                                }}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    height: "60px",
                                                    alignItems: "center",
                                                    paddingLeft: "20px",
                                                    paddingRight: "10px",
                                                }}
                                            >
                                                <p>Show contact Information</p>
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        gap: "10px",
                                                        color: "#b6b6b6",
                                                    }}
                                                >
                                                    <div>{selectedValueasc}</div>
                                                    <div>
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </div>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {modell === 0 ? (
                            <div className="login-and-security">
                                {" "}
                                {activeOption === "Login and Security" && (
                                    <div>
                                        <div className="border2">
                                            <h4
                                                style={{
                                                    padding: "10px",
                                                    paddingLeft: "20px",
                                                    color: "#263128",
                                                }}
                                            >
                                                Account Access
                                            </h4>
                                            <div className="settings-para">
                                                <div>
                                                    <p
                                                        onClick={() => {
                                                            setModell(1);
                                                        }}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            height: "60px",
                                                            alignItems: "center",
                                                            color: "#535353",
                                                            paddingLeft: "20px",
                                                            paddingRight: "10px",
                                                        }}
                                                    >
                                                        Mobile And Email
                                                        <p
                                                            style={{
                                                                color: "#B6B6B6",
                                                                gap: "10px",
                                                                display: "inline-flex",
                                                            }}
                                                        >
                                                            {user?.contactInfo?.primaryNumber}

                                                            <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                        </p>
                                                    </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="settings-para">
                                                <p
                                                    onClick={() => {
                                                        setModell(2);
                                                    }}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    Activated Devices
                                                    <button
                                                        style={{
                                                            color: "#B6B6B6",
                                                            gap: "10px",
                                                            display: "inline-flex",
                                                        }}
                                                    >
                                                        02
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </button>
                                                </p>
                                            </div>
                                            <hr />
                                            <div className="settings-para">
                                                <p
                                                    onClick={() => {
                                                        setModell(3);
                                                    }}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    Close Account
                                                    <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                        {modelv === 0 ? (
                            <div className="visibility">
                                {activeOption === "Visibility" && (
                                    <div>
                                        <div className="border1">
                                            <h4 style={{ paddingLeft: "20px", paddingTop: "10px" }}>
                                                Display
                                            </h4>
                                            <div className="settings-para">
                                                {" "}
                                                <p
                                                    onClick={() => setModelv(1)}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    <div> Mode </div>
                                                    <div>
                                                        {selectedValuevm}
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </div>
                                                </p>
                                            </div>
                                        </div>{" "}
                                        <br />
                                        <div className="border2">
                                            <div>
                                                <h4 style={{ paddingLeft: "20px", paddingTop: "10px" }}>
                                                    Visibility of your Profile
                                                </h4>
                                                <div className="settings-para">
                                                    <p
                                                        onClick={() => setModelv(2)}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            height: "60px",
                                                            alignItems: "center ",
                                                            paddingLeft: "20px",
                                                            paddingRight: "10px",
                                                        }}
                                                    >
                                                        <div>Profile Image</div>
                                                        <div style={{ display: "flex", gap: "10px" }}>
                                                            {selectedValuevp}
                                                            <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="settings-para">
                                                {" "}
                                                <p
                                                    onClick={() => setModelv(3)}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    <div> Banner Image</div>
                                                    <button style={{ display: "flex", gap: "10px" }}>
                                                        {" "}
                                                        {selectedValuevb}
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </button>
                                                </p>
                                            </div>
                                            <hr />
                                            <div className="settings-para">
                                                <p
                                                    onClick={() => setModelv(4)}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    <div>Certication Information</div>
                                                    <div style={{ display: "flex", gap: "10px" }}>
                                                        {selectedValuevc}
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </div>
                                                </p>
                                            </div>
                                            <hr />
                                            <div className="settings-para">
                                                {" "}
                                                <p
                                                    onClick={() => setModelv(5)}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    <div>Available Dates</div>
                                                    <div style={{ display: "flex", gap: "10px" }}>
                                                        {selectedValueva}
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                        {modeln === 0 ? (
                            <div className="notification">
                                {activeOption === "Notification" && (
                                    <div>
                                        <div className="border2">
                                            <h4 style={{ paddingLeft: "20px", paddingTop: "10px" }}>
                                                Notification You Recieve
                                            </h4>
                                            <div className="settings-para">
                                                <p
                                                    onClick={() => setModeln(1)}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center ",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    Messages <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                </p>
                                            </div>
                                            <hr />
                                            <div className="settings-para">
                                                {" "}
                                                <p
                                                    onClick={() => setModeln(2)}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    Update profile
                                                    <button>
                                                        <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                    </button>
                                                </p>
                                            </div>
                                            <hr />
                                            <div className="settings-para">
                                                <p
                                                    onClick={() => setModeln(3)}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    News And Reports
                                                    <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                </p>
                                            </div>
                                            <hr />
                                            <div className="settings-para">
                                                {" "}
                                                <p
                                                    onClick={() => setModeln(4)}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: "60px",
                                                        alignItems: "center",
                                                        paddingLeft: "20px",
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    proposal{" "}
                                                    <ArrowForwardIos sx={{ color: "#b6b6b6" }} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : null}
                {model === 1 ? (
                    <Stack direction={"column"} spacing={1.5} className="right-settings">
                        <button
                            style={{
                                color: "#888888",
                                display: "flex",
                                gap: "5px",
                                marginTop: "10px",
                            }}
                            onClick={() => {
                                setModel(0);
                            }}
                        >
                            <ArrowBackIcon />
                            Back{" "}
                        </button>{" "}
                        <Stack spacing={1} sx={{ position: "relative", left: "5px" }}>
                            <p className=" font-medium text-[#535353]">
                                Select the language you used on Sisso
                            </p>

                            <div className="pb-[10px]">
                                <select
                                    onChange={handleLanguage}
                                    name=""
                                    id=""
                                    style={{
                                        border: "1px solid #cecece",
                                        width: "239px",
                                        height: "30px",
                                        paddingLeft: "10px",
                                        borderRadius: "2px",
                                        outline: "none",
                                        fontWeight: "600px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Kannada">Kannada</option>
                                    <option value="Spanish">Spanish</option>
                                </select>
                            </div>
                        </Stack>
                    </Stack>
                ) : null}
                {model === 2 ? (
                    <div className="right-settings">
                        <button
                            className="radios"
                            onClick={() => {
                                setModel(0);
                            }}
                            style={{
                                position: "relative",
                                right: "5px",
                                marginBottom: "10px",
                                marginTop: "10px",
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <ArrowBackIcon />
                            Back
                        </button>
                        <h4 style={{ color: "#535353", marginBottom: "10px" }}>
                            Show your profile
                        </h4>
                        <Stack direction={""} spacing={""} sx={{ marginBottom: "20px" }}>
                            <form>
                                {/* <label htmlFor="profileVisiility"> */}
                                <label
                                    htmlFor="No one"
                                    className={`radios ${selectedValueasp === "No one" ? "selected" : ""
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="profileVisiility"
                                        id="No one"
                                        value="No one"
                                        onChange={() => handleRadioAccountProfile("No one")}
                                        checked={selectedValueasp === "No one"}
                                    />
                                    No one
                                </label>

                                <label
                                    htmlFor="Your Friends"
                                    className={`radios ${selectedValueasp === "Your Friends" ? "selected" : ""
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="profileVisiility"
                                        id="Your Friends"
                                        value="Your Friends"
                                        onChange={() => handleRadioAccountProfile("Your Friends")}
                                        checked={selectedValueasp === "Your Friends"}
                                    />
                                    Your Friends
                                </label>
                                <label
                                    htmlFor="All sisso members"
                                    className={`radios ${selectedValueasp === "All sisso members" ? "selected" : ""
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="profileVisiility"
                                        value="All sisso members"
                                        id="All sisso members"
                                        onChange={() =>
                                            handleRadioAccountProfile("All sisso members")
                                        }
                                        checked={selectedValueasp === "All sisso members"}
                                    />
                                    All sisso members
                                </label>
                            </form>
                        </Stack>
                    </div>
                ) : null}
                {model === 3 ? (
                    <div className="right-settings">
                        <button
                            className="radios"
                            onClick={() => {
                                setModel(0);
                            }}
                            style={{
                                position: "relative",
                                right: "5px",
                                marginBottom: "10px",
                                marginTop: "10px",
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <ArrowBackIcon />
                            Back
                        </button>
                        {/* <br /> */}
                        <h4 style={{ color: "#535353", marginBottom: "10px" }}>
                            Show your contact information
                        </h4>{" "}
                        {/* <br /> */}
                        <Stack
                            direction={"column"}
                            spacing={""}
                            sx={{ marginBottom: "20px" }}
                        >
                            <label
                                htmlFor="No one"
                                className={`radios ${selectedValueasc === "No one" ? "selected" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="ShowContactTo"
                                    value="No one"
                                    id="No one"
                                    onChange={() => handleRadioAccountContact("No one")}
                                    checked={selectedValueasc === "No one"}
                                />
                                No one
                            </label>

                            <label
                                htmlFor="Your Friends"
                                className={`radios ${selectedValueasc === "Your Friends" ? "selected" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="ShowContactTo"
                                    value="Your Friends"
                                    id="Your Friends"
                                    onChange={() => handleRadioAccountContact("Your Friends")}
                                    checked={selectedValueasc === "Your Friends"}
                                />
                                Your Friends
                            </label>

                            <label
                                htmlFor="All sisso members"
                                className={`radios ${selectedValueasc === "All sisso members" ? "selected" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="ShowContactTo"
                                    value="All sisso members"
                                    id="All sisso members"
                                    onChange={() =>
                                        handleRadioAccountContact("All sisso members")
                                    }
                                    checked={selectedValueasc === "All sisso members"}
                                />
                                All sisso members
                            </label>
                        </Stack>
                    </div>
                ) : null}
            </div>

            {modell === 1 ? (
                <div className="right-settings ">
                    <button
                        className="radios"
                        onClick={() => {
                            setModell(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back{" "}
                    </button>{" "}
                    <form action="">
                        <Stack
                            direction={"column"}
                            spacing={1}
                            sx={{ marginBottom: "20px" }}
                        >

                            <h4>If you want change registered mobile no</h4>
                            <p style={{ display: "flex", gap: "5px" }}>
                                {user?.contactInfo?.primaryNumber}

                                <span style={{ color: "#2676c2" }}>Verified</span>
                            </p>
                            <h4
                                style={{ color: "#535353", fontSize: "18px", fontWeight: 400 }}
                            >
                                New Number
                            </h4>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <form action="">
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => validatePhoneNumber(e.target.value)}
                                        placeholder="Enter Mobile number"
                                        style={{
                                            width: "25rem",
                                            height: "2.5rem",
                                            flexShrink: 0,
                                            border: "1px solid rgba(185, 185, 185, 1)",
                                            outline: "none",
                                            padding: "15px",
                                        }}
                                        maxLength={10}
                                        minLength={10}
                                    />
                                    <span
                                        style={{
                                            fontWeight: 500,
                                            color: "#2676c2",
                                            position: "relative",
                                            right: "70px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            onClick={() => {
                                                navigate('/settingOtpVerify');
                                                dispatch(generateOtp(phoneNumber));
                                                dispatch(strictRouteAction(true))
                                                Cookies.set("contactDetails", phoneNumber);

                                            }}
                                        >
                                            Get otp
                                        </button>
                                    </span>
                                </form>
                            </div>
                        </Stack>
                    </form>
                    <form action="">
                        <Stack
                            direction={"column"}
                            spacing={1}
                            sx={{ marginBottom: "20px" }}
                        >

                            <h4>If you want change registered Email Id</h4>
                            <p style={{ display: "flex", gap: "5px" }}>
                                {user?.contactInfo?.email}

                                <span style={{ color: "#2676c2" }}>Verified</span>
                            </p>
                            <h4
                                style={{ color: "#535353", fontSize: "18px", fontWeight: 400 }}
                            >
                                New Email Id
                            </h4>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <form action="">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Email Id"
                                        style={{
                                            width: "25rem",
                                            height: "2.5rem",
                                            flexShrink: 0,
                                            border: "1px solid rgba(185, 185, 185, 1)",
                                            outline: "none",
                                            padding: "15px",
                                        }}
                                     
                                    />
                                    <span
                                        style={{
                                            fontWeight: 500,
                                            color: "#2676c2",
                                            position: "relative",
                                            right: "70px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            onClick={() => {
                                                navigate('/settingOtpVerify');
                                                dispatch(strictRouteAction(true))
                                                dispatch(generateOtp(email));
                                                Cookies.set("contactDetails", email);

                                            }}
                                        >
                                            Get otp
                                        </button>
                                    </span>
                                </form>
                            </div>
                        </Stack>
                    </form>
                </div>
            ) : (
                ""
            )}
            {modell === 2 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModell(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back
                    </button>
                    <Stack sx={{ marginBottom: "20px" }}>
                        <h4 style={{ marginBottom: "10px" }}>
                            This profile activated in 2 devices
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <p className="radios" style={{}}>
                                Samsung GanaXy @9
                            </p>
                            <p
                                className="hovering"
                                style={{
                                    color: "#2676c2",
                                    fontSize: "14px",
                                    marginRight: "10px",
                                }}
                            >
                                Deactivate
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <p className="radios">Samsung GanaXy @9</p>
                            <p
                                className="hovering"
                                style={{
                                    color: "#2676c2",
                                    fontSize: "14px",
                                    marginRight: "10px",
                                }}
                            >
                                Deactivate
                            </p>
                        </div>
                    </Stack>
                </div>
            ) : (
                ""
            )}
            {modell === 3 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModell(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back{" "}
                    </button>
                    <h4 style={{ marginBottom: "10px" }}>Close account</h4>
                    <h4 style={{ marginBottom: "10px" }}>
                        Surely , If u want to close your sisso account
                    </h4>
                    <Stack
                        direction={"row"}
                        spacing={2}
                        sx={{ marginBottom: "20px" }}
                    // style={{
                    //   display: "flex",
                    //   justifyContent: "space-around",
                    //   alignItems: "flex-start",
                    // }}
                    >
                        <button className="button1" onClick={handleSignOut} >Sign Out</button>
                        <button className="button2" onClick={() => { setModell(0) }}>Cancel</button>
                    </Stack>
                    <span></span>
                </div>
            ) : (
                ""
            )}

            {modelv === 1 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModelv(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back{" "}
                    </button>
                    <h4 style={{ marginBottom: "10px" }}>
                        If u want To change mode of colour
                    </h4>
                    <Stack
                        direction={"column"}
                        spacing={""}
                        sx={{ marginBottom: "20px" }}
                    >
                        <label
                            htmlFor="Dark"
                            className={`radios ${selectedValuevm === "Dark" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="ModeOfColour"
                                value="Dark"
                                id="Dark"
                                onChange={() => handleRadioMode("Dark")}
                                checked={selectedValuevm === "Dark"}
                            />
                            Dark
                        </label>

                        <label
                            htmlFor="Light"
                            className={`radios ${selectedValuevm === "Light" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="ModeOfColour"
                                value="Light"
                                id="Light"
                                onChange={() => handleRadioMode("Light")}
                                checked={selectedValuevm === "Light"}
                            />
                            Light
                        </label>

                        <label
                            htmlFor="Normal"
                            className={`radios ${selectedValuevm === "Normal" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="ModeOfColour"
                                value="Normal"
                                id="Normal"
                                onChange={() => handleRadioMode("Normal")}
                                checked={selectedValuevm === "Normal"}
                            />
                            Normal
                        </label>
                    </Stack>
                </div>
            ) : (
                ""
            )}
            {modelv === 2 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModelv(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back{" "}
                    </button>
                    <h4 style={{ marginBottom: "10px" }}>Profile picture privacy</h4>
                    <div className="flex flex-col mb-[20px]">
                        <label
                            htmlFor="profilepic"
                            className="flex flex-col"
                            onChange={handleRadioProfile}
                        >
                            <label
                                htmlFor="No one"
                                className={`radios ${selectedValuevp === "No one" ? "selected" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="profilePic"
                                    value="No one"
                                    id="No one"
                                    checked={selectedValuevp === "No one"}
                                // checked= {`selectedValuevp == "No one" ? ${true} : ${false}`}
                                />
                                No one
                            </label>

                            <label
                                htmlFor="Your Friends"
                                className={`radios ${selectedValuevp === "Your Friends" ? "selected" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="profilePic"
                                    value="Your Friends"
                                    id="Your Friends"
                                    // checked= {`selectedValuevp == "Your Friends" ? ${true} : ${false}`}
                                    checked={selectedValuevp === "Your Friends"}
                                />
                                Your Friends
                            </label>

                            <label
                                htmlFor="All sisso members"
                                className={`radios ${selectedValuevp === "All sisso members" ? "selected" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="profilePic"
                                    value="All sisso members"
                                    id="All sisso members"
                                    checked={selectedValuevp === "All sisso members"}
                                // checked= {`selectedValuevp == "All sisso member" ? ${true} :  ${false}`}
                                />
                                All sisso members
                            </label>
                        </label>
                    </div>
                </div>
            ) : (
                ""
            )}
            {modelv === 3 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModelv(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back{" "}
                    </button>{" "}
                    <h4 style={{ marginBottom: "10px" }}>Banner images</h4>
                    <Stack
                        direction={"column"}
                        spacing={""}
                        sx={{ marginBottom: "20px" }}
                    >
                        <label
                            htmlFor="No one"
                            className={`radios ${selectedValuevb === "No one" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="BannerShow"
                                value="No one"
                                id="No one"
                                onChange={() => handleRadioBannerImage("No one")}
                                checked={selectedValuevb === "No one"}
                            />
                            No one
                        </label>

                        <label
                            htmlFor="Your Friends"
                            className={`radios ${selectedValuevb === "Your Friends" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="BannerShow"
                                value="Your Friends"
                                id="Your Friends"
                                onChange={() => handleRadioBannerImage("Your Friends")}
                                checked={selectedValuevb === "Your Friends"}
                            />
                            Your Friends
                        </label>

                        <label
                            htmlFor=""
                            className={`radios ${selectedValuevb === "All sisso members" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="BannerShow"
                                value="All sisso members"
                                id="All sisso members"
                                onChange={() => handleRadioBannerImage("All sisso members")}
                                checked={selectedValuevb === "All sisso members"}
                            />
                            All sisso members
                        </label>
                    </Stack>
                </div>
            ) : (
                ""
            )}
            {modelv === 4 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModelv(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back{" "}
                    </button>

                    <h4 style={{ marginBottom: "10px" }}>
                        Who are all see your certification
                    </h4>
                    <Stack
                        direction={"column"}
                        spacing={""}
                        sx={{ marginBottom: "20px" }}
                    >
                        <label
                            htmlFor="No one"
                            className={`radios ${selectedValuevc === "No one" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="CertificateInfo"
                                value="No one"
                                id="No one"
                                onChange={() => handleRadioCertificationInformation("No one")}
                                checked={selectedValuevc === "No one"}
                            />
                            No one
                        </label>

                        <label
                            htmlFor="Your Friends"
                            className={`radios ${selectedValuevc === "Your Friends" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="CertificateInfo"
                                value="Your Friends"
                                id="Your Friends"
                                onChange={() =>
                                    handleRadioCertificationInformation("Your Friends")
                                }
                                checked={selectedValuevc === "Your Friends"}
                            />
                            Your Friends
                        </label>

                        <label
                            htmlFor="All sisso members"
                            className={`radios ${selectedValuevc === "All sisso members" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="CertificateInfo"
                                value="All sisso members"
                                id="All sisso members"
                                onChange={() =>
                                    handleRadioCertificationInformation("All sisso members")
                                }
                                checked={selectedValuevc === "All sisso members"}
                            />
                            All sisso members
                        </label>
                    </Stack>
                </div>
            ) : (
                ""
            )}
            {modelv === 5 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModelv(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back{" "}
                    </button>
                    <h4 style={{ marginBottom: "10px" }}>
                        Who are all see your available dates
                    </h4>
                    <Stack
                        direction={"column"}
                        spacing={""}
                        sx={{ marginBottom: "20px" }}
                    >
                        <label
                            htmlFor="No one"
                            className={`radios ${selectedValueva === "No one" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="AvailableDates"
                                value="No one"
                                id="No one"
                                onChange={() => handleRadioAvailableDates("No one")}
                                checked={selectedValueva === "No one"}
                            />
                            No one
                        </label>

                        <label
                            htmlFor="Your Friends"
                            className={`radios ${selectedValueva === "Your Friends" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="AvailableDates"
                                value="Your Friends"
                                id="Your Friends"
                                onChange={() => handleRadioAvailableDates("Your Friends")}
                                checked={selectedValueva === "Your Friends"}
                            />
                            Your Friends
                        </label>

                        <label
                            htmlFor="All sisso members"
                            className={`radios ${selectedValueva === "All sisso members" ? "selected" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="AvailableDates"
                                value="All sisso members"
                                id="All sisso members"
                                onChange={() => handleRadioAvailableDates("All sisso members")}
                                checked={selectedValueva === "All sisso members"}
                            />
                            All sisso members
                        </label>
                    </Stack>
                </div>
            ) : (
                ""
            )}

            {modeln === 1 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModeln(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back
                    </button>
                    <h4 style={{ marginBottom: "10px" }}>
                        If you want change message notification
                    </h4>
                    <Stack direction={"row"} spacing={2} sx={{ marginBottom: "20px" }}>
                        <button className="button1">Don't Show</button>
                        <button className="button2">Show</button>
                    </Stack>
                </div>
            ) : (
                ""
            )}

            {modeln === 2 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModeln(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back
                    </button>

                    <h4 style={{ marginBottom: "10px" }}>
                        If You want change update profile notification
                    </h4>
                    <Stack direction={"row"} spacing={2} sx={{ marginBottom: "20px" }}>
                        <button className="button1">Don't Show</button>
                        <button className="button2">Show</button>
                    </Stack>
                </div>
            ) : (
                ""
            )}
            {modeln === 3 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModeln(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back
                    </button>

                    <h4 style={{ marginBottom: "10px" }}>
                        If You want change new & report notification
                    </h4>
                    <Stack direction={"row"} spacing={2} sx={{ marginBottom: "20px" }}>
                        <button className="button1">Don't Show</button>
                        <button className="button2">Show</button>
                    </Stack>
                </div>
            ) : (
                ""
            )}
            {modeln === 4 ? (
                <div className="right-settings">
                    <button
                        className="radios"
                        onClick={() => {
                            setModeln(0);
                        }}
                        style={{
                            position: "relative",
                            right: "5px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <ArrowBackIcon />
                        Back
                    </button>
                    <p style={{ marginBottom: "10px" }}>
                        If you want change proposal notification
                    </p>
                    <Stack direction={"row"} spacing={2} sx={{ marginBottom: "20px" }}>
                        <button className="button1">Don't Show</button>
                        <button className="button2">Show</button>
                    </Stack>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default EmployerSettings;
