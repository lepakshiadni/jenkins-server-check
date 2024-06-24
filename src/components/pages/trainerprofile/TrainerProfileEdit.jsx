import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "../../styles/TrainerProfileEdit.css";
import vector from "../../assets/Vector.svg";
import CropImage from "./trainerprofileedit/CropingImage";
import SquareCropImg from "./trainerprofileedit/SquareCrop";
import TrainerHeader from "../../header&footer/TrainerHeader";
import { useNavigate } from "react-router-dom";
import {
  trainerBasicInfoUpdate,
  trainerProfileImgUpdate,
  trainerSkillsUpdate,
  trainerProfileBannerUpdate,
  trainerCertificateUpdate,
  trainerContactInfoUpdate,
  trainerExperienceInfoUpdate,
  trainerDetails,
  deleteTrainerCertificate,
  getSkillsData
} from "../../../redux/action/trainer.action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const UpdateProfile = () => {
  const baseUrl = localStorage.getItem('baseUrl')
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

  const [selectedOption, setSelectedOption] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };
  //croping and popup in basicinfo

  const [profileImage, setProfileImage] = useState();
  const [banermage, setBanerImage] = useState();
  const [showProfileCropPopup, setShowProfileCropPopup] = useState(false);
  const [showBannerCropPopup, setShowBannerCropPopup] = useState(false);

  useEffect(() => {
    dispatch(trainerDetails());
    dispatch(getSkillsData());
  }, [dispatch]);

  const trainer = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails?.trainerDetails;
  });

  const message = useSelector(({ trainerSignUp }) => trainerSignUp?.trainerDetails?.message);
  console.log(message);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

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



  const skillDataVal = useSelector(({ employerSignUp }) => {
    return employerSignUp?.skillData;
  });

  useEffect(() => {
    if (skillDataVal?.success) {
      setFilteredItems(skillDataVal?.skills);
    }
  }, [skillDataVal]);

  const [filteredItems, setFilteredItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  // Moved filtering logic inside a useEffect to update state with filtered items
  useEffect(() => {
    if (searchQuery !== "") {
      const filtered = skillDataVal?.skills.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(skillDataVal?.skills);
    }
  }, [searchQuery, skillDataVal]);

  const [clickedTitles, setClickedTitles] = useState(trainer?.skills || []);

  useLayoutEffect(() => {
    if (trainer?.skills) {
      setClickedTitles(trainer?.skills);
    }
  }, [trainer?.skills]);

  const handleItemClick = (itemName, itemImage) => {
    const newItem = { name: itemName, image: itemImage };
    const alreadyClicked = clickedTitles.some((item) => item.name === itemName);

    if (!alreadyClicked) {
      setClickedTitles((prevTitles) => [...prevTitles, newItem]);
    } else if (
      searchQuery &&
      !filteredItems.some((item) => item.name.toLowerCase() === searchQuery.toLowerCase())
    ) {
      setClickedTitles((prevTitles) => [
        ...prevTitles,
        { name: searchQuery, image: null },
      ]);
    }
    setSearchQuery("");
  };

  const handleEnterKeyPressed = () => {
    if (
      searchQuery.trim() !== "" &&
      !filteredItems.some(
        (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
      )
    ) {
      setClickedTitles((prevTitles) => [
        ...prevTitles,
        { name: searchQuery, image: null },
      ]);
      setSearchQuery("");
    }
  };

  const handleItemClose = (index) => {
    const newTitles = [...clickedTitles];
    newTitles.splice(index, 1);
    setClickedTitles(newTitles);
  };

  const handleItemChange = (index, value) => {
    const updatedTitles = [...clickedTitles];
    updatedTitles[index] = value;
    setClickedTitles(updatedTitles);
  };


  //image file drop and drag

  let certificateImg = useRef(null);
  const [labelText, setLabelText] = useState();
  const [labelTextName, setLabelTextName] = useState(false);

  const [certificateData, setCertificateData] = useState({
    certificateHead: "",
    institution: "",
    certificationDescription: "",
    certificateImg: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const newImage = event.target.result;
        setCertificateData((prevData) => ({
          ...prevData,
          image: newImage,
          certificateImg: file,
        }));
      };

      reader.readAsDataURL(file);
      setLabelText(file.name);
      setLabelTextName(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const newImage = event.target.result;
        setCertificateData((prevData) => ({ ...prevData, image: newImage }));
      };

      reader.readAsDataURL(file);
      setLabelText(file.name);
      setLabelTextName(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateData((prevData) => ({ ...prevData, [name]: value }));
  };

  //preview data storing

  const [storedData, setStoredData] = useState([]);

  const handleSubmit = () => {
    setStoredData((prevStoredData) => [...prevStoredData, certificateData]);
    setCertificateData({
      certificateHead: "",
      institution: "",
      certificationDescription: "",
      certificateImg: "",
    });
    setLabelTextName(false);
    toast.success('data added')
    handleSubmitReset();
  };

  const handleSubmitReset = () => {
    // Reset other form fields
    certificateHead.current.value = "";
    institution.current.value = "";
    certificationDescription.current.value = "";
    // Reset file input by clearing its value
    setLabelText("");
    setLabelTextName(false);
    certificateImg.current.value = null; // Clear the input value
  };

  const handlePreviewData = () => {
    setCertificateData({
      certificateHead: "",
      institution: "",
      certificationDescription: "",
      certificateImg: "",
    });
    handleSubmitReset();
  };

 


  const [firstName, setFirstName] = useState(trainer?.basicInfo?.fileName || trainer?.fullName?.split( ' ' )[0]);
  const [lastName, setLastName] = useState(trainer?.basicInfo?.lastName || trainer?.fullName?.split( ' ' )[1]);
  const [designation, setDesignation] = useState(trainer?.basicInfo?.designation || "");
  const [company, setComapany] = useState(trainer?.basicInfo?.company || "");
  const [age, setAge] = useState(trainer?.basicInfo?.age || "");
  const [location, setLocation] = useState(trainer?.basicInfo?.location || "");
  const [objective, setObjective] = useState(trainer?.basicInfo?.objective || "");
  const [aboutYou, setAboutYou] = useState(trainer?.basicInfo?.aboutYou || "");
  const [primaryNumber, setPrimaryNumber] = useState(trainer?.contactInfo?.primaryNumber || "");
  const [secondaryNumber, setSecondaryNumber] = useState(trainer?.contactInfo?.secondaryNumber || "");
  const [address, setAddress] = useState(trainer?.contactInfo?.address || "");
  const [email, setEmail] = useState(trainer?.contactInfo?.email || "");
  const [website, setWebsite] = useState(trainer?.contactInfo?.website || "");
  const [availableDate, setAvailableDate] = useState(trainer?.contactInfo?.availableDate || "");
  const [expertIn, setExpertIn] = useState(trainer?.experiences?.expertIn || "");
  const [experience, setExperience] = useState(trainer?.experiences?.experience || "");
  const [sinceInTheFiled, setSinceInTheFiled] = useState(trainer?.experiences?.sinceInTheFiled || "");
  const [recentCompany, setRecentCompany] = useState(trainer?.experiences?.recentCompany || "");
  const [trainingSession, setTrainingSession] = useState(trainer?.experiences?.trainingSession || '')

  const skillRef = useRef();

  const certificateHead = useRef();
  const institution = useRef();
  const certificationDescription = useRef();

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
      } else if (e.target.name === "primaryNumber") {
        document.querySelector("[name=secondaryNumber]").focus();
      } else if (e.target.name === "secondaryNumber") {
        document.querySelector("[name=address]").focus();
      } else if (e.target.name === "address") {
        document.querySelector("[name=email]").focus();
      } else if (e.target.name === "email") {
        document.querySelector("[name=website]").focus();
      } else if (e.target.name === "expertIn") {
        document.querySelector("[name=experience]").focus();
      } else if (e.target.name === "experience") {
        document.querySelector("[name=sinceInTheFiled]").focus();
      } else if (e.target.name === "sinceInTheFiled") {
        document.querySelector("[name=recentCompany]").focus();
      } else if (e.target === certificateHead.current) {
        institution.current.focus();
      } else if (e.target === institution.current) {
        certificationDescription.current.focus();
      }
    }
  };

  useLayoutEffect(() => {
    if (trainer) {
      setFirstName(trainer?.basicInfo?.firstName);
      setLastName(trainer?.basicInfo?.lastName);
      setDesignation(trainer?.basicInfo?.designation);
      setComapany(trainer?.basicInfo?.company);
      setAge(trainer?.basicInfo?.age);
      setLocation(trainer?.basicInfo?.location);
      setObjective(trainer?.basicInfo?.objective);
      setAboutYou(trainer?.basicInfo?.aboutYou);
      setPrimaryNumber(trainer?.contactInfo?.primaryNumber);
      setSecondaryNumber(trainer?.contactInfo?.secondaryNumber);
      setAddress(trainer?.contactInfo?.address);
      setEmail(trainer?.contactInfo?.email);
      setWebsite(trainer?.contactInfo?.website);
      setAvailableDate(trainer?.contactInfo?.availableDate)
      setExpertIn(trainer?.experiences?.expertIn);
      setExperience(trainer?.experiences?.experience);
      setSinceInTheFiled(trainer?.experiences?.sinceInTheFiled);
      setRecentCompany(trainer?.experiences?.recentCompany);
      setTrainingSession(trainer?.experiences?.trainingSession)
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
    formData.append("company", company);
    formData.append("age", age);
    formData.append("location", location);
    formData.append("objective", objective);
    formData.append("aboutYou", aboutYou);
    formData.append("status", true);
    console.log('firstName', firstName)

    dispatch(trainerBasicInfoUpdate(formData));

    handleOptionClick(1);
    // }
  };

  const handleCase1Data = () => {
    // const formDatas=new FormData()
    clickedTitles.forEach((skill) => skill);
    dispatch(trainerSkillsUpdate(clickedTitles));
    handleOptionClick(2);
  };

  const [formData, setFormData] = useState(new FormData());

  const handleCase2Data = (e) => {
    e.preventDefault();
    const file = certificateImg.current.files[0];

    if (file) {
      // Append form data to formData
      formData.append("certificateHead", certificateHead.current.value);
      formData.append("institution", institution.current.value);
      formData.append(
        "certificationDescription",
        certificationDescription.current.value
      );
      formData.append("certificateImg", file);
      formData.append("status", true);
      handleSubmit();
    } else {
      alert("No file selected");
    }
  };

  const handlecertificate = async () => {
    dispatch(trainerCertificateUpdate(formData));
    handleOptionClick(3)
  };

  const handleCase3Data = (e) => {
    e.preventDefault();

    const contactInfo = {
      primaryNumber: primaryNumber,
      secondaryNumber: secondaryNumber || null,
      address: address,
      email: email,
      website: website,
      availableDate: availableDate,
      status: true,
    };

    dispatch(trainerContactInfoUpdate(contactInfo));

    handleOptionClick(4);
  };
  const handleCase4Data = async () => {

    const experienceDetails = {
      expertIn: expertIn,
      experience: experience,
      sinceInTheFiled: sinceInTheFiled,
      recentCompany: recentCompany,
      trainingSession: trainingSession,
      status: true,
    };
    dispatch(trainerExperienceInfoUpdate(experienceDetails));

  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    await handleCase4Data();

  };

  const handleDelete = (_id) => {
    dispatch(deleteTrainerCertificate(_id));
  };

  // console.log(certificateData?.image?.toLowerCase()?.includes('application/pdf'))

  const getContentBasedOnOption = () => {
    window.scrollTo({ top: 0, behavior: "auto" });

    switch (selectedOption) {
      case 0:
        return (
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
                    trainer?.basicInfo?.profileImg
                      ? `${trainer?.basicInfo?.profileImg}`
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
                <hr style={{ marginTop: "12px", marginBottom: "12px" }} />
                <img
                  src={
                    trainer?.basicInfo?.profileBanner
                      ? `${trainer?.basicInfo?.profileBanner}`
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
                  size (837*197 Px)
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
                        onChange={(e) => setFirstName(e.target.value)}
                        name="firstName"
                        onKeyDown={handleKeyDown}
                        placeholder="Type your First Name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">Last Name</label>
                      <br />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        name="lastName"
                        onKeyDown={handleKeyDown}
                        placeholder="Type your Last Name"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="">Designation *</label>
                    <br />
                    <input
                      style={{ width: "508px" }}
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      name="designation"
                      onKeyDown={handleKeyDown}
                      placeholder="Type your Occupation"
                      required
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
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="">Age *</label>
                    <br />
                    <input
                      style={{ width: "508px" }}
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      name="age"
                      onKeyDown={handleKeyDown}
                      placeholder="Type your age"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="">Location *</label>
                    <br />
                    {/* <select
                      name=""
                      id=""
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="" selected>
                        select Location
                      </option>
                      <option value="Banglore">Banglore</option>
                      <option value="Manglore">Manglore</option>
                      <option value="Mysore">Mysore</option>
                    </select> */}
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
                      onChange={(e) => setObjective(e.target.value)}
                      name="objective"
                      onKeyDown={handleKeyDown}
                      placeholder="Profile title"
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
        );
      case 1:
        return (
          <div className="updatedatas2">
            <div className="flex justify-between items-center">
              <h6
                style={{
                  color: "#535353",
                  fontWeight: "400",
                  fontSize: "18px",
                  marginTop: "14px",
                }}
              >
                Skills
              </h6>

              <button
                style={{
                  padding: "8px 70px",
                  backgroundColor: "#2676C2",
                  borderRadius: "10px",
                  color: "white",
                  marginTop: "20px",
                  marginRight: "70px",
                  marginBottom: "20px",
                }}
                onClick={handleCase1Data}
              >
                Update
              </button>
            </div>
            <div className="flex ">
              <div className="skillScroll border-r-2">
                {clickedTitles.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mt-2 pt-1 pb-1 ps-2 pe-2 "
                    style={{
                      width: "180px",
                      backgroundColor: "rgba(38, 118, 194, 0.2)",
                      color: "#2676C2",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <h6 style={{ marginRight: "10%" }}>{item.name}</h6>
                    <input
                      ref={skillRef}
                      value={item.name}
                      type="text"
                      placeholder="Type your skills"
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      style={{ display: "none" }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      className="ms-3"
                      onClick={() => handleItemClose(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        d="M1.36373 1.94975L6.31348 6.89949M6.31348 6.89949L11.2632 11.8492M6.31348 6.89949L1.36373 11.8492M6.31348 6.89949L11.2632 1.94975"
                        stroke="#2676C2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="m-5 mt-0" style={{ width: '550px' }}>
                <div
                  className="flex items-center"
                  style={{
                    border: "2px solid #D1D1D1",
                    borderRadius: "5px",
                    width: "500px",
                  }}
                >
                  <input
                    style={{
                      width: "500px",
                      height: "40px",
                      color: "#888888",
                      borderLeft: "none",
                      cursor: "pointer",
                      border: "0",
                      fontSize: "14px",
                    }}
                    className="ps-3 outline-none mt-0"
                    type="text"
                    placeholder="Type your skills"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEnterKeyPressed();
                      }
                    }}
                  />
                  <svg
                    className=""
                    style={{ marginRight: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M17 17L25 25M10.3333 19.6667C5.17868 19.6667 1 15.488 1 10.3333C1 5.17868 5.17868 1 10.3333 1C15.488 1 19.6667 5.17868 19.6667 10.3333C19.6667 15.488 15.488 19.6667 10.3333 19.6667Z"
                      stroke="#888888"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                {filteredItems.length > 0 && (
                  <h6
                    style={{
                      fontSize: "18px",
                      fontWeight: "400",
                      color: "#535353",
                      marginTop: "20px",
                      marginBottom: "12px",
                    }}
                  >
                    Most Demanded Skills
                  </h6>
                )}
                <div className="skillData flex flex-wrap cursor-pointer justify-evenly">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <div
                        className="mt-5 me-6"
                        style={{ width: "130px" }}
                        key={index}
                        onClick={() => handleItemClick(item?.name, item?.image)}
                      >
                        <img
                          style={{
                            height: "147px",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                          }}
                          src={item?.image}
                          alt=""
                        />
                        <h6
                          style={{
                            fontSize: "14px",
                            color: "#535353",
                            marginTop: "10px",
                            fontWeight: "400",
                            display: "flex",
                          }}
                        >
                          {item.name}{" "}
                          <img
                            style={{ marginLeft: "10px" }}
                            src={vector}
                            alt=""
                          />
                        </h6>
                      </div>
                    ))
                  ) : (
                    <div style={{ marginTop: "100px" }}>No data found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="certificateData">
            <div className="flex justify-between items-center mb-[30px]">
              <h6
                style={{
                  color: "#535353",
                  fontWeight: "400",
                  fontSize: "18px",
                  marginTop: "14px",
                }}
              >
                Certifications
              </h6>
              <button
                onClick={handlecertificate}
                className="bg-[#2676c2] rounded-lg text-white pl-[70px] pr-[70px] pt-[8px] pb-[8px] mt-[10px]"
                disabled={!storedData.length > 0}
              >
                Update
              </button>
            </div>
            <div className="flex justify-between">
              <div>
                <label htmlFor=""> Heading for your Certificate *</label> <br />
                <input
                  type="text"
                  name="certificateHead"
                  placeholder="Type Headline"
                  value={certificateData.certificateHead}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  ref={certificateHead}
                  style={{ width: "370px" }}
                  required
                />
              </div>
              <div>
                <label htmlFor=""> Institution * </label> <br />
                <input
                  type="text"
                  name="institution"
                  placeholder="Type your Institution"
                  value={certificateData.institution}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  ref={institution}
                  style={{ width: "370px" }}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor=""> Description *</label> <br />
              <textarea
                name="certificationDescription"
                id=""
                cols="67"
                rows="5"
                placeholder="Type what you want"
                value={certificateData.certificationDescription}
                onChange={handleInputChange}
                ref={certificationDescription}
                style={{ whiteSpace: "pre-line" }}
                required
              >
                {" "}
              </textarea>
            </div>
            <div>
              <div
                className="flex items-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <label htmlFor="">Upload Certificates *</label> <br />
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={certificateImg}
                  onChange={handleFileChange}
                />
              </div>

              <div
                className="mt-2 mb-2"
                style={{
                  height: "150px",
                  width: "810px",
                  border: "1px solid #CECECE",
                  position: "relative",
                  borderRadius: "10px",
                  flexDirection: "column",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {!labelTextName ? (
                  <div
                    className=" flex items-center cursor-pointer"
                    style={{ height: "60px" }}
                    onClick={() => certificateImg.current.click()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <circle cx="30" cy="30" r="30" fill="#E8E8E8" />
                    </svg>
                    <span
                      style={{
                        zIndex: 1,
                        position: "absolute",
                        marginLeft: "16px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M14 26.7277V13.9999M14 13.9999V1.27197M14 13.9999H26.728M14 13.9999H1.27207"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <div
                      style={{
                        color: "#BABABA",
                        fontWeight: "400",
                        fontSize: "14px",
                        marginLeft: "10px",
                      }}
                    >
                      Click to add file
                    </div>
                  </div>
                ) : (
                  <div
                    className=" flex items-center "
                    style={{ height: "60px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <circle cx="30" cy="30" r="30" fill="#E8E8E8" />
                    </svg>
                    <span
                      style={{
                        zIndex: 1,
                        position: "absolute",
                        marginLeft: "20px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                      >
                        <path
                          d="M2.42859 17.0713C1.34436 15.987 0.802247 14.6907 0.802247 13.1822C0.802246 11.6737 1.34436 10.3773 2.42859 9.29309L9.85321 1.86847C10.631 1.09065 11.5738 0.70174 12.6816 0.70174C13.7894 0.70174 14.7323 1.09065 15.5101 1.86847C16.2879 2.64628 16.6768 3.58909 16.6768 4.69689C16.6768 5.80469 16.2879 6.7475 15.5101 7.52532L8.79255 14.2428C8.29758 14.7378 7.70832 14.9853 7.02479 14.9853C6.34125 14.9853 5.75199 14.7378 5.25702 14.2428C4.76204 13.7479 4.51456 13.1586 4.51456 12.4751C4.51456 11.7915 4.76204 11.2023 5.25702 10.7073L11.9745 3.98979L13.0352 5.05045L6.31768 11.768C6.11733 11.9683 6.01716 12.204 6.01716 12.4751C6.01716 12.7461 6.11733 12.9818 6.31768 13.1822C6.51803 13.3825 6.75373 13.4827 7.02479 13.4827C7.29584 13.4827 7.53155 13.3825 7.73189 13.1822L14.4494 6.46466C14.9444 5.96969 15.1919 5.38043 15.1919 4.69689C15.1919 4.01336 14.9444 3.4241 14.4494 2.92913C13.9544 2.43415 13.3652 2.18666 12.6816 2.18666C11.9981 2.18666 11.4088 2.43415 10.9139 2.92913L3.48925 10.3537C2.71143 11.1316 2.32253 12.0744 2.32253 13.1822C2.32253 14.29 2.71144 15.2328 3.48925 16.0106C4.26707 16.7884 5.20988 17.1773 6.31768 17.1773C7.42548 17.1773 8.36829 16.7884 9.14611 16.0106L16.5707 8.58598L17.6314 9.64664L10.2068 17.0713C9.12254 18.1555 7.82617 18.6976 6.31768 18.6976C4.80918 18.6976 3.51282 18.1555 2.42859 17.0713Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <div
                      style={{
                        color: "#BABABA",
                        fontWeight: "400",
                        fontSize: "14px",
                        marginLeft: "10px",
                      }}
                    >
                      {labelText}
                    </div>
                    <div
                      style={{
                        color: "#2676C2",
                        fontWeight: "400",
                        fontSize: "14px",
                        marginLeft: "10px",
                      }}
                      className="hoverItems"
                      onClick={() => certificateImg.current.click()}
                    >
                      Replace
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="">Preview </label> <br />
              <div className="previewCertifyData mt-2 mb-2 p-2 " style={{}}>
                {certificateData.certificateHead &&
                  certificateData.certificationDescription &&
                  certificateData.certificateImg && (
                    <div>
                      <h6
                        style={{
                          fontSize: "18px",
                          color: "#535353",
                          fontWeight: "500",
                          marginTop: "10px",
                        }}
                      >
                        Certifications
                      </h6>
                      <div className="flex items-center justify-between">
                        <h6
                          style={{
                            fontSize: "16px",
                            color: "#535353",
                            fontWeight: "500",
                            marginTop: "10px",
                          }}
                        >
                          {certificateData.heading}:
                          <span style={{ color: "#2676C2" }}>
                            {certificateData.institution}
                          </span>{" "}
                        </h6>
                        <span className="delete" onClick={handlePreviewData}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="22"
                            viewBox="0 0 20 22"
                            fill="none"
                          >
                            <path
                              d="M12.1111 8.77778V16.5556M7.66667 8.77778V16.5556M3.22222 4.33333V17.4444C3.22222 18.689 3.22222 19.3109 3.46443 19.7862C3.67748 20.2044 4.01719 20.545 4.43533 20.758C4.91022 21 5.53222 21 6.77434 21H13.0034C14.2456 21 14.8667 21 15.3416 20.758C15.7597 20.545 16.1005 20.2044 16.3136 19.7862C16.5556 19.3113 16.5556 18.69 16.5556 17.4479V4.33333M3.22222 4.33333H5.44444M3.22222 4.33333H1M5.44444 4.33333H14.3333M5.44444 4.33333C5.44444 3.29791 5.44444 2.78045 5.6136 2.37207C5.83914 1.82756 6.27147 1.3947 6.81597 1.16916C7.22435 1 7.74235 1 8.77778 1H11C12.0354 1 12.5531 1 12.9615 1.16916C13.506 1.3947 13.9385 1.82756 14.1641 2.37207C14.3332 2.78045 14.3333 3.29791 14.3333 4.33333M14.3333 4.33333H16.5556M16.5556 4.33333H18.7778"
                              stroke="#2676C2"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "16px",
                          color: "#535353",
                          fontWeight: "400",
                          marginTop: "10px",
                        }}
                      >
                        {certificateData.description}
                      </p>
                      {
                        certificateData?.image?.toLowerCase()?.includes('application/pdf') ? (
                         
                          <iframe
                            title="Certificate Preview"
                            style={{
                              width: "100%",
                              height: "600px",
                              overflow: "hidden",
                            }}
                            src={certificateData?.image}
                          />
                        )
                          :
                          (
                            <img alt="" src={certificateData?.image} className="w-full h-[600px]" />
                          )
                      }
                    </div>
                  )}
              </div>
              {certificateData.certificateHead &&
                certificateData.certificationDescription &&
                certificateData.certificateImg && (
                  <button
                    className=""
                    style={{
                      padding: "8px 70px",
                      backgroundColor: "#2676C2",
                      borderRadius: "10px",
                      color: "white",
                      marginTop: "10px",
                      marginLeft: "620px",
                      marginBottom: "20px",
                    }}
                    onClick={handleCase2Data}
                  >
                    Submit
                  </button>
                )}
            </div>
            <div>
              {trainer?.certificateDetails?.map((data, index) => (
                <div key={index}>
                  <div>
                    <h6
                      style={{
                        fontSize: "18px",
                        color: "#535353",
                        fontWeight: "500",
                        marginTop: "10px",
                      }}
                    >
                      Certifications
                    </h6>
                    <div className="flex items-center justify-between">
                      <h6
                        style={{
                          fontSize: "16px",
                          color: "#535353",
                          fontWeight: "500",
                          marginTop: "10px",
                        }}
                      >
                        {data.certificateHead}:{" "}
                        <span style={{ color: "#2676C2" }}>
                          {data.institution}
                        </span>
                      </h6>
                      <span
                        className="delete"
                        onClick={() => handleDelete(data._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="22"
                          viewBox="0 0 20 22"
                          fill="none"
                        >
                          <path
                            d="M12.1111 8.77778V16.5556M7.66667 8.77778V16.5556M3.22222 4.33333V17.4444C3.22222 18.689 3.22222 19.3109 3.46443 19.7862C3.67748 20.2044 4.01719 20.545 4.43533 20.758C4.91022 21 5.53222 21 6.77434 21H13.0034C14.2456 21 14.8667 21 15.3416 20.758C15.7597 20.545 16.1005 20.2044 16.3136 19.7862C16.5556 19.3113 16.5556 18.69 16.5556 17.4479V4.33333M3.22222 4.33333H5.44444M3.22222 4.33333H1M5.44444 4.33333H14.3333M5.44444 4.33333C5.44444 3.29791 5.44444 2.78045 5.6136 2.37207C5.83914 1.82756 6.27147 1.3947 6.81597 1.16916C7.22435 1 7.74235 1 8.77778 1H11C12.0354 1 12.5531 1 12.9615 1.16916C13.506 1.3947 13.9385 1.82756 14.1641 2.37207C14.3332 2.78045 14.3333 3.29791 14.3333 4.33333M14.3333 4.33333H16.5556M16.5556 4.33333H18.7778"
                            stroke="#2676C2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#535353",
                        fontWeight: "400",
                        marginTop: "10px",
                      }}
                    >
                      {data.certificationDescription}
                    </p>
                    {
                      data?.certificateUrl?.toLowerCase()?.endsWith('.pdf') ?
                        (
                          <iframe
                            src={data?.certificateUrl}
                            style={{
                              width: "100%",
                              height: "400px",
                              overflow: "hidden",
                            }}
                          />
                        )
                        :
                        (
                          <img
                            src={data?.certificateUrl}
                            className="w-full h-[400px]"
                          />
                        )
                    }
                  </div>
                  <hr className="m-5" />
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="contactInfo">
            <h6
              style={{
                color: "#535353",
                fontWeight: "400",
                fontSize: "18px",
                marginTop: "14px",
                marginBottom: "30px",
              }}
            >
              Contact Information
            </h6>

            <form onSubmit={handleCase3Data}>
              <div className="flex">
                <div style={{ marginRight: "50px" }}>
                  <label htmlFor="">Primary Contact *</label>
                  <br />
                  <input
                    type="tel"
                    maxLength="10"
                    minLength="10"
                    value={primaryNumber}
                    onChange={(e) => setPrimaryNumber(e.target.value)}
                    name="primaryNumber"
                    onKeyDown={handleKeyDown}
                    required
                    placeholder="Type your mobile number"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="">Secondary Contact</label>
                  <br />
                  <input
                    type="tel"
                    maxLength="10"
                    minLength="10"
                    value={secondaryNumber}
                    onChange={(e) => setSecondaryNumber(e.target.value)}
                    name="secondaryNumber"
                    onKeyDown={handleKeyDown}
                    placeholder="Type your mobile number"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="">Address *</label>
                <br />
                <input
                  style={{ width: "690px" }}
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="Type your address"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="">Email *</label>
                <br />
                <input
                  style={{ width: "690px" }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="Type your mail address"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="">Website </label>
                <br />
                <input
                  style={{ width: "690px" }}
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  name="website"
                  onKeyDown={handleKeyDown}
                  placeholder="Type website link here"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="">Availabel On </label>
                <br />
                <input
                  style={{ width: "250px", cursor: "pointer" }}
                  type="date"
                  value={availableDate}
                  onChange={(e) => setAvailableDate(e.target.value)}
                  name="availableDate"
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "8px 70px",
                  backgroundColor: "#2676C2",
                  borderRadius: "10px",
                  color: "white",
                  marginTop: "30px",
                  marginLeft: "490px",
                }}
              >
                Update
              </button>
            </form>
          </div>
        );
      case 4:
        return (
          <div className="contactInfo2">
            <h6
              style={{
                color: "#535353",
                fontWeight: "400",
                fontSize: "18px",
                marginTop: "14px",
                marginBottom: "30px",
              }}
            >
              Experience
            </h6>

            <form onSubmit={handleSubmitData}>
              <span>
                <label htmlFor="">Expert In *</label>
                <br />
                <input
                  style={{ width: "690px" }}
                  type="text"
                  value={expertIn}
                  onChange={(e) => setExpertIn(e.target.value)}
                  name="expertIn"
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your skill name"
                  required
                />
              </span>
              <br />
              <span>
                <label htmlFor="">Experience *</label>
                <br />
                <input
                  style={{ width: "690px" }}
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  name="experience"
                  onKeyDown={handleKeyDown}
                  placeholder="Select your experience"
                  required
                />
              </span>
              <br />
              <span>
                <label htmlFor="">Since in this field *</label>
                <br />
                <input
                  style={{ width: "690px" }}
                  type="number"
                  value={sinceInTheFiled}
                  onChange={(e) => setSinceInTheFiled(e.target.value)}
                  name="sinceInTheFiled"
                  onKeyDown={handleKeyDown}
                  placeholder="yyyy"
                  required
                />
              </span>
              <br />
              <span>
                <label htmlFor="">Last Organization </label>
                <br />
                <input
                  style={{ width: "690px" }}
                  type="text"
                  value={recentCompany}
                  onChange={(e) => setRecentCompany(e.target.value)}
                  name="recentCompany"
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your Last Organization"
                />
              </span>
              <span>
                <label htmlFor="">Training Session + </label>
                <br />
                <input
                  style={{ width: "690px" }}
                  type="text"
                  value={trainingSession}
                  onChange={(e) => setTrainingSession(e.target.value)}
                  name="recentCompany"
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your Training Count"
                />
              </span>
              <button
                type="submit"
                style={{
                  padding: "8px 70px",
                  backgroundColor: "#2676C2",
                  borderRadius: "10px",
                  color: "white",
                  marginTop: "30px",
                  marginLeft: "490px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <TrainerHeader />
      <CropImage
        trigger={showProfileCropPopup}
        setTrigger={setShowProfileCropPopup}
        handleFileInputChange={handleFileInputChange}
        handleUpdateProfileImage={handleUpdateProfileImage}
        handleUpdateProfileimg={profileImageUpdate}
      />
      <SquareCropImg
        trigger={showBannerCropPopup}
        setTrigger={setShowBannerCropPopup}
        handleFileInputChange={handleFileInputChange}
        handleUpdateBannerImage={handleUpdateBannerImage}
        handleUpdateBannerImg={profileBannerUpdate}
      />

      <div className="updatepage">
        <div className="updateContainer">
          <div
            onClick={() => {
              navigate("/trainerprofile");
            }}
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#888888",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              margin: "10px 0px ",
              position: "fixed",
              top: "120px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
            >
              <path
                d="M16 7.57143L0.999999 7.57143M0.999999 7.57143L7.42857 14M0.999999 7.57143L7.42857 1.14286"
                stroke="#888888"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3 style={{ marginLeft: "10px" }}>Back</h3>
          </div>
          <div
            className={`updateOptions ${selectedOption === 0 ? "selected" : ""
              }`}
            onClick={() => handleOptionClick(0)}
          >
            <div
              className="updateDiv"
              style={{ height: "67px", width: "7px" }}
            ></div>
            <h3 className="textHelp">Basic Information</h3>
          </div>
          <hr />

          <div
            className={`updateOptions ${selectedOption === 1 ? "selected" : ""
              }`}
            onClick={() => handleOptionClick(1)}
          >
            <div
              className="updateDiv"
              style={{ height: "67px", width: "7px" }}
            ></div>
            <h3 className="textHelp">Skills</h3>
          </div>
          <hr />

          <div
            className={`updateOptions ${selectedOption === 2 ? "selected" : ""
              }`}
            onClick={() => handleOptionClick(2)}
          >
            <div
              className="updateDiv"
              style={{ height: "67px", width: "7px" }}
            ></div>
            <h3 className="textHelp">Certifications</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${selectedOption === 3 ? "selected" : ""
              }`}
            onClick={() => handleOptionClick(3)}
          >
            <div
              className="updateDiv"
              style={{ height: "67px", width: "7px" }}
            ></div>
            <h3 className="textHelp">Contact Information</h3>
          </div>
          <hr />
          <div
            className={`updateOptions ${selectedOption === 4 ? "selected" : ""
              }`}
            onClick={() => handleOptionClick(4)}
          >
            <div
              className="updateDiv"
              style={{ height: "67px", width: "7px" }}
            ></div>
            <h3 className="textHelp">Experience</h3>
          </div>
        </div>
        <div className="updateContent">{getContentBasedOnOption()}</div>
      </div>
    </div>
  );
};

export default UpdateProfile;
