import '../../../styles/HelpPage.css'
import { useState } from 'react'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HelpPage2 = () => {

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
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Connecting with Trainers on Sissoo</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Through the "Connect" option in both the feed and trainer list, you can expand your network and establish connections with numerous trainers. This feature enables you to stay in touch with trainers and easily reach out to them whenever you require their services for training requirements. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>By connecting with trainers, you not only grow your professional network but also gain direct access to expertise and resources that can enhance your training initiatives. Whether you're seeking advice, collaboration opportunities, or specific training services, staying connected with trainers ensures that you have the support you need at your fingertips. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Utilize the messaging feature to communicate with trainers seamlessly, discussing training requirements, negotiating terms, and coordinating schedules efficiently. This direct line of communication streamlines the process of finding and hiring trainers, empowering you to meet your training objectives effectively.</p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Managing Connections on Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>To access your profile options, click on your profile name located in the right corner of the header. From the dropdown menu, select "View Profile". Under your profile photo, you'll find the total number of connections you have. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Clicking on the count of connections will display your list of connections. If you wish to disconnect from any trainer, simply choose the "Remove Connection" option. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>This feature allows you to manage your connections efficiently, enabling you to stay connected with relevant trainers and disconnect from those you no longer wish to engage with. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '450px', marginLeft: '19px', marginTop: "50px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#696969', fontFamily: 'Poppins' }}>Connecting with Trainers and Hiring on Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Employers can utilize the Feed and Trainer List options to connect with trainers on our platform. If an employer wishes to hire a trainer, they should follow these steps: </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <div className="ml-[11px]">
                                <ol className='list-decimal space-y-2'>
                                    <li style={{ color: '#353839' }}>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>PPost Requirement:</span> The employer should first post the training requirement specifying the details of the training needed. </li>
                                    <li style={{ color: '#353839' }}>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Review Responses:</span> Once the requirement is posted, trainers can respond with their proposals. </li>
                                    <li style={{ color: '#353839' }}>  <span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Hire Trainers:</span> To hire a trainer for a particular post, the employer can review the proposals in proposal management and select the most suitable candidate. They can then click on the "Accept" option associated with that specific post. </li>
                                </ol>
                            </div>
                            <p style={{ fontSize: '16px', fontWeight: '400' }}>Employers can also send hiring proposals to trainers directly through the Feed and Trainer List options. Here's how: </p>
                            <div className="ml-[11px]">
                                <ol className='list-decimal space-y-2'>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Explore Trainer Profiles:</span> Employers can browse through the Trainer List or their Feed to find suitable trainers for their training requirements. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Select Trainer:</span> Upon finding a trainer of interest, employers can click on the trainer's profile to view more details. </li>
                                    <li style={{ color: '#353839' }}><span style={{ fontSize: '16px', fontWeight: '500', color: '#696969' }}>Send Hiring Proposal:</span> Within the trainer's profile, employers will find the option to "Hire." By clicking on this option, they can send a hiring proposal directly to the trainer for the specific training requirement. </li>
                                </ol>
                            </div>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>This streamlined process allows employers to efficiently connect with trainers and extend hiring offers for their projects. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
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
                    <div className="helpContainer">
                        <div className={`helpOptions ${selectedOption === 0 ? 'selected' : ''}`} onClick={() => handleOptionClick(0)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to grow network </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 1 ? 'selected' : ''}`} onClick={() => handleOptionClick(1)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to find my connection list? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 2 ? 'selected' : ''}`} onClick={() => handleOptionClick(2)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to connect with trainers? </h3>
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

export default HelpPage2;