import '../../../styles/HelpPage.css'
import { useState } from 'react'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const HelpPage3 = () => {

    const [selectedOption, setSelectedOption] = useState(0);

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    const getContentBasedOnOption = () => {
        switch (selectedOption) {
            case 0:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Finding the Best Trainers on Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>To discover the best trainers for your needs, follow these steps: </p>
                            <div className="ml-[11px]">
                                <ol className='space-y-2 list-decimal'>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Post Your Requirement:</span> Begin by posting your training requirement. This helps attract trainers who match your needs. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Search in Trainer List:</span> Navigate to the Trainer List, where you'll find multiple trainer profiles. Utilize search filters to narrow down the list based on location and skills. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Sort by Availability:</span> Once you've identified potential trainers, sort them based on availability to find those who can accommodate your schedule. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Review Trainer Details:</span> Dive into each trainer's profile to view their years of experience in various skills, the number of training sessions they've conducted, and any certifications they hold. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Dashboard:</span> In the dashboard, you can conveniently find and manage applicants who have applied for your training requirement. </li>
                                </ol>
                            </div>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>By following these steps, you can effectively evaluate trainers and select the best fit for your training requirements. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            {/* <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
                                Sissoo provides networking tools designed to enhance your professional
                                and personal relationships.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Completing Your Profile on Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>To ensure that trainers can easily connect with you, follow these steps to complete your profile: </p>
                            <div className="ml-[11px] ">
                                <ol className='space-y-2 list-decimal'>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Access Your Profile:</span> In the right corner of the header, click on your profile name and select the "View Profile" option. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Complete Basic Details:</span> Within your profile, locate the "Please complete the basic details" section and fill out all the required fields. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Provide Required Information:</span> Make sure to fill in all the necessary information to give trainers a comprehensive understanding of your requirements and preferences. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Connect with Trainers:</span> Once your profile is complete, trainers can easily check your profile and connect with you directly based on your specified criteria. </li>
                                </ol>
                            </div>

                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>By completing your profile, you enhance your visibility to trainers and streamline the process of connecting with them for your training needs.  </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
                                Sissoo provides networking tools designed to enhance your professional
                                and personal relationships.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            // case 2:
            //     return (
            //         <div>
            //             <div style={{ width: '500px', marginLeft: '19px', marginTop: "30px" }}>
            //                 <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>What is Sissoo, and how can it benefit me?3</h1>
            //                 <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo is not just an app; it's your personalized gateway to a more
            //                     organized and connected life. Designed with you in mind, Sissoo is a
            //                     versatile platform that seamlessly integrates various aspects of your daily
            //                     routines, making every interaction more efficient and enjoyable.</p>
            //                 <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1>
            //                 <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo simplifies the way you manage tasks, appointments, and
            //                     communication. With a user-friendly interface, it transforms chaos into a
            //                     well-organized flow.</p>
            //                 <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1>
            //                 <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
            //                     Sissoo provides networking tools designed to enhance your professional
            //                     and personal relationships.</p>
            //                 <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1>
            //             </div>              </div>
            //     );
            default:
                return null;
        }
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
            <div>
                <div style={{ fontSize: '16px', fontWeight: '400', color: '#1E1E1E', display: 'flex', alignItems: 'center', cursor: 'pointer', margin: "10px 0px" }} onClick={() => { window.history.back() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                        <path d="M16 7.57143L0.999999 7.57143M0.999999 7.57143L7.42857 14M0.999999 7.57143L7.42857 1.14286" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 style={{ marginLeft: '10px' }} >Back</h3>
                </div>

                <div className='helppage'>
                    <div className="helpContainer">
                        <div className={`helpOptions ${selectedOption === 0 ? 'selected' : ''}`} onClick={() => handleOptionClick(0)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to find best trainers? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 1 ? 'selected' : ''}`} onClick={() => handleOptionClick(1)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to create an employer profile? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        {/* <div className={`helpOptions ${selectedOption === 2 ? 'selected' : ''}`} onClick={() => handleOptionClick(2)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>Is Sissoo available for both iOS and Android devices?</h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '420px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='helpContent' style={{ marginLeft: '20px' }}>
                {getContentBasedOnOption()}
            </div>
        </div>
    );
}

export default HelpPage3;