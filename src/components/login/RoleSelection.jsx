import React from "react";
import { BiChevronDown } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Data } from "../slider/Data";
import { Badge } from "@mui/material";
import "../styles/RoleSelection.css";
import LOGO from "../assets/Header_Logo_RS.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { employerAction, trainerAction } from '../../redux/action/roleselection.action'

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const countries = ["French", "Spanish", "German", "Italian", "Chinese"];
  let dispatch = useDispatch();

  let roleSelection = useSelector(({ roleSelection }) => {
    return roleSelection
  })
  
  console.log(roleSelection)

  if (selected === 'employer') {
    dispatch(employerAction())
    localStorage.setItem('role', 'employer');
    navigate('/employersignup');
  }
  else if (selected === 'trainer') {
    localStorage.setItem('role', 'trainer');
    dispatch(trainerAction())
    navigate('/trainersignup')
  }

  return (
    <div className="RSMain">
      <div className="RSHead">
        <img src={LOGO} alt="Header_Logo" />
        <div className="Help">
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
          <div className="relative inline-block z-10 mt-0">
            <div
              onClick={() => setOpen(!open)}
              className={`
                w-[189px] h-[49px]
                ring ring-offset-[-2px]
                font-normal text-base ring-[#ffff] 
                leading-6
                flex items-center justify-around
               hover:bg-[#ffff] hover:text-[#2676c2] hover:cursor-pointer 
                ${open
                  ? "bg-[#fff] text-[#2676c2]"
                  : "bg-currentcolor text-[#fff]"
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
                    stroke="#2676c2"
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
              <ul className="absolute bg-white text-[#7B7B7B] w-[190px]">
                {countries?.map((country) => (
                  <li
                    key={country}
                    className={`p-2 text-sm ${country?.toLowerCase() === selected?.toLowerCase()
                        ? "text-[#7B7B7B] text-[16px] hover:bg-[#e3e3e3] hover:cursor-pointer"
                        : "hover:bg-[#e3e3e3] hover:cursor-pointer"
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
      <div className="RSRole">
        <div className="Select_Role">
          <h2>
            Select Your Role!
            <br />
           for Targeted Interactions,
          </h2>
          <div className="Unlock SvgHover"
            onClick={() => { setSelected('employer') }}
          >
            <Badge>
              <svg
                width="65"
                height="54"
                viewBox="0 0 65 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.1488 9.34C23.1488 7.49273 23.6966 5.68693 24.7229 4.15098C25.7492 2.61502 27.2079 1.41789 28.9146 0.710969C30.6212 0.00404668 32.4992 -0.180916 34.311 0.17947C36.1227 0.539856 37.787 1.4294 39.0932 2.73563C40.3994 4.04185 41.289 5.70608 41.6493 7.51786C42.0097 9.32964 41.8248 11.2076 41.1179 12.9143C40.4109 14.6209 39.2138 16.0796 37.6778 17.1059C36.1419 18.1322 34.3361 18.68 32.4888 18.68C30.0117 18.68 27.636 17.696 25.8844 15.9444C24.1328 14.1928 23.1488 11.8171 23.1488 9.34ZM53.1488 18.8C54.7141 18.802 56.2448 18.3395 57.5471 17.4711C58.8495 16.6027 59.8649 15.3674 60.4648 13.9217C61.0647 12.4759 61.2222 10.8846 60.9173 9.3493C60.6124 7.81398 59.8589 6.40363 58.752 5.2968C57.6452 4.18996 56.2348 3.4364 54.6995 3.13151C53.1642 2.82662 51.5729 2.98411 50.1272 3.58404C48.6814 4.18396 47.4461 5.19936 46.5777 6.50168C45.7093 7.80401 45.2468 9.3347 45.2488 10.9C45.2501 11.9396 45.4564 12.9687 45.8557 13.9286C46.2551 14.8884 46.8397 15.7601 47.5762 16.4938C48.3127 17.2275 49.1866 17.8089 50.148 18.2046C51.1093 18.6003 52.1392 18.8026 53.1788 18.8H53.1488ZM11.7988 2.99C10.2357 2.98805 8.70695 3.44929 7.40572 4.31549C6.1045 5.1817 5.0891 6.41402 4.48772 7.85688C3.88634 9.29974 3.72595 10.8884 4.0268 12.4224C4.32765 13.9563 5.07625 15.3667 6.17809 16.4755C7.27992 17.5843 8.68558 18.3418 10.2176 18.6524C11.7496 18.9629 13.3393 18.8125 14.7859 18.2203C16.2325 17.628 17.4712 16.6204 18.3456 15.3246C19.22 14.0289 19.6909 12.5032 19.6988 10.94C19.7041 9.89873 19.5037 8.86666 19.1092 7.903C18.7146 6.93935 18.1337 6.06308 17.3997 5.32445C16.6658 4.58583 15.7932 3.9994 14.832 3.5988C13.8709 3.19819 12.8401 2.99131 11.7988 2.99ZM53.1788 22.6C50.9897 22.5575 48.8223 23.041 46.8588 24.01C47.5436 24.8076 48.1466 25.6719 48.6588 26.59C51.9688 32.59 50.4988 41.51 48.7188 47.89H61.1288C61.1288 47.89 66.9188 34.16 63.2988 27.66C60.3788 22.4 53.9088 22.6 53.1788 22.6ZM11.7988 22.6C11.0688 22.6 4.59882 22.4 1.67882 27.66C-1.94118 34.16 3.84882 47.94 3.84882 47.94H16.2588C14.4788 41.56 13.0088 32.6 16.3188 26.64C16.831 25.7219 17.434 24.8576 18.1188 24.06C16.1597 23.0737 13.9921 22.573 11.7988 22.6ZM32.4888 22.2C31.5788 22.2 23.4888 21.95 19.8188 28.54C16.2388 34.97 20.0188 47.07 21.7488 51.85C21.9709 52.4391 22.3676 52.9463 22.8859 53.3037C23.4042 53.6612 24.0192 53.8518 24.6488 53.85H40.3288C40.9584 53.8518 41.5735 53.6612 42.0917 53.3037C42.61 52.9463 43.0067 52.4391 43.2288 51.85C44.9588 47.07 48.7388 34.94 45.1588 28.54C41.4888 21.94 33.3988 22.2 32.4888 22.2Z"
                  fill="#2676C2"
                />
              </svg>
            </Badge>

            <div className="Inspire" >
              <h3> Employer Access Request </h3>
              <p>
                Lead team growth effortlessly as an <br />
                Employer with sissoo Training
              </p>
            </div>

          </div>

          <div
            className="Unlock SvgHover"
            onClick={() => { setSelected('trainer') }}
          >
            <Badge>
              <svg
                width="65"
                height="56"
                viewBox="0 0 65 56"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M21.869 42.6072C21.869 39.92 19.9986 38.5728 17.7002 38.5728H14.8818C16.7306 37.632 17.9994 35.7168 17.9994 33.504C18.0002 30.3696 15.4498 27.8184 12.3146 27.8184C9.17861 27.8184 6.62741 30.3696 6.62741 33.504C6.62741 35.7168 7.89861 37.632 9.74581 38.5728H6.92741C4.62741 38.5728 2.75781 39.92 2.75781 42.6072V43.0888H21.869V42.6072Z"
                    fill="#2676C2"
                  />
                  <path
                    id="Vector_2"
                    d="M22.1427 43.8278H21.8683V43.8262H2.75708H2.48428C1.38348 43.8262 0.488281 44.7214 0.488281 45.823L2.08508 53.5494C2.10988 54.6294 2.99468 55.5022 4.08108 55.5022H20.5467C21.6331 55.5022 22.5179 54.6286 22.5419 53.5494L24.1315 45.9038L24.1395 45.8222C24.1387 44.7214 23.2419 43.8278 22.1427 43.8278Z"
                    fill="#2676C2"
                  />
                  <path
                    id="Vector_3"
                    d="M50.0947 38.5728H47.2779C44.9795 38.5728 43.1099 39.92 43.1099 42.6072V43.0888H62.2219V42.6072H62.2203C62.2203 39.92 60.3507 38.5728 58.0515 38.5728H55.2339C57.0811 37.632 58.3507 35.7168 58.3507 33.504C58.3523 30.3696 55.8011 27.8184 52.6675 27.8184C49.5299 27.8184 46.9811 30.3696 46.9811 33.504C46.9787 35.7168 48.2475 37.6328 50.0947 38.5728Z"
                    fill="#2676C2"
                  />
                  <path
                    id="Vector_4"
                    d="M62.4932 43.8278H62.2196V43.8262H43.1084H42.834C41.7332 43.8262 40.8364 44.7214 40.8364 45.823L42.4348 53.5494C42.4596 54.6294 43.346 55.5022 44.43 55.5022H60.8948C61.9812 55.5022 62.8676 54.6286 62.8908 53.5494L64.4796 45.9038L64.4884 45.823C64.4884 44.7214 63.5932 43.8278 62.4932 43.8278Z"
                    fill="#2676C2"
                  />
                  <path
                    id="Vector_5"
                    d="M21.9637 38.7964L23.3037 23.126V38.798H41.6757V23.1244L43.0165 38.7964L45.7997 37.0012C45.7981 37.0012 46.8773 22.2724 46.1613 18.1596C45.4445 14.0508 35.6605 12.8516 35.6605 12.8516H32.4901H32.4885H29.3173C29.3173 12.8516 19.5309 14.0508 18.8173 18.1596C18.1005 22.2724 19.1797 37.0012 19.1797 37.0012L21.9637 38.7964Z"
                    fill="#2676C2"
                  />
                  <path
                    id="Vector_6"
                    d="M32.4885 12.1792C35.8517 12.1792 38.5781 9.45279 38.5781 6.0896C38.5781 2.72641 35.8517 0 32.4885 0C29.1253 0 26.3989 2.72641 26.3989 6.0896C26.3989 9.45279 29.1253 12.1792 32.4885 12.1792Z"
                    fill="#2676C2"
                  />
                </g>
              </svg>
            </Badge>

            <div className="Inspire">
              <h3>  Trainer Access Request </h3>
              <p>
                Shape learning as a Trainer with <br />
                sissoo crafting engaging courses.
              </p>
            </div>
          </div>
        </div>

        <div className="RSCarousel">
          <Slider
            autoplay
            autoplaySpeed={2500}
            dots={false}
            arrows={false}
            fade={true}
            infinite
          >
            {Data.map((item) => (
              <img className="SliderImg" src={item} alt="SliderImages" />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
