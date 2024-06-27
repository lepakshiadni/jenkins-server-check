import React from 'react'
import { Link } from 'react-router-dom'
import { CircularProgressbar } from "react-circular-progressbar";



function ProfileComplition({ trigger, setTrigger }) {
    const role=localStorage.getItem('role')
    console.log('role',role)
    React.useEffect(() => {
        const interval = setInterval(() => {
            //   setValue(calculateCompletionPercentage);
            const element1 = document.getElementById("element1");
            const element2 = document.getElementById("element2");
            const element3 = document.getElementById("element3");

            element1?.classList.add("animated1");
            element2?.classList.add("animated2");
            element3?.classList.add("animated3");
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return trigger ? (
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-[#00000080] z-[50000] flex justify-center items-center'>
            <div className='bg-[#ffff] w-[600px] h-[400px] rounded-[20px] p-[17px]'>
                <div className=''>
                    <h4 className='text-[#535353] font-[Poppins] font-semibold'>Profile Complition </h4>
                    <div className='flex justify-between '>
                        <div className='m-[25px] flex flex-col gap-2 '>
                            <Link to={`/${role}profile/profileupdate/basic-information`} className='hover:underline decoration-[#2676c2] hover:text-[#2676c2] flex gap-3 justify-start items-center'>
                                Profile Image Update <span><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="#CACACA"
                                >
                                    <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="7.5"
                                        fill="#CACACA"
                                    />
                                    <path
                                        d="M3 7.68201L6.18198 10.864L12.5453 4.5"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg></span>
                            </Link>

                            <Link to={`/${role}profile/profileupdate`} className='hover:underline decoration-[#2676c2] hover:text-[#2676c2] flex gap-3 justify-start items-center'>
                                Banner Image Update <span><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="#CACACA"
                                >
                                    <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="7.5"
                                        fill="#CACACA"
                                    />
                                    <path
                                        d="M3 7.68201L6.18198 10.864L12.5453 4.5"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg></span>
                            </Link>
                            <Link to={`/${role}profile/profileupdate`} className='hover:underline decoration-[#2676c2] hover:text-[#2676c2] flex gap-3 justify-start items-center'>
                                Skill Update <span><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="#CACACA"
                                >
                                    <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="7.5"
                                        fill="#CACACA"
                                    />
                                    <path
                                        d="M3 7.68201L6.18198 10.864L12.5453 4.5"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg></span>
                            </Link>
                            <Link to={`/${role}profile/profileupdate`} className='hover:underline decoration-[#2676c2] hover:text-[#2676c2] flex gap-3 justify-start items-center'>
                                Contact Update <span><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="#CACACA"
                                >
                                    <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="7.5"
                                        fill="#CACACA"
                                    />
                                    <path
                                        d="M3 7.68201L6.18198 10.864L12.5453 4.5"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg></span>
                            </Link>
                            <Link to={`/${role}profile/profileupdate`} className='hover:underline decoration-[#2676c2] hover:text-[#2676c2] flex gap-3 justify-start items-center'>
                                Experience Update <span><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="#CACACA"
                                >
                                    <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="7.5"
                                        fill="#CACACA"
                                    />
                                    <path
                                        d="M3 7.68201L6.18198 10.864L12.5453 4.5"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg></span>
                            </Link>
                            <Link to={`/${role}profile/profileupdate`} className='hover:underline decoration-[#2676c2] hover:text-[#2676c2] flex gap-3 justify-start items-center'>
                                Post Training <span><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="#CACACA"
                                >
                                    <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="7.5"
                                        fill="#CACACA"
                                    />
                                    <path
                                        d="M3 7.68201L6.18198 10.864L12.5453 4.5"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg></span>
                            </Link>


                        </div>
                        <div className='bg-[#2676c2] w-[50%] rounded-sm'>
                            {/* <h4>Processing</h4> */}
                            <div>
                                <div className="">
                                    <h4
                                        className="flex justify-center"
                                        style={{
                                            color: "#FFFFFF",
                                            fontSize: "20px",
                                            fontWeight: "400",
                                        }}
                                    >
                                        Processing
                                    </h4>
                                    <div
                                        style={{
                                            width: "50%",
                                            //   height: "260px",
                                            margin: "auto",
                                            position: "relative",
                                            background: "#2676C2",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        <CircularProgressbar
                                            value={0}
                                            text={`${0}%`}
                                            strokeWidth={4}
                                            styles={{
                                                root: { position: "absolute" },
                                                path: {
                                                    stroke: `${0 > 95 ? 'rgba(245, 247, 246)' : 'rgba(255, 255, 255, 0.6)'}`,
                                                    strokeWidth: 4,
                                                    transition: "stroke-dashoffset 2s ease-in-out",
                                                    height: "100px", // Adjust the height as needed
                                                    fill: "",
                                                },
                                                trail: {
                                                    stroke: "rgb(231 246 255 / 27%)",
                                                    strokeWidth: 4,
                                                    height: "100px", // Adjust the height as needed
                                                },
                                                text: {
                                                    fill: "#FFF",
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                },

                                            }}
                                        />
                                    </div>
                                    <span className="animate1" id="element1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="36"
                                            height="36"
                                            viewBox="0 0 36 36"
                                            fill="none"
                                        >
                                            <circle opacity="0.1" cx="18" cy="18" r="18" fill="white" />
                                        </svg>
                                    </span>
                                    <span className="animate2" id="element2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                        >
                                            <circle opacity="0.3" cx="9" cy="9" r="9" fill="white" />
                                        </svg>
                                    </span>
                                    <span className="animate3" id="element3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="6"
                                            height="6"
                                            viewBox="0 0 6 6"
                                            fill="none"
                                        >
                                            <circle opacity="0.2" cx="3" cy="3" r="3" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex justify-around items-center mt-[30px]  '>
                    <button onClick={() => setTrigger(!trigger)} className='w-[160px] h-[40px] bg-[#ffff] border border-stone-400 hover:bg-[#2676c2] hover:text-[#ffff] rounded-[10px]'>
                        Skip
                    </button>
                    <Link to={`/${role}profile/profileupdate/basic-information`}>
                        <button className='w-[160px] h-[40px] bg-[#2676c2] text-[#ffff] rounded-[10px]'>
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
        :
        null

}

export default ProfileComplition