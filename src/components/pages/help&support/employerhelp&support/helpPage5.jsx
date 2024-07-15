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
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}> Welcome to Sissoo: Connecting Trainers and Employers Directly </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Sissoo is a comprehensive platform where trainers and employers can connect directly to collaborate on training projects, achieving the best results while bypassing middle vendors. By fostering direct connections, users can expand their professional network within the training field. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>For employers, Sisoo offers significant advantages: </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <div className="ml-[11px]">
                                <ol className='list-decimal space-y-2'>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Cost-Effective Hiring:</span> Directly hire the best trainers for your requirements in minimal time, saving on budget by eliminating vendor fees. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Precise Search Capabilities:</span> Utilize advanced search filters to find trainers based on location, skills, availability, years of experience in training, and certifications. This ensures you find the perfect match for your needs efficiently. </li>

                                </ol>
                            </div>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>With Sissoo, employers can streamline their hiring process, connect with top-notch trainers, and optimize their training initiatives for maximum impact.  </p>

                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Thank you for choosing Sisoo for your training needs. We're committed to facilitating seamless connections and empowering successful collaborations between trainers and employers. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}> Sissoo is Now Available on Android Devices! </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>We're excited to announce that Sissoo, your go-to platform for connecting trainers and employers directly, is now available on Android devices. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Download the Sissoo app from the Google Play Store today and unlock the power of seamless connections, efficient hiring, and optimized training initiatives—all at your fingertips. </p>

                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Thank you for choosing Sissoo. We look forward to empowering your training endeavors on Android devices! </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Experience the Best Features with Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Sissoo delivers an array of exceptional features to its users. With Sissoo, users can seamlessly connect with one another, fostering the growth of their professional networks. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>For employers, Sissoo presents a time and budget-saving opportunity by eliminating middle vendors and enabling direct connections with trainers for all their training requirements. Additionally, trainers are compensated accurately based on their skills and experience. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Moreover, employers benefit from comprehensive details about their posted requirements, including ongoing and completed trainings, as well as the number of trainers who have applied for each training. Employers can send proposals to trainers to conduct the trainings, and easily access trainer profiles if they have engaged with their posts. Additionally, employers have the flexibility to delete or edit requirements as needed. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Streamline Your Hiring Process with Sissoo  </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>As an employer, the first step to hiring trainers is to post your training requirements on Sissoo. In the Trainer List, you can easily sort profiles based on location and skills, ensuring you find the perfect match for your needs.  </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Within each trainer's profile, you can review their availability, experience, and certifications. If you find a suitable match, simply click on the "Hire" button available in their profile to connect with them directly.  </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Sissoo empowers employers to streamline their hiring process and connect with the right trainers efficiently. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Ensuring Your Data Security with Sissoo   </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>At Sissoo, safeguarding your data is our top priority. We employ robust security measures to ensure that your information remains absolutely secure and protected.  </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Our platform utilizes industry-standard encryption protocols to safeguard your data from unauthorized access or breaches. Additionally, we regularly update our security systems to stay ahead of emerging threats and vulnerabilities. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>We adhere to strict privacy policies and regulations, ensuring that your personal and sensitive information is handled with the utmost care and confidentiality. Whether it's your account details, communication history, or any other data you entrust to us, you can have full confidence in its security.  </p>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Moreover, our dedicated team of security experts continuously monitors our systems for any potential risks or vulnerabilities, proactively addressing and mitigating them to uphold the integrity of your data. </p>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>At Sissoo, we understand the importance of earning and maintaining your trust. That's why we are committed to providing you with a secure and reliable platform for all your training and networking needs. </p>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Thank you for choosing Sissoo, where your data security is our priority.  </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Managing Trainer Proposals on Sisoo   </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>When a trainer is interested in working on a requirement you've posted, they'll send a proposal directly to you. You have the flexibility to review these proposals and decide whether to accept or deny them.  </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>If you find a proposal suitable and wish to hire the trainer, simply accept their proposal. This initiates the hiring process, allowing you to move forward with that trainer for your training requirement. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>On the other hand, if a proposal does not meet your needs or criteria, you have the option to deny it. This ensures that you maintain control over the hiring process and can select the best fit for your requirements. </p>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>With Sisoo, you have the power to manage trainer proposals effectively, ensuring that you hire the right trainers for your projects. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '400px', marginLeft: '19px', marginTop: "40px" }}>
                            {/* <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>Streamline Your Hiring Process with Sissoo  </h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Employers can utilize the Feed and Trainer List options to connect with trainers on our platform. If an employer wishes to hire a trainer, they should follow these steps:  </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <div className="ml-[11px]">
                                <ol className='list-decimal space-y-2' >
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Post Requirement:</span> The employer should first post the training requirement

                                        specifying the details of the training needed. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Review Responses:</span> Once the requirement is posted, trainers can respond with

                                        their proposals. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Hire Trainers:</span> To hire a trainer for a particular post, the employer can review  </li>
                                </ol>
                            </div>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>the proposals in proposal management and select the most suitable candidate. 	They can then click on the "Accept" option associated with that specific post.   </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Employers can also send hiring proposals to trainers directly through the Feed and Trainer List options. Here's how: </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                            <div className="ml-[11px]">
                                <ol className='list-decimal space-y-2'>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}> Explore Trainer Profiles:</span> Employers can browse through the Trainer List or

                                        their Feed to find suitable trainers for their training requirements. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Select Trainer:</span> Upon finding a trainer of interest, employers can click on the

                                        trainer's profile to view more details. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Send Hiring Proposal:</span> Within the trainer's profile, employers will find the

                                        option to "Hire." By clicking on this option, they can send a hiring

                                        proposal directly to the trainer for the specific training requirement. </li>
                                </ol>
                            </div>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>This streamlined process allows employers to efficiently connect with trainers and extend hiring offers for their projects. </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '20px',marginTop:'20px' }}>

            <div>
                <div style={{ fontSize: '16px', fontWeight: '400', color: '#1E1E1E', display: 'flex', alignItems: 'center', cursor: 'pointer', margin: "10px 0px" }} onClick={() => { window.history.back() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                        <path d="M16 7.57143L0.999999 7.57143M0.999999 7.57143L7.42857 14M0.999999 7.57143L7.42857 1.14286" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 style={{ marginLeft: '10px' }} >Back</h3>
                </div>

                <div className='helppage'>
                    <div className="helpContainer" style={{ width: '420px' }}>
                        <div className={`helpOptions ${selectedOption === 0 ? 'selected' : ''}`} onClick={() => handleOptionClick(0)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp '>What Is Sissoo, And How Can It Benefit Me?  </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '380px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 1 ? 'selected' : ''}`} onClick={() => handleOptionClick(1)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp '>Is Sissoo Available on Android Devices? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '380px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 2 ? 'selected' : ''}`} onClick={() => handleOptionClick(2)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp '>What features does Sissoo Offers to users? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '380px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />
                        <div className={`helpOptions ${selectedOption === 3 ? 'selected' : ''}`} onClick={() => handleOptionClick(3)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp '>How Do I hire trainers from trainer list?  </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '380px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />
                        <div className={`helpOptions ${selectedOption === 4 ? 'selected' : ''}`} onClick={() => handleOptionClick(4)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp '>Is My Data Secure On Sissoo?  </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '380px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />
                        <div className={`helpOptions ${selectedOption === 5 ? 'selected' : ''}`} onClick={() => handleOptionClick(5)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp  w-[95%]  '>What is Proposal option in Proposal Management?  </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '380px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />
                        <div className={`helpOptions ${selectedOption === 6 ? 'selected' : ''}`} onClick={() => handleOptionClick(6)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp '>How to search trainers?   </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '380px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />
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