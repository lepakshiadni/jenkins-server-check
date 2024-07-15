
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const Dropdown = () => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  // const countries = ["French", "Spanish", "German", "Italian", "Chinese"];

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setOpen(!open)}
        className={`
          bg-[#2676C2]
          w-[189px] h-[49px]
          ring ring-offset-[-2px]
          font-normal text-base ring-white 
          flex items-center justify-around
          leading-6
          rounded-sm
          
          hover:bg-white hover:text-[#2676C2] hover:cursor-pointer 
          ${open ? "bg-white text-[#2676C2]" : "bg-[#2676c2] text-white"}`}
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
              stroke="#2676C2"
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
      {/* {open && (
        <ul className="absolute bg-white text-[#7B7B7B] w-[190px] z-[3]">
          {countries?.map((country) => (
            <li
              key={country}
              className={`p-2 text-sm ${
                country?.toLowerCase() === selected?.toLowerCase()
                  ? "text-[#7B7B7B] text-[16px] hover:bg-[#e3e3e3] hover:cursor-pointer"
                  : "hover:bg-[#e3e3e3] hover:cursor-pointer"
              }`}
              onClick={() => {
                setSelected(country);
                setOpen(false);
                setInputValue("");
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default Dropdown;

