import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TrainerVisibility() {
    const [visibility, setVisiblity] = useState(null);
    const [mode, setMode] = useState("Default");
    const [profileImg, setProfileImg] = useState("Public");
    const [bannerImg, setBannerImg] = useState("Public");
    const [certification, setCertification] = useState("Public");
    const [dates, setDates] = useState("Public");

    const renderVisibilitySub = () => {
        switch (visibility) {
            case "mode":
                return (
                    <div className="mode-sub p-3">
                        <button
                            onClick={() => setVisiblity(null)}
                            className="text-blue-500 cursor-pointer"
                        >
                            <span>
                                <ArrowBackIcon />
                            </span>{" "}
                            <span>Back</span>
                        </button>
                        <div className="mt-5">
                            <p>Switch Modes</p>
                            <div className="flex flex-col items-start gap-5 mt-2">
                                <div className="flex mt-2 items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Dark"}
                                        onChange={(e) => {
                                            setMode(e.target.value);
                                        }}
                                        checked={mode === "Dark"}
                                        id="dark"
                                        type="radio"
                                    />
                                    <label htmlFor="dark">Dark mode</label>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <input
                                        className="h-4 w-4"
                                        value={"Light"}
                                        onChange={(e) => {
                                            setMode(e.target.value);
                                        }}
                                        checked={mode === "Light"}
                                        id="light"
                                        type="radio"
                                    />
                                    <label htmlFor="light">Light mode</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Default"}
                                        onChange={(e) => {
                                            setMode(e.target.value);
                                        }}
                                        checked={mode === "Default"}
                                        id="default"
                                        type="radio"
                                    />
                                    <label htmlFor="default">Default mode</label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "profileImg":
                return (
                    <div className="mode-sub p-3">
                        <button
                            onClick={() => setVisiblity(null)}
                            className="text-blue-500 cursor-pointer"
                        >
                            <span>
                                <ArrowBackIcon />
                            </span>{" "}
                            <span>Back</span>
                        </button>
                        <div className="mt-5">
                            <p>Who can see your profile pic</p>
                            <div className="flex items-start flex-col gap-5 mt-2">
                                <div className="flex mt-2 items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Private"}
                                        onChange={(e) => {
                                            setProfileImg(e.target.value);
                                        }}
                                        checked={profileImg === "Private"}
                                        id="noone"
                                        type="radio"
                                    />
                                    <label htmlFor="noone">No one</label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Friends"}
                                        onChange={(e) => {
                                            setProfileImg(e.target.value);
                                        }}
                                        checked={profileImg === "Friends"}
                                        id="friends"
                                        type="radio"
                                    />
                                    <label htmlFor="friends">Friends</label>
                                </div>

                                <div className="flex items-center gap-2 ">
                                    <input
                                        className="h-4 w-4"
                                        value={"Public"}
                                        onChange={(e) => {
                                            setProfileImg(e.target.value);
                                        }}
                                        checked={profileImg === "Public"}
                                        id="Sissoo"
                                        type="radio"
                                    />
                                    <label htmlFor="Sissoo">Members on SISSOO</label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "bannerImg":
                return (
                    <div className="mode-sub p-3">
                        <button
                            onClick={() => setVisiblity(null)}
                            className="text-blue-500 cursor-pointer"
                        >
                            <span>
                                <ArrowBackIcon />
                            </span>{" "}
                            <span>Back</span>
                        </button>
                        <div className="mt-5">
                            <p>Who can see your banner pic</p>
                            <div className="flex items-start flex-col gap-5 mt-2">
                                <div className="flex mt-2 items gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Private"}
                                        onChange={(e) => {
                                            setBannerImg(e.target.value);
                                        }}
                                        checked={bannerImg === "Private"}
                                        id="noone"
                                        type="radio"
                                    />
                                    <label htmlFor="noone">No one</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Friends"}
                                        onChange={(e) => {
                                            setBannerImg(e.target.value);
                                        }}
                                        checked={bannerImg === "Friends"}
                                        id="friends"
                                        type="radio"
                                    />
                                    <label htmlFor="friends">Friends</label>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <input
                                        className="h-4 w-4"
                                        value={"Public"}
                                        onChange={(e) => {
                                            setBannerImg(e.target.value);
                                        }}
                                        checked={bannerImg === "Public"}
                                        id="Sissoo"
                                        type="radio"
                                    />
                                    <label htmlFor="Sissoo">Members on SISSOO</label>

                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "certification":
                return (
                    <div className="mode-sub p-3">
                        <button
                            onClick={() => setVisiblity(null)}
                            className="text-blue-500 cursor-pointer"
                        >
                            <span>
                                <ArrowBackIcon />
                            </span>{" "}
                            <span>Back</span>
                        </button>
                        <div className="mt-5">
                            <p>Who can see your certification information</p>
                            <div className="flex flex-col items-start gap-5 mt-2">
                                <div className="flex mt-2 items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Private"}
                                        onChange={(e) => {
                                            setCertification(e.target.value);
                                        }}
                                        checked={certification === "Private"}
                                        id="noone"
                                        type="radio"
                                    />
                                    <label htmlFor="noone">No one</label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Friends"}
                                        onChange={(e) => {
                                            setCertification(e.target.value);
                                        }}
                                        checked={certification === "Friends"}
                                        id="friends"
                                        type="radio"
                                    />
                                    <label htmlFor="friends">Friends</label>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <input
                                        className="h-4 w-4"
                                        value={"Public"}
                                        onChange={(e) => {
                                            setCertification(e.target.value);
                                        }}
                                        checked={certification === "Public"}
                                        id="Sissoo"
                                        type="radio"
                                    />
                                    <label htmlFor="Sissoo">Members on SISSOO</label>
                                </div>

                            </div>
                        </div>
                    </div>
                );
            case "dates":
                return (
                    <div className="mode-sub p-3">
                        <button
                            onClick={() => setVisiblity(null)}
                            className="text-blue-500 cursor-pointer"
                        >
                            <span>
                                <ArrowBackIcon />
                            </span>{" "}
                            <span>Back</span>
                        </button>
                        <div className="mt-5">
                            <p>Who can see your available dates</p>
                            <div className="flex flex-col items-start gap-5 mt-2">
                                <div className="flex mt-2 items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Private"}
                                        onChange={(e) => {
                                            setDates(e.target.value);
                                        }}
                                        checked={dates === "Private"}
                                        id="noone"
                                        type="radio"
                                    />
                                    <label htmlFor="noone">No one</label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        className="h-4 w-4"
                                        value={"Friends"}
                                        onChange={(e) => {
                                            setDates(e.target.value);
                                        }}
                                        checked={dates === "Friends"}
                                        id="friends"
                                        type="radio"
                                    />
                                    <label htmlFor="friends">Friends</label>
                                </div>

                                <div className="flex items-center gap-2 ">
                                    <input
                                        className="h-4 w-4"
                                        value={"Public"}
                                        onChange={(e) => {
                                            setDates(e.target.value);
                                        }}
                                        checked={dates === "Public"}
                                        id="Sissoo"
                                        type="radio"
                                    />
                                    <label htmlFor="Sissoo">Members on SISSOO</label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
                        <div className="visibility-section w-full  ">
                            <div className="visibility-display w-full border-[0.5px]  border-[#eeeeee] h-[111px]">
                                <div className="visibility-head p-3 h-[50%] flex items">
                                    <h3 className="text-[18px] text-[#535353] ">Display</h3>
                                </div>
                                <hr className='border-[0.5px] border-[#eeeeee]' />

                                <div
                                    onClick={() => {
                                        setVisiblity("mode");
                                    }}
                                    className="visibility-mode cursor-pointer  p-3 h-[50%] hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between"
                                >
                                    <p className="text-[14px] text-[#535353] w-[70%]">Mode</p>
                                    <span className="text-[16px] ml-[25rem] text-[#a2a2a2] text-end w-[20%]">
                                        {mode}
                                    </span>
                                    <div className="w-[10%]">
                                        <NavigateNextIcon
                                            sx={{ color: "gray", fontSize: "30px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-visibility mt-5 border-[0.5px]  border-[#eeeeee]">
                                <div className="profile-head p-3">
                                    <h3 className="text-[18px] text-[#535353] ">
                                        Visibility of your profile
                                    </h3>
                                </div>
                                <hr className='border-[0.5px] border-[#eeeeee]' />

                                <div className="profile-settings ">
                                    <div
                                        onClick={() => {
                                            setVisiblity("profileImg");
                                        }}
                                        className="profile-image p-3 h-[55px] cursor-pointer  hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between"
                                    >
                                        <p className="text-[14px] text-[#535353] w-[70%]">
                                            Profile Image
                                        </p>
                                        <span className="text-[16px] ml-[25rem] text-[#a2a2a2] w-[20%] text-end">
                                            {profileImg}
                                        </span>

                                        <div className="w-[10%]">
                                            <NavigateNextIcon
                                                sx={{ color: "gray", fontSize: "30px" }}
                                            />
                                        </div>
                                    </div>
                                    <hr className='border-[0.5px] border-[#eeeeee]' />

                                    <div
                                        onClick={() => {
                                            setVisiblity("bannerImg");
                                        }}
                                        className="profile-banner  p-3 h-[55px] cursor-pointer  hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between"
                                    >
                                        <p className="text-[14px] text-[#535353] w-[70%]">
                                            Banner Image
                                        </p>
                                        <span className="text-[16px] ml-[25rem] text-[#a2a2a2] w-[20%] text-end">
                                            {bannerImg}
                                        </span>

                                        <div className="w-[10%]">
                                            <NavigateNextIcon
                                                sx={{ color: "gray", fontSize: "30px" }}
                                            />
                                        </div>
                                    </div>
                                    <hr className='border-[0.5px] border-[#eeeeee]' />

                                    <div
                                        onClick={() => {
                                            setVisiblity("certification");
                                        }}
                                        className="profile-certification cursor-pointer   p-3 h-[55px] hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between"
                                    >
                                        <p className="text-[14px] text-[#535353] w-[70%]">
                                            Certification information
                                        </p>
                                        <span className="text-[16px] ml-[25rem] text-[#a2a2a2] w-[20%] text-end">
                                            {certification}
                                        </span>

                                        <div className="w-[10%]">
                                            <NavigateNextIcon
                                                sx={{ color: "gray", fontSize: "30px" }}
                                            />
                                        </div>
                                    </div>
                                    <hr className='border-[0.5px] border-[#eeeeee]' />

                                    <div
                                        onClick={() => {
                                            setVisiblity("dates");
                                        }}
                                        className="profile-dates  p-3 h-[55px] cursor-pointer  hover:bg-[#f6f6f6] hover:w-full flex items-center justify-between"
                                    >
                                        <p className="text-[14px] text-[#535353] w-[70%]">
                                            Available Dates
                                        </p>
                                        <span className="text-[16px] ml-[25rem] text-[#a2a2a2] w-[20%] text-end">
                                            {dates}
                                        </span>

                                        <div className="w-[10%]">
                                            <NavigateNextIcon
                                                sx={{ color: "gray", fontSize: "30px" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
        }
    };
    return (
        <>
            <div className="">{renderVisibilitySub()}</div>
        </>
    );
}

export default TrainerVisibility;
