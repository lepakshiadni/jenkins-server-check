import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const SquareCropImg = (props) => {
    const [image, setImage] = useState(false);
    const [cropData, setCropData] = useState(null);
    const [fileName, setFileName] = useState(null);
    const cropperRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setFileName(file.name); // Store selected filename
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
            const croppedImageBase64 = croppedCanvas.toDataURL();
            setCropData(croppedImageBase64);
            props.handleUpdateBannerImage(croppedImageBase64, fileName); // Pass filename along with cropped image data
            props.handleUpdateBannerImg()
        }
        setImage(null);
        setFileName(null); 
        setCropData(null);
    };
    
    
    const handleClosePopUp = () => {
        setImage(null);
        setFileName(null);
        props.setTrigger(false)
    }
    const handleCropChange = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
            const croppedImageBase64 = croppedCanvas.toDataURL();
            setCropData(croppedImageBase64);
        }
    };

    return (props.trigger) ? (
        <div className="CropImgpopup">
            <div className="CropContainer">
                <div>
                    <span>
                        <svg className=" Popclose cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 34 34" fill="none" onClick={handleClosePopUp}>
                            <path d="M8.48542 8.48528L16.9707 16.9706M16.9707 16.9706L25.456 25.4558M16.9707 16.9706L8.48542 25.4558M16.9707 16.9706L25.456 8.48528" stroke="#2676C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>

                <div className="flex justify-between  items-start p-10">
                    <div className="flex items-center" style={{ border: '2px Dotted black', height: '200px', width: "300px", borderRadius: '10px' }}>

                        <Cropper
                            ref={cropperRef}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={1}
                            minCropBoxWidth={1}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            guides={true}
                            crop={handleCropChange}
                        />

                        {!fileName && (
                            <input className="cursor-pointer " type="file" onChange={handleFileChange} />
                        )}

                    </div>
                    <div className="ms-6">
                        <div>
                            <img width='180px' height='42px' style={{ maxHeight: '42px', maxWidth: '180px' }} className="ms-3" src={cropData} alt="" />
                        </div>
                        <button style={{ padding: '8px 70px', backgroundColor: '#2676C2', borderRadius: "10px", color: "white", marginTop: '115px', position: 'fixed' }} onClick={handleCrop}>Replace</button>
                    </div>

                </div>

            </div>
        </div>
    ) : ""

}

export default SquareCropImg;
