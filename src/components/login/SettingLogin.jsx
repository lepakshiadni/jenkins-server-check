import React, { useEffect, useState, useMemo, useRef } from "react";
// import "../styles/otpverify.css"; // Import your CSS file
import '../styles/OtpVerify.css'
import HeaderLogo from "../assets/Header_logo.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderSignin from "../utils/LoginCarousel";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { generateOtp } from "../../redux/action/siginup.action";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { BiChevronDown } from "react-icons/bi";
import { employerDetails, employerPhoneUpdate } from "../../redux/action/employers.action";
import { trainerDetails, trainerPhoneUpdate } from "../../redux/action/trainer.action";
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { styled } from "@mui/material";


const ZoomableMailOutlineIcon = styled(MailRoundedIcon)`
  color: #ffff;
  background-color: #ffffff80;
  fill: #2676c3;
  font-size: 3.60rem;
  border-radius: 50%;
  padding: 10px;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    background-color 0.2s ease-in-out;
  &:hover {
    transform: scale(1.3);
    background-color: #ffff;
  }
`;

const SettingLogin = () => {
    const [validotp, setOtp] = useState(["", "", "", ""]);
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    // const countries = ["French", "English", "Spanish", "German", "Italian"];
    const [initialTimer, setInitialTimer] = useState(120);
    const [disableResend, setDisableResend] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hasError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const inputRefs = useRef([]);

    const employer = useSelector(({ employerSignUp }) => {
        return employerSignUp?.employerDetails;
    });
    const trainer = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.trainerDetails;
    });

    const contactDetails = useState(Cookies.get("contactDetails"));
    const OldEmpPhone = employer?.employerDetails?.contactInfo?.primaryNumber;
    const OldEmpEmail = employer?.employerDetails?.contactInfo?.email;

    const OldTrainerPhone = trainer?.trainerDetails?.contactInfo?.primaryNumber;
    const OldTrainerEmail = trainer?.trainerDetails?.contactInfo?.email;

    useEffect(() => {
        dispatch(employerDetails())
        dispatch(trainerDetails())
    }, [dispatch])

    const startInitialTimer = () => {
        if (initialTimer > 0) {
            setTimeout(() => {
                setInitialTimer((prevTime) => prevTime - 1);
            }, 1000); // Update the timer after 1 second
        }
    };
    useEffect(() => {
        startInitialTimer();
    }, [initialTimer]);

    useEffect(() => {
        if (initialTimer === 0) {
            setDisableResend(false);
        }
    }, [initialTimer]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        // Check if the input is a digit
        if (/^\d$/.test(value)) {
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });
            // Move to the next input box if a digit is entered
            if (index < validotp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        } else if (value === '') {
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = '';
                return newOtp;
            });
        }
    };

    const handleVerifyOTP = useMemo(() => {
        return async (e) => {
            // e.preventDefault()
            const otp = validotp.join("");
            console.log(otp, contactDetails[0]);
            if (otp.length !== 4) {
                setError(true)
                setErrorMessage('Enter 4 Digit Otp')
            } else if (!contactDetails[0]) {

                setError(true)
                setErrorMessage("Phone number not found")
            }
            else if (employer?.employerDetails?.role === "employer") {
                const oldContactInfo = contactDetails[0].includes('@') ?
                    (OldEmpEmail) : (OldEmpPhone);
                await dispatch(employerPhoneUpdate(contactDetails[0], oldContactInfo, otp))
                setOtpVerified(true);
            }
            else if (trainer?.trainerDetails?.role === "trainer") {
                const oldContactInfo = contactDetails[0].includes('@') ?
                    (OldTrainerEmail) : (OldTrainerPhone);
                await dispatch(trainerPhoneUpdate(contactDetails[0], oldContactInfo, otp))
                setOtpVerified(true);
            }

        };

    }, [dispatch, contactDetails, validotp]);

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = '';
                return newOtp;
            });
            // If the current input box is empty, move focus to the previous input box
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        } else if (index === validotp.length - 1 && e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior of Enter key
            console.log('Handling verify OTP');
            handleVerifyOTP();
        }
    };
    useEffect(() => {

        if (employer?.message === 'User Details Not Found') {
            toast.error(employer?.message)
            navigate("/employerDashboard/settings");
        }
        if (employer?.message === 'Contact Details Already Used') {
            toast.error(employer?.message)
            navigate("/employerDashboard/settings");
        }
        if (
            employer?.message === "Employer Contact Details Updated SuccessFully" &&
            employer?.employerDetails?.role === "employer"
        ) {
            toast.success(employer?.employerDetails?.role, {
                style: { backgroundColor: "#4CAF90", color: "#ffffff" },
            });

            localStorage.setItem("role", employer?.employerDetails?.role);
            navigate("/employerDashboard/settings"); // Navigate to the next page
        }
        if (employer?.message === "Invalid Otp") {
            // Handle invalid OTP case if needed
            toast.error(employer?.message);
            navigate("/employerDashboard/settings");
        }

        if (trainer?.message === 'User Details Not Found') {
            toast.error(trainer?.message)
            navigate("/trainerDashboard/settings");
        }
        if (trainer?.message === 'Contact Details Already Used') {
            toast.error(trainer?.message)
            navigate("/trainerDashboard/settings");
        }
        if (
            trainer?.message === "Trainer Contact Details Updated SuccessFully" &&
            trainer?.trainerDetails?.role === "trainer"
        ) {
            toast.success(trainer?.trainerDetails?.role, {
                style: { backgroundColor: "#4CAF90", color: "#ffffff" },
            });

            localStorage.setItem("role", trainer?.trainerDetails?.role);
            navigate("/trainerDashboard/settings"); // Navigate to the next page
        }
        if (trainer?.message === "Invalid Otp") {
            // Handle invalid OTP case if needed
            toast.error(trainer?.message);
            navigate("/trainerDashboard/settings");
        }


    }, [employer, trainer, navigate]);

    return (
        <>
            <div>
                <div className="header h-[100px] px-5 py-3  md:flex md:items-center md:justify-between gap-3 md:px-16 md:py-5">
                    <div className="otp-logo h-10 w-24   md:h-[4.5rem] md:w-[12rem]">
                        <img className='' src={HeaderLogo} alt="" />
                    </div>
                    <div className="header-right hidden mr-2 md:flex md:items-center gap-10 ">
                        <div className="">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"

                            >
                                <path
                                    id="Vector"
                                    d="M11.2441 11.1227C11.5288 10.2455 12.0503 9.46494 12.7513 8.86581C13.4524 8.26668 14.3063 7.87297 15.2171 7.72846C16.1279 7.58396 17.0604 7.694 17.9124 8.04671C18.7645 8.39943 19.5024 8.98124 20.0446 9.72721C20.5868 10.4732 20.9115 11.3543 20.9839 12.2736C21.0564 13.1929 20.8731 14.1146 20.4545 14.9364C20.0359 15.7581 19.399 16.4475 18.6127 16.9294C17.8264 17.4112 16.9222 17.6663 16 17.6663V19.3337M16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16C31 24.2843 24.2843 31 16 31ZM16.083 24.3333V24.5L15.917 24.5003V24.3333H16.083Z"
                                    stroke="#2676C2"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="language-drop">
                            <div
                                onClick={() => setOpen(!open)}
                                className={`
                md:w-[189px] md:h-[49px] w-[130px] h-8
                ring ring-offset-[-2px]
                font-normal text-base ring-[#2676c2] 
                md:leading-6
              
                flex items-center justify-around
               hover:bg-[#2676c2] hover:text-[#ffff] hover:cursor-pointer 
                ${open
                                        ? "bg-[#2676c2] text-[#ffff]"
                                        : "bg-[#ffff] text-[#2676c2]"
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
                                <BiChevronDown
                                    size={30}
                                    className={`${open && "rotate-180"}`}
                                />
                            </div>
                            {/* {open && (
                                <ul className=" absolute bg-[#2676c2] w-[130px] text-[#ffff] md:w-[190px] z-[3]">
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
                            )} */}

                        </div>
                    </div>
                </div>


                <div className="otp-body w-full ">
                    <div className="Recieve-page ml-3 p-1 md:ml-16 md:p-5 lg:p-0 lg:w-[90%] lg:h-[24rem] border-0  md:border-2 md:border-gray-200 flex flex-col-reverse  lg:flex lg:flex-row lg:items-center">
                        <div className="reciever-left w-[100%] mt-5 md:mt-0 md:w-[40%] ml-4 flex flex-col gap-2">
                            <h2 className="reciever-heading text-[#2676C2] text-[23px] font-[600]">
                                Trailblazer or Voyager,
                                <br />
                                Select Your Role!
                            </h2>
                            <p className="info-content text-gray-400 text-base my-3">
                                Enter the 4-digit OTP to verify your Sissoo Training <br />
                                App account, Resend if needed{" "}
                            </p>
                            <p>
                                {
                                    initialTimer > 0 ? (

                                        <span className="text-gray-400 text-[16px]">
                                            OTP Expires In :  <span className="text-[#2676C2] font-medium">{initialTimer} sec</span>
                                        </span>
                                    ) :
                                        (
                                            <span className="text-red-700">
                                                OTP Expired, Please Resend
                                            </span>
                                        )
                                }
                            </p>
                            <div className="otp-input-container flex flex-col gap-1 ">
                                {
                                    hasError ? (

                                        <span className="text-red-700 text-xs ml-[10px]">{errorMessage}</span>
                                    )
                                        :
                                        null
                                }
                                <div>
                                    {validotp.map((value, index) => (
                                        <input
                                            id={`otp-input-${index}`}
                                            key={index}
                                            type="tel"
                                            // max={1}
                                            maxLength={1}
                                            value={value}
                                            className="text-[#2676C2] text-center font-[1.5rem] ml-2"
                                            ref={el => inputRefs.current[index] = el}
                                            onChange={event => handleChange(event, index)}
                                            onKeyDown={event => handleKeyDown(event, index)}
                                            autoComplete="off"
                                        />
                                    ))}
                                </div>
                            </div>


                            <div className="w-full">
                                <button
                                    onClick={handleVerifyOTP}
                                    className="verify-otp-btn w-[40%] md:w-[90%] bg-[#2676C2] text-white p-3 rounded-sm"
                                >
                                    Verify
                                </button>
                            </div>
                            <div className="">
                                <p className="text-sm text-gray-400">If you haven't recieve the OTP ? <span className="text-base text-[#2676C2]">
                                    <Link
                                        href="#"
                                        style={{
                                            color: initialTimer > 0 ? "gray" : "#2676C2",
                                            cursor: initialTimer > 0 ? "not-allowed" : "pointer",
                                            fontWeight: "bold",
                                            textDecoration: "none",
                                            fontSize: "16px",
                                            marginLeft: "10px",
                                        }}
                                        onClick={() => {
                                            if (initialTimer === 0 && !disableResend) {
                                                dispatch(generateOtp(contactDetails[0]));
                                                setInitialTimer(120);
                                                setDisableResend(true);
                                                setOtp(["", "", "", ""]);
                                            }
                                        }}
                                        disabled={initialTimer > 0 || disableResend}
                                    >
                                        Resend
                                    </Link></span> </p>
                            </div>
                        </div>
                        <div className="Carousel hidden   w-[60%] md:block  items-start md:items-center md:justify-center pr-5 ">
                            <SliderSignin />
                        </div>
                    </div>

                    <div className="verify-page-footer">
                        <div className="parent-signin ">
                            <div className="line-parent flex items-center justify-center mt-3">
                                <hr className="w-[150px] md:w-[400px] mr-3" />
                                <span className="line-para text-[#2676C2] ">Or With</span>
                                <hr className=" w-[150px] md:w-[400px] ml-3" />
                            </div>
                        </div>

                        <div className="icon-parent flex items-center justify-center gap-8 mt-3">
                            <div className=""   >
                                <ZoomableMailOutlineIcon sx={{ color: "#2676C2", fontSize: "4.5rem" }} />
                            </div>
                            <div>
                                <GitHubIcon
                                    className="hover:fill-[#2676C2] transform transition-transform duration-300 hover:scale-125  "
                                    sx={{ color: "#2676C2", fontSize: "3.5rem" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingLogin;
