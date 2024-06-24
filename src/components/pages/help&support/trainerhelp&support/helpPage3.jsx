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
                        <div style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            {/* <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>What is Sissoo, and how can it benefit me?1</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>To ensure optimal training opportunities, trainers are advised to regularly update their availability dates, skill sets, and certifications.
                                Employers utilize this information to shortlist trainer profiles based on their availability and location.
                                Keeping these details up-to-date enhances the chances of being selected for training assignments. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo simplifies the way you manage tasks, appointments, and
                                communication. With a user-friendly interface, it transforms chaos into a
                                well-organized flow.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
                                Sissoo provides networking tools designed to enhance your professional
                                and personal relationships.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>              </div>
                );
            case 1:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            {/* <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>What is Sissoo, and how can it benefit me?2</h1> */}
                            <p style={{ fontSize: '20px', fontWeight: '600',color:'#696969',fontFamily:'Poppins' }}>To enhance your chances of receiving more training opportunities, it's essential to keep your profile updated.
                                Follow these steps: </p>
                            <div className='ml-[11px]'>
                                <ul className='list-decimal space-y-4'>
                                    <li style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>
                                        Click on the profile icon located in the top right corner of the website.
                                    </li>
                                    <li style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>
                                        Select 'View Profile' from the drop down menu.
                                    </li>
                                    <li style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>
                                        Navigate to the 'Basic Details' section within your profile.
                                    </li>
                                    <li style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>
                                        Complete all required details in this section.
                                    </li>
                                    <li style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>
                                        Click 'Submit' to save your updated profile.
                                        Updating your profile ensures it remains current and increases your visibility for potential training assignments.
                                    </li>

                                </ul>
                            </div>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            {/* <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo simplifies the way you manage tasks, appointments, and
                                communication. With a user-friendly interface, it transforms chaos into a
                                well-organized flow.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
                                Sissoo provides networking tools designed to enhance your professional
                                and personal relationships.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>              </div>
                );
            case 2:
                return (
                    <div>
                        <div style={{ width: '500px', marginLeft: '19px', marginTop: "30px" }}>
                            <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>What is Sissoo, and how can it benefit me?3</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo is not just an app; it's your personalized gateway to a more
                                organized and connected life. Designed with you in mind, Sissoo is a
                                versatile platform that seamlessly integrates various aspects of your daily
                                routines, making every interaction more efficient and enjoyable.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo simplifies the way you manage tasks, appointments, and
                                communication. With a user-friendly interface, it transforms chaos into a
                                well-organized flow.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
                                Sissoo provides networking tools designed to enhance your professional
                                and personal relationships.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1>
                        </div>              </div>
                );
            default:
                return null;
        }
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
            <div>
                <div style={{ fontSize: '16px', fontWeight: '400', color: '#1E1E1E', display: 'flex', alignItems: 'center', cursor: 'pointer', margin: "10px 0px" }} onClick={() => { window.history.back()}}>
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
                                <h3 className='textHelp'>How to get more training proposals?</h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 1 ? 'selected' : ''}`} onClick={() => handleOptionClick(1)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to create a trainer profile? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        {/* <hr />

                        <div className={`helpOptions ${selectedOption === 2 ? 'selected' : ''}`} onClick={() => handleOptionClick(2)}>
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