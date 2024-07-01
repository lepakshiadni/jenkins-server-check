import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { generateOtp } from "../../redux/action/siginup.action";
import { useNavigate } from "react-router-dom";
import "../styles/generateotp.css";
import HeaderImg from "../assets/HeaderBg.png";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Dropdown from "../utils/Dropdown";
import GitHubIcon from "@mui/icons-material/GitHub";
import SliderSignin from "../utils/LoginCarousel";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { strictRouteAction } from "../../redux/action/strictRoute.action";

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


function Signup() {
  // const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const [contactDetails, setContactDetails] = useState({
    value: '',
    errorMessage: ''
  });
  const [isShrunk, setIsShrunk] = useState(false)
  const [loginMethod, setLoginMethod] = useState('phone')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector(({ generateOTP }) => {
    return generateOTP;
  });
  console.log(message)

  const [isGenerating, setIsGenerating] = useState(false);

  const handleEnterValue = (e) => {
    const { value } = e.target;

    let errorMessage = '';
    if (loginMethod === 'phone') {
      const phoneRegex = /^\d{10}$/;
      const onlyNumbersRegex = /^\d*$/;

      if (!onlyNumbersRegex.test(value)) {
        // Prevent non-numeric input
        return;
      }

      if (!phoneRegex.test(value)) {
        errorMessage = 'Please enter a valid 10-digit phone number';
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
      }
    }

    setContactDetails({
      value,
      errorMessage
    });
  };


  const handleGenerateOTP = () => {
    if (isGenerating) return; // Prevent multiple requests
    setIsGenerating(true); // Disable the button

    const { value } = contactDetails;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (emailRegex.test(value) || phoneRegex.test(value)) {
      // Dispatch the action to generate OTP
      dispatch(generateOtp(value))
        .then(() => {
          Cookies.set("contactDetails", value);
          setIsGenerating(false); // Re-enable the button after successful OTP generation
        })
        .catch(() => {
          setIsGenerating(false); // Re-enable the button in case of an error
        });
    } else {
      setContactDetails(prevState => ({
        ...prevState,
        errorMessage: 'Please enter a valid email address or phone number'
      }));
      setIsGenerating(false); // Re-enable the button
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerateOTP();
    }
  };

  useEffect(() => {
    if (message.message) {
      setIsShrunk(true);
      dispatch(strictRouteAction(true));
      setTimeout(() => {
        navigate("/otpverify");
      }, [1000]);
    }
  }, [message.message, navigate]);


  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'phone' ? 'email' : 'phone');
    setContactDetails({ value: '', errorMessage: '' }); // Reset input field and error message when toggling
  };

  useEffect(() => {
    // Disable autocomplete after component mounts
    const inputField = document.getElementById('unique-contact-details');
    if (inputField) {
      inputField.setAttribute('autocomplete', 'off');
      inputField.setAttribute('autocomplete', 'new-password'); // Try setting it to 'new-password' as well
    }
  }, []);


  return (

    <div className={`sigin-page-parent ${isShrunk ? 'shrink' : ''}`}>
      <div className="login-section bg-[#2676C2]   w-full">

        <div className="h-[100px]  px-5 py-3  md:flex md:items-center md:justify-between md:px-20 md:py-5">
          <div className=" ">
            <img className="h-10 w-24 md:h-[4.5rem] md:w-[12rem]" src={HeaderImg} alt="" />
          </div>
          <div className="header-right hidden   md:flex md:items-center gap-3 md:gap-10">
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
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className=" ">
              <Dropdown />
            </div>
          </div>
        </div>

        <div className="login-body   bg-[#fff] w-[88%] md:h-[380px] md:w-[90%] ml-4 md:ml-12 lg:ml-16 mt-3 rounded-sm">
          <div className="body-container flex flex-col-reverse md:flex md:flex-row md:items-center md:h-full md:w-full ">
            <div className="login-inputs  flex flex-col items-start gap-3 md:gap-8 py-2 px-5 ml-5 md:ml-0 md:py-3 lg:py-8 md:px-8 lg:px-8 h-full w-[80%] md:w-[37%]">
              <div className="">
                <h1 className="text-[#2676C2] text-[1.3rem] md:text-[1.625rem] font-[600]">Welcome To SISSOO</h1>
              </div>
              <div className=" w-full flex flex-col gap-2">
                <label className="text-[1.4rem] text-[#2676C2] font-[600]" htmlFor="">Login :</label>
                {contactDetails.errorMessage && (
                  <span className="text-red-700 text-sm">{contactDetails.errorMessage}</span>
                )}
                <div>
                  <input
                    onChange={handleEnterValue}
                    value={contactDetails.value}
                    onKeyDown={(e) => handleKeyPress(e)}
                    name={`contactDetails_${Math.random().toString(36).substr(2, 9)}`}
                    className="login-input w-full focus:outline-[#2676C2] text-[#2676c2] font-[400] placeholder:text-[#8888] p-3 md:p-5 border-2 border-[#b9b9b9] text-[14px] md:text-[1.2rem] rounded-md"
                    type={loginMethod === 'phone' ? 'tel' : 'email'}
                    placeholder={`Enter ${loginMethod === 'phone' ? 'Phone Number' : 'Email'}...`}
                    id="unique-contact-details"
                    style={{ border: '2px solid #b9b9b9' }}
                  />
                  <a className="flex justify-end text-[#2676C2] mt-1">
                    <span className="cursor-pointer hover:underline" onClick={toggleLoginMethod}>Login with {loginMethod === 'phone' ? 'Email' : 'Phone Number'}</span>
                  </a>
                </div>
              </div>
              <div className="w-full mb-3">
                <button
                  onClick={handleGenerateOTP} disabled={isGenerating}
                  className="bg-[#2676C2] w-full text-[#fff] p-3 md:p-5 rounded-sm"
                >
                  {isGenerating ? "Generating OTP..." : "GET OTP"}
                </button>

              </div>
            </div>
            <div className="login-carousel w-full md:w-[63%] md:mr-5 rounded-sm">
              <SliderSignin />
            </div>
          </div>
        </div>

        <div className="login-footer">
          <div className="parent-signin">
            <div className="line-parent flex items-center justify-center mt-3">
              <hr className="w-[400px] mr-3" />
              <span className="line-para text-white">Or With</span>
              <hr className="w-[400px] ml-3" />
            </div>
          </div>

          <div className="icon-parent flex items-center justify-center gap-8 mt-3">
            <div className=""   >
              <ZoomableMailOutlineIcon sx={{ color: "#FFFFFF80", fontSize: "3rem" }} />
            </div>
            <div>
              <GitHubIcon
                className="hover:fill-[#ffff] transform transition-transform duration-300 hover:scale-125  "
                sx={{ color: "#FFFFFF80", fontSize: "3rem" }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;