import '../../../styles/Feed.css';
import { useState } from 'react';
 
const PopUp = (props) => {
 
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
 
    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...selectedCheckboxes];
        if (updatedCheckboxes.includes(index)) {
            updatedCheckboxes.splice(updatedCheckboxes.indexOf(index), 1);
        } else {
            updatedCheckboxes.push(index);
        }
        setSelectedCheckboxes(updatedCheckboxes);
    };
 
    const isCheckboxSelected = (index) => {
        return selectedCheckboxes.includes(index);
    };
    return (props.trigger) ? (
 
        <div className='popup'>
            <div className="popupContainer">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '5px  10px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '20px' }}>Send Anthony post to</h3>
                    <h6 className="close" onClick={() => props.setTrigger(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path d="M8.48542 8.48528L16.9707 16.9706M16.9707 16.9706L25.456 25.4558M16.9707 16.9706L8.48542 25.4558M16.9707 16.9706L25.456 8.48528" stroke="#2676C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </h6>
                </div>
                <hr style={{ marginTop: '5px', marginBottom: '5px' }} />
 
                <input type="text" placeholder="Type a name" style={{ borderRadius: "8px", border: "2px solid #DADADA", width: '699px', height: '40px', margin: '10px 10px', paddingLeft: '10px',outline:"none" }} />
 
                <div className="scrollpopUp">
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <img className='img2' height='40px' width='40px' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        </div>
                        <div>
                            <h5 style={{ fontSize: '14px', margin: '0px',color:"#333333", fontWeight: '500' }}>Eleesa</h5>
                            <p style={{ fontSize: '12px', margin: '0px',color:'#535353', fontWeight: '500' }}>Wipro</p>
                        </div>
                        <div style={{ marginLeft: '570px' }}>
                            <input type="checkbox" checked={isCheckboxSelected(0)} onChange={() => handleCheckboxChange(0)} />
                        </div>
 
                    </div>
                    <hr style={{ marginTop: '5px', marginLeft: '50px', marginBottom: '5px' }} />
 
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px' }}>
                            <img className='img2' height='40px' width='40px' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        </div>
                        <div>
                            <h5 style={{ fontSize: '14px', margin: '0px',color:"#333333", fontWeight: '500'  }}>Eleesa</h5>
                            <p style={{ fontSize: '12px', margin: '0px',color:'#535353', fontWeight: '500' }}>Wipro</p>
                        </div>
                        <div style={{ marginLeft: '570px' }}>
                            <input type="checkbox" checked={isCheckboxSelected(1)} onChange={() => handleCheckboxChange(1)} />
                        </div>
 
                    </div>
                    <hr style={{ marginTop: '5px', marginLeft: '50px', marginBottom: '5px' }} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px' }}>
                            <img className='img2' height='40px' width='40px' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        </div>
                        <div>
                            <h5 style={{ fontSize: '14px', margin: '0px',color:"#333333", fontWeight: '500'  }}>Eleesa</h5>
                            <p style={{ fontSize: '12px', margin: '0px',color:'#535353', fontWeight: '500' }}>Wipro</p>
                        </div>
                        <div style={{ marginLeft: '570px' }}>
                            <input type="checkbox" checked={isCheckboxSelected(5)} onChange={() => handleCheckboxChange(5)} />
                        </div>
 
                    </div>
                    <hr style={{ marginTop: '5px', marginLeft: '50px', marginBottom: '5px', fontWeight: '500' }} />
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                        <div style={{ marginRight: '10px' }}>
                            <img className='img2' height='40px' width='40px' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        </div>
                        <div>
                            <h5 style={{ fontSize: '14px', margin: '0px',color:"#333333", fontWeight: '500'  }}>Eleesa</h5>
                            <p style={{ fontSize: '12px', margin: '0px',color:'#535353', fontWeight: '500' }}>Wipro</p>
                        </div>
                        <div style={{ marginLeft: '570px' }}>
                            <input type="checkbox" checked={isCheckboxSelected(4)} onChange={() => handleCheckboxChange(4)} />
                        </div>
 
                    </div>
                    <hr style={{ marginTop: '5px', marginLeft: '50px', marginBottom: '5px' }} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px' }}>
                            <img className='img2' height='40px' width='40px' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        </div>
                        <div>
                            <h5 style={{ fontSize: '14px', margin: '0px',color:"#333333", fontWeight: '500'  }}>Eleesa</h5>
                            <p style={{ fontSize: '12px', margin: '0px',color:'#535353', fontWeight: '500' }}>Wipro</p>
                        </div>
                        <div style={{ marginLeft: '570px' }}>
                            <input type="checkbox" checked={isCheckboxSelected(3)} onChange={() => handleCheckboxChange(3)} />
                        </div>
 
                    </div>
                    <hr style={{ marginTop: '5px', marginLeft: '50px', marginBottom: '5px' }} />
                </div>
 
                <div className={`popFooter ${selectedCheckboxes.length > 0 ? 'enabled' : 'disabled'}`}>
                    <input type="text" style={{ border: '0px', paddingLeft: '10px', width: '650px', outline: "none", height: '54px' }} placeholder="Type a message" disabled={selectedCheckboxes.length === 0} />
                    <button style={{ padding: '7px 30px',width:'92px',height:"54px",border:'0px'}} disabled={selectedCheckboxes.length === 0}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
                            <path d="M3.7877 10.5782L10.6412 10.5782M16.2379 11.9923L3.94466 18.5004C2.84298 19.0837 2.29183 19.3754 1.92856 19.2915C1.61346 19.2188 1.3531 18.9989 1.22953 18.7001C1.08705 18.3555 1.28403 17.7632 1.67834 16.5802L3.51042 11.084C3.573 10.8963 3.60399 10.8026 3.61642 10.7066C3.62745 10.6214 3.62799 10.5353 3.61697 10.45C3.60482 10.3562 3.57418 10.2643 3.51439 10.085L1.67809 4.57606C1.28377 3.3931 1.08676 2.8014 1.22924 2.45681C1.35281 2.15797 1.61313 1.93763 1.92822 1.86487C2.29155 1.78097 2.84286 2.07247 3.9449 2.6559L16.2381 9.16407C17.1045 9.62275 17.5377 9.8523 17.6794 10.1582C17.8027 10.4247 17.8029 10.7319 17.6795 10.9984C17.538 11.3042 17.1048 11.5335 16.2393 11.9917L16.2379 11.9923Z"
                                stroke={selectedCheckboxes.length > 0 ? 'white' : 'gray'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
 
            </div>
            {props.children}
        </div>
    ) : "";
}
 
export default PopUp;