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
                            <h1 style={{ fontSize: '20px', fontWeight: '600',fontFamily:'Poppins' ,color:'#696969' }}> Growing network on Sissoo</h1>
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>Through the "Connect" option in the feed, you can expand your network and establish connections with numerous people.
                                This feature enables you to stay in touch with employers or all users and easily reach out to them whenever you want to work on their training requirements.</p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>By connecting with employers, you not only grow your professional network but also gain direct access to expertise and resources that can enhance your training initiatives.
                                Whether you're seeking advice, collaboration opportunities, or specific training opportunities, staying connected with employers ensures that you have the support you need at your fingertips. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>Utilize the messaging feature to communicate with your connections seamlessly,
                                discussing training requirements, negotiating terms, and coordinating schedules efficiently.
                                This direct line of communication streamlines the process of finding training's , empowering you to meet your training objectives effectively.
                            </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>              </div>
                );
            case 1:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600',fontFamily:'Poppins' ,color:'#696969' }}>Managing Connections on Sissoo </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>To access your profile options, click on your profile name located in the right corner of the header. From the drop down menu, select "View Profile".
                                Under your profile photo, you'll find the total number of connections you have. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>Clicking on the count of connections will display your list of connections. If you wish to disconnect from anyone simply choose the "Remove Connection" option. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>This feature allows you to manage your connections efficiently,
                                enabling you to stay connected with relevant people and disconnect from those you no longer wish to engage with. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>              </div>
                );
            case 2:
                return (
                    <div>
                        <div className='space-y-4' style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600',fontFamily:'Poppins' ,color:'#696969' }}>Sissoo Trainer Connections Feature </h1>
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>In our platform, trainers have access to essential training requirements through the Feed option. Additionally, trainers can utilize the Connection feature to connect directly with employers. Using comments, trainers can express interest or availability for specific training opportunities.
                                When a trainer comments on a post indicating their availability or interest in a particular training, this information becomes visible to other trainers and employers.
                                This allows for multiple employers to connect with the trainer seamlessly. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400',color:'#353839' }}>We believe this feature enhances communication and collaboration between trainers and employers, facilitating efficient matching for training needs. </p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            {/* <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
                                Sissoo provides networking tools designed to enhance your professional
                                and personal relationships.</p> */}
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>              </div>
                );
            default:
                return null;
        }
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
            <div>
                <div style={{ fontSize: '16px', fontWeight: '400', color: '#1E1E1E', display: 'flex', alignItems: 'center', cursor: 'pointer', margin: "10px 0px" }} onClick={() => {window.history.back() }}>
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
                                <h3 className='textHelp'> How to grow network ? </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 1 ? 'selected' : ''}`} onClick={() => handleOptionClick(1)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to find my connection list ?</h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 2 ? 'selected' : ''}`} onClick={() => handleOptionClick(2)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>How to connect with employer? </h3>
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