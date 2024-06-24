import '../../../styles/HelpPage.css'
import { useState } from 'react'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const HelpPage4 = () => {

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
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Connect and chat directly with employers, facilitating clear and efficient communication.</p>
                            {/* <h1 style={{ fontSize: '24px', fontWeight: "500", color: "#1E1E1E" }} >Streamlined Organization</h1> */}
                            {/* <p style={{ fontSize: '16px', fontWeight: '400' }}>Sissoo simplifies the way you manage tasks, appointments, and
                                communication. With a user-friendly interface, it transforms chaos into a
                                well-organized flow.</p> */}
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Smart Networking</h1> */}
                            {/* <p style={{ fontSize: '16px', fontWeight: '400' }}>Connect with colleagues, friends, and new opportunities effortlessly.
                                Sissoo provides networking tools designed to enhance your professional
                                and personal relationships.</p> */}
                            {/* <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#1E1E1E' }}>Effortless Communication</h1> */}
                        </div>              </div>
                );
            case 1:
                return (
                    <div>
                        <div style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            {/* <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>What is Sissoo, and how can it benefit me?2</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>Easily find training's suited to your skills, streamlining the search process. </p>
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
            case 2:
                return (
                    <div >
                        <div style={{ width: '450px', marginLeft: '19px', marginTop: "40px" }}>
                            {/* <h1 style={{ fontSize: '30px', fontWeight: '500', color: '#1E1E1E' }}>What is Sissoo, and how can it benefit me?3</h1> */}
                            <p style={{ fontSize: '16px', fontWeight: '400', color: '#353839' }}>By connecting directly with employers, you can bypass intermediaries, 	ensuring a  direct and seamless experience. </p>
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
            default:
                return null;
        }
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', margin: '20px'}}>
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
                                <h3 className='textHelp'>Direct Communication</h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 1 ? 'selected' : ''}`} onClick={() => handleOptionClick(1)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'> Effortless Discovery </h3>
                                <h3 style={{ fontSize: '22px', marginLeft: '340px', position: 'absolute' }}><ArrowForwardIosIcon /></h3>
                            </div>
                        </div>
                        <hr />

                        <div className={`helpOptions ${selectedOption === 2 ? 'selected' : ''}`} onClick={() => handleOptionClick(2)}>
                            <div className='helpDiv' style={{ height: "60px", width: "7px" }}></div>
                            <div className='divMenu'>
                                <h3 className='textHelp'>Vendor-Free Environment </h3>
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

export default HelpPage4;