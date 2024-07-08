import { useDispatch, useSelector } from "react-redux";
import { trainerBasicInfoUpdate, trainerDetails, trainerProfileBannerUpdate, trainerProfileImgUpdate } from "../../../redux/action/trainer.action";
import { toast } from "react-toastify";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import TrainerBannerCropImg from "./trainerprofileedit/TrainerBannerCrop";
import TrainerProfileCropImg from "./trainerprofileedit/TrainerProfileCrop";
import { useLocation, useNavigate } from "react-router-dom";

const TrainerBasicInfo = () => {

    let states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Ladakh",
        "Lakshadweep",
        "Puducherry"
    ];

    const dispatch = useDispatch();
    const locationpath = useLocation()
    const navigate = useNavigate()

    const [profileImage, setProfileImage] = useState();
    const [banermage, setBanerImage] = useState();
    const [showProfileCropPopup, setShowProfileCropPopup] = useState(false);
    const [showBannerCropPopup, setShowBannerCropPopup] = useState(false);
    const [toastShown, setToastShown] = useState(false);
    useEffect(() => {
        dispatch(trainerDetails());
    }, [dispatch, locationpath]);

    const trainer = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.trainerDetails;
    });

    // const message = useSelector(({ trainerSignUp }) => trainerSignUp?.trainerDetails);
    console.log('trainer', trainer);

    // useEffect(() => {
    //     if (trainer?.success) {
    //         if (trainer?.message === 'Basic Info Updated Successfully') {
    //             toast.success('Basic Info Updated Successfully')
    //         }

    //     }
    // }, [trainer?.success, trainer?.message]);


    const profileBanner = useRef(null);
    const profileImg = useRef(null);

    const handleFileInputChange = (e, imageType) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const newImage = event.target.result;
                if (imageType === "profile") {
                    setProfileImage({ file: newImage, name: file.name });
                } else if (imageType === "banner") {
                    setBanerImage({ file: newImage, name: file.name });
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleUpdateBannerImage = (newImage, fileName) => {
        // Convert base64 image to Blob
        const byteCharacters = atob(newImage.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        // Create a File from the Blob
        const SqurecroppedFile = new File([blob], fileName, { type: "image/jpeg" });

        // Create a DataTransfer object and add the cropped file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(SqurecroppedFile);

        // Set the files of the input element to the DataTransfer object's files
        const inputElement = profileBanner.current;
        inputElement.files = dataTransfer.files;

        // Update state and close popup
        setBanerImage({ file: newImage, name: fileName });
        setShowBannerCropPopup(false);

        // console.log(newImage);
    };

    const handleUpdateProfileImage = (newImage, fileName) => {
        // Convert base64 image to Blob
        const byteCharacters = atob(newImage.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        // Create a File from the Blob
        const croppedFile = new File([blob], fileName, { type: "image/jpeg" });

        // Create a DataTransfer object and add the cropped file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(croppedFile);

        // Set the files of the input element to the DataTransfer object's files
        const inputElement = profileImg.current;
        inputElement.files = dataTransfer.files;

        // Update state and close popup
        setProfileImage({ file: newImage, name: fileName });
        setShowProfileCropPopup(false);

        // console.log(newImage);
    };

    const profileImageUpdate = () => {
        const formData = new FormData()
        const fileInput = profileImg.current
        const file = fileInput.files[0];
        formData.append('profileImg', file)
        dispatch(trainerProfileImgUpdate(formData))
    }

    const profileBannerUpdate = () => {
        const formData = new FormData()
        const fileInput = profileBanner.current
        const file = fileInput.files[0]
        formData.append('profileBanner', file)
        dispatch(trainerProfileBannerUpdate(formData))
    }

    const [firstName, setFirstName] = useState(trainer?.trainerDetails?.basicInfo?.firstName || trainer?.trainerDetails?.fullName?.split(' ')[0]);
    const [lastName, setLastName] = useState(trainer?.trainerDetails?.basicInfo?.lastName || trainer?.trainerDetails?.fullName?.split(' ')[1]);
    const [designation, setDesignation] = useState(trainer?.trainerDetails?.basicInfo?.designation || "");
    const [company, setComapany] = useState(trainer?.trainerDetails?.basicInfo?.company || "");
    const [age, setAge] = useState(trainer?.trainerDetails?.basicInfo?.age || "");
    const [location, setLocation] = useState(trainer?.trainerDetails?.basicInfo?.location || "");
    const [objective, setObjective] = useState(trainer?.trainerDetails?.basicInfo?.objective || "");
    const [aboutYou, setAboutYou] = useState(trainer?.trainerDetails?.basicInfo?.aboutYou || "");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (e.target.name === "firstName") {
                document.querySelector("[name=lastName]").focus();
            } else if (e.target.name === "lastName") {
                document.querySelector("[name=designation]").focus();
            } else if (e.target.name === "designation") {
                document.querySelector("[name=company]").focus();
            } else if (e.target.name === "company") {
                document.querySelector("[name=age]").focus();
            } else if (e.target.name === "objective") {
                document.querySelector("[name=aboutYou]").focus();
            }
        }
    };

    const handleChange = (setter, pattern, name, maxLength = Infinity) => (e) => {
        const { value } = e.target;
        // Apply the specified pattern for validation and ensure length does not exceed maxLength
        if (pattern.test(value) && (name !== "age" || value.length <= maxLength)) {
            setter(value);
        }
    };

    const handleObjectiveChange = (e) => {
        const { value } = e.target;
        // Prevent four consecutive numbers
        if (!/\d{5}/.test(value)) {
            setObjective(value);
        }
    };

    useLayoutEffect(() => {
        if (trainer) {
            setFirstName(trainer?.trainerDetails?.basicInfo?.firstName || trainer?.trainerDetails?.fullName?.split(' ')[0]);
            setLastName(trainer?.trainerDetails?.basicInfo?.lastName || trainer?.trainerDetails?.fullName?.split(' ')[1]);
            setDesignation(trainer?.trainerDetails?.basicInfo?.designation);
            setComapany(trainer?.trainerDetails?.basicInfo?.company);
            setAge(trainer?.trainerDetails?.basicInfo?.age);
            setLocation(trainer?.trainerDetails?.basicInfo?.location);
            setObjective(trainer?.trainerDetails?.basicInfo?.objective);
            setAboutYou(trainer?.trainerDetails?.basicInfo?.aboutYou);
        }
    }, [trainer]);


    const handleCase0Data = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = profileImg.current;
        const fileInput2 = profileBanner.current;

        // if (fileInput && fileInput2 && fileInput.files.length > 0 && fileInput2.files.length > 0) {
        // const file = fileInput.files[0];
        // const file2 = fileInput2.files[0];

        // Append form data to formData
        // formData.append("profileImg", file);
        // formData.append("profileBanner", file2);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("designation", designation);
        formData.append("location", location);
        if (age) formData.append("age", age);
        if (company) formData.append("company", company);
        if (objective) formData.append("objective", objective);
        if (aboutYou) formData.append("aboutYou", aboutYou);
        formData.append("status", true);

        dispatch(trainerBasicInfoUpdate(formData));
        toast.success('Basic Info Updated Successfully')
        navigate('/trainerprofile/profileupdate/skills')
        // }
    };
    return (
        <>
            <TrainerProfileCropImg
                trigger={showProfileCropPopup}
                setTrigger={setShowProfileCropPopup}
                handleFileInputChange={handleFileInputChange}
                handleUpdateProfileImage={handleUpdateProfileImage}
                handleUpdateProfileimg={profileImageUpdate}
            />
            <TrainerBannerCropImg
                trigger={showBannerCropPopup}
                setTrigger={setShowBannerCropPopup}
                handleFileInputChange={handleFileInputChange}
                handleUpdateBannerImage={handleUpdateBannerImage}
                handleUpdateBannerImg={profileBannerUpdate}
            />

            <div className="updatedatas">
                <h6
                    style={{
                        color: "#535353",
                        fontWeight: "400",
                        fontSize: "18px",
                        marginTop: "14px",
                        marginBottom: "30px",
                    }}
                >
                    Basic Information
                </h6>

                <div className="flex">
                    <div className="updateval">
                        <img
                            src={
                                trainer?.trainerDetails?.basicInfo?.profileImg
                                    ? `${trainer?.trainerDetails?.basicInfo?.profileImg}`
                                    : ""
                            }
                            style={{
                                borderRadius: "50%",
                                width: "100px",
                                height: "100px",
                                border: "0.5px solid rgba(227, 227, 227)",
                                backgroundColor: "rgba(227, 227, 227, 0.5)",
                            }}
                            alt=" "
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileInputChange(e, "prfile")}
                            ref={profileImg}
                            style={{ display: "none" }}
                            accept="image/*"
                            required
                        />

                        <div
                            onClick={() => setShowProfileCropPopup(true)}
                            className="hoverItems  flex items-center mt-2"
                        >
                            <h6
                                style={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    color: "#2676C2",
                                    marginRight: "5px",
                                }}
                            >
                                Replace
                            </h6>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0 8.96548V10.3103C0 11.7959 1.20408 13 2.68968 13C4.47025 13 7.18503 13 8.96559 13C10.4512 13 11.6553 11.7959 11.6553 10.3103C11.6553 9.60742 11.6553 8.96548 11.6553 8.96548C11.6553 8.47058 11.2536 8.06892 10.7587 8.06892C10.2638 8.06892 9.86215 8.47058 9.86215 8.96548V10.3103C9.86215 10.8057 9.46094 11.2069 8.96559 11.2069C7.18503 11.2069 4.47025 11.2069 2.68968 11.2069C2.19433 11.2069 1.79312 10.8057 1.79312 10.3103V8.96548C1.79312 8.47058 1.39146 8.06892 0.896559 8.06892C0.401659 8.06892 0 8.47058 0 8.96548ZM4.93108 3.06074V8.96548C4.93108 9.46038 5.33274 9.86204 5.82764 9.86204C6.32254 9.86204 6.7242 9.46038 6.7242 8.96548V3.06074L7.43517 3.77171C7.78482 4.12182 8.35324 4.12182 8.7029 3.77171C9.05301 3.42206 9.05301 2.85364 8.7029 2.50398L6.4615 0.26258C6.1114 -0.0875266 5.54387 -0.0875266 5.19377 0.26258L2.95237 2.50398C2.60226 2.85364 2.60226 3.42206 2.95237 3.77171C3.30203 4.12182 3.87045 4.12182 4.22011 3.77171L4.93108 3.06074Z"
                                    fill="#2676C2"
                                />
                            </svg>
                        </div>
                        <h6
                            className="mt-2"
                            style={{
                                color: "#979797",
                                fontWeight: "400",
                                fontSize: "12px",
                            }}
                        >
                            max-size (1024KB*)
                        </h6>
                        <hr style={{ marginTop: "12px", marginBottom: "12px" }} />
                        <img
                            src={
                                trainer?.trainerDetails?.basicInfo?.profileBanner
                                    ? `${trainer?.trainerDetails?.basicInfo?.profileBanner}`
                                    : ""
                            }
                            alt=" "
                            style={{
                                width: "150px",
                                height: "42px",
                                backgroundColor: "rgba(227, 227, 227)",
                            }}
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileInputChange(e, "banner")}
                            ref={profileBanner}
                            style={{ display: "none" }}
                            accept="image/*"
                            required
                        />
                        <div
                            onClick={() => setShowBannerCropPopup(true)}
                            className="hoverItems flex items-center mt-2"
                        >
                            <h6
                                style={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    color: "#2676C2",
                                    marginRight: "5px",
                                }}
                            >
                                Replace
                            </h6>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0 8.96548V10.3103C0 11.7959 1.20408 13 2.68968 13C4.47025 13 7.18503 13 8.96559 13C10.4512 13 11.6553 11.7959 11.6553 10.3103C11.6553 9.60742 11.6553 8.96548 11.6553 8.96548C11.6553 8.47058 11.2536 8.06892 10.7587 8.06892C10.2638 8.06892 9.86215 8.47058 9.86215 8.96548V10.3103C9.86215 10.8057 9.46094 11.2069 8.96559 11.2069C7.18503 11.2069 4.47025 11.2069 2.68968 11.2069C2.19433 11.2069 1.79312 10.8057 1.79312 10.3103V8.96548C1.79312 8.47058 1.39146 8.06892 0.896559 8.06892C0.401659 8.06892 0 8.47058 0 8.96548ZM4.93108 3.06074V8.96548C4.93108 9.46038 5.33274 9.86204 5.82764 9.86204C6.32254 9.86204 6.7242 9.46038 6.7242 8.96548V3.06074L7.43517 3.77171C7.78482 4.12182 8.35324 4.12182 8.7029 3.77171C9.05301 3.42206 9.05301 2.85364 8.7029 2.50398L6.4615 0.26258C6.1114 -0.0875266 5.54387 -0.0875266 5.19377 0.26258L2.95237 2.50398C2.60226 2.85364 2.60226 3.42206 2.95237 3.77171C3.30203 4.12182 3.87045 4.12182 4.22011 3.77171L4.93108 3.06074Z"
                                    fill="#2676C2"
                                />
                            </svg>
                        </div>
                        <h6
                            className="mt-2"
                            style={{
                                color: "#979797",
                                fontWeight: "400",
                                fontSize: "12px",
                            }}
                        >
                            max-size (1024KB*)
                        </h6>
                    </div>
                    <form onSubmit={handleCase0Data}>
                        <div className="updateLabel">
                            <div className="flex">
                                <div style={{ marginRight: "30px" }}>
                                    <label htmlFor="">First Name *</label>
                                    <br />
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={handleChange(setFirstName, /^[a-zA-Z\s]*$/)}
                                        name="firstName"
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type your First Name"
                                        required
                                        maxLength="32"
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Last Name</label>
                                    <br />
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={handleChange(setLastName, /^[a-zA-Z\s]*$/)}
                                        name="lastName"
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type your Last Name"
                                        maxLength="32"
                                        autoComplete="off"

                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="">Designation <span className="text-[#CECECE]">(eg: Freelancer, Corporate Trainer)</span>*</label>
                                <br />
                                <input
                                    style={{ width: "508px" }}
                                    type="text"
                                    value={designation}
                                    onChange={handleChange(setDesignation, /^[a-zA-Z\s]*$/)}
                                    name="designation"
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your Occupation"
                                    required
                                    maxLength="32"
                                    autoComplete="off"

                                />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="">Company</label>
                                <br />
                                <input
                                    style={{ width: "508px" }}
                                    type="text"
                                    value={company}
                                    onChange={(e) => setComapany(e.target.value)}
                                    name="company"
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your Company Name"
                                    maxLength="42"
                                    autoComplete="off"

                                />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="">Age <span className="text-[#CECECE]">(eg: 21-60)</span></label>
                                <br />
                                <input
                                    style={{ width: "508px" }}
                                    type="number"
                                    value={age}
                                    onChange={handleChange(setAge, /^[0-9]*$/, 'age', 3)}
                                    name="age"
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your age"
                                    min="21"
                                    max="60"
                                    maxLength="3"
                                    autoComplete="off"

                                />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="">Location *</label>
                                <br />
                                <select name="location" id="State" value={location} onChange={(e) => setLocation(e.target.value)} required>
                                    <option value="">Select Location</option>
                                    {states.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="">Objective</label>
                                <br />
                                <input
                                    style={{ width: "508px" }}
                                    type="text"
                                    value={objective}
                                    onChange={handleObjectiveChange}
                                    name="objective"
                                    onKeyDown={handleKeyDown}
                                    placeholder="Profile title"
                                    maxLength="32"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="">About you</label>
                                <textarea
                                    value={aboutYou}
                                    onChange={(e) => setAboutYou(e.target.value)}
                                    name="aboutYou"
                                    id=""
                                    cols="67"
                                    rows="5"
                                    placeholder="Type here"
                                    maxLength="1020"
                                    autoComplete="off"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                style={{
                                    padding: "8px 70px",
                                    backgroundColor: "#2676C2",
                                    borderRadius: "10px",
                                    color: "white",
                                    marginTop: "20px",
                                    marginLeft: "315px",
                                    marginBottom: "20px",
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TrainerBasicInfo;