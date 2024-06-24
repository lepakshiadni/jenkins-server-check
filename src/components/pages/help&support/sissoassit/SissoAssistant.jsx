import React, { useState, useEffect, useRef} from 'react';
import Assist from '../../../assets/Assist Logo 1.svg'
import '../../../styles/SissoAssistant.css'
import favi from '../../../assets/favi.png'
import profileTrainer from '../../../assets/profileTrainer.png'
 
 
 
const SissoAssistent = () => {
    const [expanded, setExpanded] = useState(false);
    const [asistOpen, setAsistOpen] = useState(false)
    const [inputText, setInputText] = useState('');
 
 
    const asistRef = useRef(null)
    const lastMessageRef = useRef(null);
    const textareaRef = useRef(null);
 
 
    useEffect(() => {
        let handler = (e) => {
 
            if (asistRef.current && !asistRef.current.contains(e.target)) {
                setAsistOpen(false);
            }
        };
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [asistRef]);
 
    useEffect(() => {
        const intervalId = setInterval(() => {
            setExpanded((prevExpanded) => !prevExpanded);
        }, 3000);
 
        return () => {
            clearInterval(intervalId);
        };
    }, []);
 
    const [messages, setMessages] = useState([
        { text: 'Hi, welcome to Sissoo!', user: 'bot' },
        { text: 'What\'s your name', user: 'bot' },
    ]);
    const handleSendMessage = (textVal) => {
 
        setMessages([
            ...messages,
            { text: inputText || textVal, user: 'user' },
            { text: `${inputText} How can I assist you?`, user: 'bot' },
        ]);
        setInputText('');
    };
 
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset the height first
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
 
    }, [messages, inputText])
 
 
    return (
        <div className="sisooAssistance">
 
            {!asistOpen ? (
                <div style={{ position: "fixed", top: "500px", marginLeft: "750px" }}>
                    <div className="circle"
                        style={{
                            width: expanded ? '264px' : '63.83px',
                            height: '64px',
                            backgroundColor: '#2676C2',
                            borderRadius: expanded ? '40px' : '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'width 0.5s ease, border-radius 0.5s ease, margin-left 0.5s ease',
                            marginLeft: expanded ? '0px' : '180px',
                            cursor: 'pointer'
                        }} onClick={() => setAsistOpen(!asistOpen)}>
                        {expanded ? (
                            <>
                                <img src={Assist} alt="background" />
                                <h6
                                    style={{
                                        color: '#F2FAFF',
                                        fontWeight: '500',
                                        marginLeft: expanded ? '27px' : '0px',
                                        fontSize: '19px',
                                        whiteSpace: 'nowrap', // Prevent text from wrapping
                                    }}>
                                    Sissoo Assist
                                </h6>
                            </>
                        ) : (
                            <img src={Assist} alt="background" style={{ marginLeft: '0px' }} />
                        )}
                    </div>
                </div>
            ) : (
                <div className='commentContainer' ref={asistRef} style={{ position: "fixed", top: "110px", marginLeft: "740px", zIndex: '10px' }}>
                    <div style={{ position: 'fixed', top: '160px', right: '100px', zIndex: '10' }}>
                        <div style={{ boxShadow: '2px 2px 2px 2px rgba(17,17,17,0.2)' }}>
 
                            <div style={{ backgroundColor: '#2676C2', display: "flex", alignItems: 'center', padding: '5px 0px' }}>
                                <img style={{ marginLeft: '20px' }} src={Assist} alt="background" />
                                <h6 style={{ color: '#F2FAFF', fontWeight: '500', fontSize: '19px', marginLeft: '10px' }}> Sissoo Assist </h6>
                            </div>
 
                            <div className='commentScroll2'>
                                {messages.map((msg, index) => (
                                    <div key={index} className={msg.user === 'user' ? 'commentText2' : 'commentText'}>
                                        {msg.user === 'bot' && (
                                            <img src={favi} alt="" style={{ maxWidth: '30px', maxHeight: '30px', borderRadius: '50%' }} />
                                        )}
                                        <div style={{
                                            marginLeft: msg.user === 'user' ? '40px' : '7px',
                                            marginRight: msg.user === 'user' ? '7px' : '40px',
                                            backgroundColor: msg.user === 'user' ? '#f0f0f0' : 'rgb(38, 118,194,0.1)',
                                            borderStartEndRadius: msg.user === 'user' ? '0px' : '15px',
                                            borderEndStartRadius: '15px',
                                            borderEndEndRadius: '15px',
                                            borderStartStartRadius: msg.user === 'user' ? '15px' : '0px',
                                        }}>
                                            <h6 style={{ padding: '10px', fontSize: '14px', fontWeight: '400', color: msg.user === 'user' ? '#909090' : '#2676C2', wordWrap: 'break-word', maxWidth: '200px' }}>
                                                {typeof msg.text === 'object' ? '' : msg.text}
                                            </h6>
                                        </div>
                                        {msg.user === 'user' && (
                                            <img src={profileTrainer} alt="" style={{ maxWidth: '30px', maxHeight: '30px', borderRadius: '50%' }} />
                                        )}
                                        <div ref={lastMessageRef}>
                                        </div>
                                    </div>
                                ))}
 
                            </div>
                            <div className='textAsist'>
                                <h6 onClick={() => handleSendMessage('Hi')}>Hi</h6>
                                <h6 onClick={() => handleSendMessage('I have a doubt')}>I have a doubt</h6>
                                <h6 onClick={() => handleSendMessage('Bye')}>Bye</h6>
                            </div>
                            <div className='commentFooter'>
                                <textarea ref={textareaRef} className='chatText'
                                    placeholder="Type a message"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    rows={1}
 
                                />
                                <button style={{ border: '0px', backgroundColor: "#2676C2", padding: '12px 20px' }} onClick={handleSendMessage}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
                                        <path d="M3.7877 10.5782L10.6412 10.5782M16.2379 11.9923L3.94466 18.5004C2.84298 19.0837 2.29183 19.3754 1.92856 19.2915C1.61346 19.2188 1.3531 18.9989 1.22953 18.7001C1.08705 18.3555 1.28403 17.7632 1.67834 16.5802L3.51042 11.084C3.573 10.8963 3.60399 10.8026 3.61642 10.7066C3.62745 10.6214 3.62799 10.5353 3.61697 10.45C3.60482 10.3562 3.57418 10.2643 3.51439 10.085L1.67809 4.57606C1.28377 3.3931 1.08676 2.8014 1.22924 2.45681C1.35281 2.15797 1.61313 1.93763 1.92822 1.86487C2.29155 1.78097 2.84286 2.07247 3.9449 2.6559L16.2381 9.16407C17.1045 9.62275 17.5377 9.8523 17.6794 10.1582C17.8027 10.4247 17.8029 10.7319 17.6795 10.9984C17.538 11.3042 17.1048 11.5335 16.2393 11.9917L16.2379 11.9923Z"
                                            stroke='white' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft:"150px", marginTop: "450px", cursor: 'pointer' }} onClick={() => setAsistOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <ellipse cx="29.9202" cy="30" rx="29.9202" ry="30" fill="#2676C2" />
                            <path d="M17.3866 42.3866L29.7733 30M29.7733 30L42.1599 17.6134M29.7733 30L42.1599 42.3866M29.7733 30L17.3866 17.6134" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
 
            )}
 
        </div>
    );
};
 
export default SissoAssistent;
 