import '../../../styles/HelpPage.css'
import { useState } from 'react'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HelpPage = () => {

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
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Connecting with Trainers through Feed Option </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>The Feed Option in our application provides you with the opportunity to connect and hire trainers directly. By adding a trainer to your connection list, you can initiate direct communication to discuss your training requirements without any intermediaries. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>This feature streamlines the process, enabling seamless interaction between you and the trainers, ensuring that your training needs are met efficiently. Whether you seek clarification on specific topics, customization of training modules, or any other inquiries, direct messaging facilitates clear communication and swift resolution. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>To leverage this functionality, simply navigate to the Feed Option, locate the desired trainer, and add them to your connection list. From there, you can initiate conversations, share details, and collaborate effectively to achieve your training objectives. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                        {/* <div style={{ width: '500px', marginLeft: '19px', marginTop: "30px" }}>
                            <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>What is Sissoo, and how can it benefit me?1</h1>
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
                        </div> */}

                    </div>
                );
            case 1:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Accessing Trainer Profiles and Hiring through Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>In the Trainer List section of our application, you can find comprehensive profiles of all available trainers. Sissoo goes further by offering employers an easy-to-use feature: based on location and skills, employers can quickly identify suitable trainer profiles and directly hire them for their training requirements. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Moreover, employers can refine their search based on the trainer's availability, ensuring that they find the right fit for their needs. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>To take advantage of this functionality, navigate to the Trainer List section, where you'll discover a wealth of trainer profiles. Utilize the search filters based on location, skills, and availability to narrow down your options and find the perfect match for your training needs. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Posting Training Requirements on Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>In the "Post Requirement" section of our application, employers can easily submit their training requirements. Here's a step-by-step guide on how to do it: </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            {/* <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo simplifies the way you manage tasks, appointments, and
                                communication. With a user-friendly interface, it transforms chaos into a
                                well-organized flow.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
                                Sissoo provides networking tools designed to enhance your professional
                                and personal relationships.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                            <div className="ml-[11px] mt-[10px] ">
                                <ol className='list-decimal space-y-2'>
                                    <li style={{ color: '#353839' }}>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Training Details:</span> Start by providing the name of the training for which you're seeking trainers. Add a description of the training and specify the required skills. </li>
                                    <li>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Type of Training:</span> Choose the type of training you're looking for: college, corporate company, or individual one-on-one training. </li>
                                    <li>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Mode of Training:</span> Select whether the training will be conducted online or offline. </li>
                                    <li>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Duration:</span> If you need trainers for specific hours, days, or months, choose the appropriate option and specify the duration. </li>
                                    <li>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Budget:</span> Set a budget for the training. </li>
                                    <li>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Training Outline (TOC):</span> If you have a Training Outline available, choose the "Available" option and upload the TOC for the trainer's reference. </li>
                                    <li>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Start and End Date:</span> Specify the start and end dates of the training. </li>
                                    <li>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Urgent Requirement:</span> If the requirement is urgent, select the "Urgent Requirement" option. </li>
                                    <li>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Submission:</span> Once you've filled out all the necessary details, click "Submit" to post your training requirement. </li>
                                </ol>
                            </div>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>By following these steps, you can efficiently communicate your training needs and connect with suitable trainers through our platform. </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

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
                                <h3 className='textHelp'>What is Feed?</h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 1 ? 'selected' : ''}`} onClick={() => handleOptionClick(1)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to search trainers? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 2 ? 'selected' : ''}`} onClick={() => handleOptionClick(2)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to post training's? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='helpContent' style={{ marginLeft: '20px' }}>
                {getContentBasedOnOption()}
            </div>
        </div>
    );
}

export default HelpPage;