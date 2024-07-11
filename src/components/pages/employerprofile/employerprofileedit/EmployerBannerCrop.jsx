import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const EmployerBannerCrop = (props) => {
    const [image, setImage] = useState(false);
    const [cropData, setCropData] = useState(null);
    const [fileName, setFileName] = useState(null);
    const cropperRef = useRef(null);
    const fileInputRef = useRef(null)
    const [isCircular, setIsCircular] = useState(false);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                fileInputRef.current.value = null; // Reset file input
                return;
            }

            // Check file size
            if (file.size > 1 * 1024 * 1024) {
                alert("File size should be within 1024KB.");
                fileInputRef.current.value = null; // Reset file input
                return;
            }

            // Load image to display in cropper
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
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
                width: 837, // Set the desired width
                height: 197, // Set the desired height
                imageSmoothingEnabled: false, // Disable image smoothing to maintain pixelated effect
                imageSmoothingQuality: "high", // High quality to maintain details
            });

            // Convert cropped canvas to base64
            const croppedImageBase64 = croppedCanvas.toDataURL("image/jpeg", 1); // Quality set to 1 (original quality)

            // Update state with cropped image data
            setCropData(croppedImageBase64);

            // Pass cropped image data and filename to parent component
            props.handleUpdateBannerImage(croppedImageBase64, fileName);
            props.handleUpdateBannerImg();
        }
    };

    const handleClosePopUp = () => {
        setImage(null);
        setFileName(null);
        setCropData(null)
        props.setTrigger(false);
    };
    const handleCropChange = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
            const croppedImageBase64 = croppedCanvas.toDataURL();
            setCropData(croppedImageBase64);
        }
    };

    return props.trigger === true ? (
        <div className="CropImgpopup">
            <div className="CropContainer">
                <div>
                    <span>
                        <svg
                            className=" Popclose cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="45"
                            height="45"
                            viewBox="0 0 34 34"
                            fill="none"
                            onClick={handleClosePopUp}
                        >
                            <path
                                d="M8.48542 8.48528L16.9707 16.9706M16.9707 16.9706L25.456 25.4558M16.9707 16.9706L8.48542 25.4558M16.9707 16.9706L25.456 8.48528"
                                stroke="#2676C2"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </span>
                </div>

                <div className="flex justify-between  items-start p-10">
                    <div
                        className="flex items-center p-1"
                        style={{
                            border: "2px Dotted black",
                            height: "200px",
                            width: "300px",
                            borderRadius: "10px",
                        }}
                    >
                        <Cropper
                            ref={cropperRef}
                            zoomTo={0.5}
                            initialAspectRatio={837 / 197}
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={1}
                            minCropBoxWidth={1}
                            cropBoxResizable={false} // Disable crop box resizing
                            cropBoxMovable={true} // Allow the crop box to be moved
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            guides={true}
                            crop={handleCropChange}
                            style={{ height: '100%', objectFit: 'contain' }}
                            className={isCircular ? 'cropper-circular' : 'cropper-rectangular'}
                        />
                        {!fileName && (
                            <input className="cursor-pointer" ref={fileInputRef} type="file" onChange={handleFileChange} />
                        )}
                    </div>
                    <div className="ms-6">
                        <div>
                            <img
                                width="180px"
                                height="42px"
                                style={{ maxHeight: "42px", maxWidth: "180px" }}
                                className="ms-3"
                                src={cropData}
                                alt=""
                            />
                        </div>
                        <button
                            style={{
                                padding: "8px 70px",
                                backgroundColor: "#2676C2",
                                borderRadius: "10px",
                                color: "white",
                                marginTop: "115px",
                                position: "fixed",
                            }}
                            onClick={handleCrop}
                        >
                            Replace
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default EmployerBannerCrop;
