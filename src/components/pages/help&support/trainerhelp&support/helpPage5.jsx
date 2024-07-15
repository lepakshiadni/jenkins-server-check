import '../../../styles/HelpPage.css'
import { useEffect, useState } from 'react'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation } from 'react-router-dom';

const HelpPage5 = () => {

    const [selectedOption, setSelectedOption] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.selectedOption !== undefined) {
            setSelectedOption(location.state.selectedOption);
        }
    }, [location.state]);

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    const getContentBasedOnOption = () => {
        switch (selectedOption) {
            case 0:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'Poppins', color: '#696969' }}>Welcome to Sissoo: Connecting Trainers and Employers Directly </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Sissoo is a comprehensive platform where trainers and employers can connect directly to collaborate on training projects, achieving the best results while bypassing middle vendors.
                                By fostering direct connections, users can expand their professional network within the training field.</p>
                            <h1 style={{ fontSize: '20px', fontWeight: "600", fontFamily: 'Poppins', color: '#696969' }} >For trainers, Sissoo offers significant advantages: </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Sissoo offers the best features for trainers, enabling them to directly connect with employers and discuss training requirements.
                                Through our platform, trainers can expand their professional network within the industry and increase their earning potential. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Thank you for choosing Sisoo for your training needs.
                                We're committed to facilitating seamless connections and empowering successful collaborations between trainers and employers. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'Poppins', color: '#696969' }}>Sissoo is Now Available on Android Devices! </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>We're excited to announce that Sissoo, your go-to platform for connecting trainers and employers directly, is now available on Android devices. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Download the Sissoo app from the Google Play Store today and unlock the power of seamless connections,
                                efficient hiring, and optimized training initiatives—all at your fingertips.</p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Thank you for choosing Sissoo. We look forward to empowering your training endeavors on Android devices! </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'Poppins', color: '#696969' }}>Elevating Trainer Experience</h1>
                            {/* <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo is not just an app; it's your personalized gateway to a more
                                organized and connected life. Designed with you in mind, Sissoo is a
                                versatile platform that seamlessly integrates various aspects of your daily
                                routines, making every interaction more efficient and enjoyable.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo simplifies the way you manage tasks, appointments, and
                                communication. With a user-friendly interface, it transforms chaos into a
                                well-organized flow.</p>
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1>
                            
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                            <div className='ml-[11px] '>
                                <ul className=' list-decimal space-y-4'>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Profile Updates: </span>Trainers can update their availability, certifications, skills, and experience, ensuring they receive training calls without disrupting their schedules.
                                    </li>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Direct Communication: </span>Trainers can post on the feed, facilitating direct connections with employers to discuss training requirements.
                                    </li>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Networking: </span>The connections feature empowers trainers to expand their networks, enabling easy communication with employers for future requirements.
                                    </li>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Training Flexibility: </span>Trainers can conduct college, corporate, and individual trainings.
                                    </li>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Increased Earning Potential: </span>With no middle vendors, trainers have the opportunity to earn more while delivering exceptional training experiences.
                                    </li>
                                </ul>
                            </div>
                            <p style={{ fontWeight: '400', color: '#353839' }}>Thank you for choosing Sissoo to enhance your training career.
                                We're committed to providing you with the tools and support to thrive in your professional journey.</p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'Poppins', color: '#696969' }}>Trainer Profile Update Guide</h1>
                            {/* <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo is not just an app; it's your personalized gateway to a more
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
                            <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}

                            <div className='ml-[11px] mt-[10px] '>
                                <ul className=' list-decimal space-y-4'>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Importance of Profile Update: </span>Updating availability date, skills, and certifications is crucial for trainers to access more training opportunities.
                                    </li>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Accessing Profile Update: </span>Click on the profile image in the right corner of the header. Choose "View Profile" from the options.
                                    </li>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Completing Basic Details: </span>Locate the "Please Complete the Basic Details" option. Click on it to fill out or update the required details.
                                    </li>
                                    <li style={{ color: '#353839' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Submitting Updates: </span>After filling out the details, click "Submit" to update your profile.
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'Poppins', color: '#696969' }}>Ensuring Your Data Security with Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>At Sissoo, safeguarding your data is our top priority. We employ robust security measures to ensure that your information remains absolutely secure and protected. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Our platform utilizes industry-standard encryption protocols to safeguard your data from unauthorized access or breaches. Additionally, we regularly update our security systems to stay ahead of emerging threats and vulnerabilities. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>We adhere to strict privacy policies and regulations, ensuring that your personal and sensitive information is handled with the utmost care and confidentiality. Whether it's your account details, communication history, or any other data you entrust to us, you can have full confidence in its security. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Moreover, our dedicated team of security experts continuously monitors our systems for any potential risks or vulnerabilities, proactively addressing and mitigating them to uphold the integrity of your data.  </p>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>At Sissoo, we understand the importance of earning and maintaining your trust. That's why we are committed to providing you with a secure and reliable platform for all your training and networking needs.  </p>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Thank you for choosing Sissoo, where your data security is our priority. </p>

                        </div>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'Poppins', color: '#696969' }}>Trainer Proposal Management Guide</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>When a trainer discovers a training requirement posted on the feed, they can send proposals directly to the employer by clicking on the 'Apply' button. If the trainer finds a particular training requirement appealing,
                                they can express their interest by submitting a proposal. The employer then evaluates whether the trainer's skills align with the requirements of the training.
                                If the employer deems the trainer's qualifications suitable, they extend an offer for the training opportunity. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Similarly, if an employer sends a proposal to a trainer, the trainer can review and manage these proposals through the proposal management section of their profile.</p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>This streamlined process facilitates efficient communication between trainers and employers, ensuring effective collaboration in fulfilling training needs.</p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginTop: "40px" }}>
                            {/* <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>What is Sissoo, and how can it benefit me?3</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '600', color: '#696969' }}>Upcoming Trainings: </span>Once a trainer's proposal is accepted or they are hired for a requirement, the details of these training sessions are displayed in the "Upcoming" section, organized by date. This allows trainers to plan their schedule accordingly and prepare for upcoming engagements..</p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '600', color: '#696969' }}>Ongoing Trainings: </span>Trainers can easily track their ongoing training sessions using the "Ongoing" option in the training management section. This helps trainers stay organized and ensures they can manage their time effectively while actively conducting training sessions.</p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '600', color: '#696969' }}>Ongoing Trainings: </span>Once a training session is completed, it is moved to the "Completed" section in the training management area. This serves as a record of past engagements and allows trainers to review their previous work and track their progress over time. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>By providing these options for managing upcoming, ongoing, and completed trainings, Sissoo enables trainers to stay organized, track their engagements, and effectively manage their workload. This level of visibility and organization contributes to a more efficient and productive training experience for both trainers and employers. </p>

                        </div>
                    </div>
                );

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
                    <div className="helpContainerhelp">
                        <div className={`helpOptions ${selectedOption === 0 ? 'selected' : ''}`} onClick={() => handleOptionClick(0)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>  What Is Sissoo, And How Can It Benefit Me? </h3>
                                <ArrowForwardIosIcon className='arrowIcon' style={{ fontSize: '22px' }} />
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 1 ? 'selected' : ''}`} onClick={() => handleOptionClick(1)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>Is Sissoo Available on Android Devices? </h3>
                                <ArrowForwardIosIcon className='arrowIcon' style={{ fontSize: '22px' }} />
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 2 ? 'selected' : ''}`} onClick={() => handleOptionClick(2)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>What features does Sissoo Offers to users? </h3>
                                <ArrowForwardIosIcon className='arrowIcon' style={{ fontSize: '22px' }} />
                            </div>
                        </div>
                        <hr />
                        <div className={`helpOptions ${selectedOption === 3 ? 'selected' : ''}`} onClick={() => handleOptionClick(3)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How Do I Update My Profile Information On Sissoo? </h3>
                                <ArrowForwardIosIcon className='arrowIcon' style={{ fontSize: '22px' }} />
                            </div>
                        </div>
                        <hr />
                        <div className={`helpOptions ${selectedOption === 4 ? 'selected' : ''}`} onClick={() => handleOptionClick(4)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>Is My Data Secure On Sissoo? </h3>
                                <ArrowForwardIosIcon className='arrowIcon' style={{ fontSize: '22px' }} />
                            </div>
                        </div>
                        <hr />
                        <div className={`helpOptions ${selectedOption === 5 ? 'selected' : ''}`} onClick={() => handleOptionClick(5)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>What is Proposal option in Proposal Management? </h3>
                                <ArrowForwardIosIcon className='arrowIcon' style={{ fontSize: '22px' }} />
                            </div>
                        </div>
                        <hr />
                        <div className={`helpOptions ${selectedOption === 6 ? 'selected' : ''}`} onClick={() => handleOptionClick(6)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp w-[95%]'>What are upcoming, Ongoing and Completed training's?</h3>
                                <ArrowForwardIosIcon className='arrowIcon' style={{ fontSize: '22px' }} />
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

export default HelpPage5;