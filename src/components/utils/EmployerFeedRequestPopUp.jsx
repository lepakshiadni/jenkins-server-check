import React, { useState,useEffect } from "react";
import Axios from 'axios';
import image8 from "../assets/profileTrainer.png";
import Rating from "@mui/material/Rating";
import { Avatar, Stack, styled } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Slider from "@mui/material/Slider";
import rect from "../assets/react.png";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "../styles/EmpFeedRequestPopup.css";
import { keyframes } from '@mui/material';
import {getPostTrainingRequirementAction} from '../../redux/action/postRequirement.action';
import {addApplicationRequest} from '../../redux/action/employers.action';

const fillAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${(props) => (props.value / (props.max - props.min)) * 100}%;
  }
`;
const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#585858",
  "& .MuiSlider-rail": {
    backgroundColor: "#2676c2",
  },
  "& .MuiSlider-track": {

    transition: "width 0.5s ease-out", // Add transition for width change
    animation: `${fillAnimation} 0.8s ease `, // Add the animation to the track
  },
  "& .MuiSlider-thumb": {
    display: "none", // Hide the slider button
  },
  "&:hover .MuiSlider-track": {
    backgroundColor: "#2676c2", // Change color on hover
  },
}));

const EmployerFeedRequestPopUp = (props) => {
  const { trigger, setTrigger,id } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const baseUrl =localStorage.getItem('baseUrl')
  const [seletedUser,setSeletedUser]=useState(null)
  const data = [       
    {
      name: "William Does",
      company: "Tecnoz Corp.",
      description: "Awesome teacher!",
    },
    { name: "John Don", company: "ABC Inc.", description: "Great trainer!" },
    { name: "Jane Done", company: "XYZ Corp.", description: "Big Blastt!" },
    {
      name: "Jack Sparrow",
      company: "Zipro Tech.",
      description: "Fabulous Stanleyyy!",
    },
    // Add more data objects as needed
  ];
  useEffect(() => {
    Axios.get(`${baseUrl}/employer/getTrainerDetailsById/${id}`)
      .then((resp) => {
        setSeletedUser(resp.data?.trainerDetails)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratingValue, setRatingValue] = useState(3);

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
  };

  const handleForward = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handleBackward = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const currentData = data[currentIndex];

  //radio selected

  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const [value, setValue] = useState(2); // Initial value of the range slider

  const navigatePostRequirement = () => {
    navigate("/employerDashboard/postarequirements/post-training")
  };
  const [selectedTraining, setSelectedTraining] = useState(null)
  const postDetails = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails?.slice(0, 8)
  })
  useEffect(() => {
    dispatch(getPostTrainingRequirementAction())
  }, [dispatch])
  console.log(postDetails)
  const selectTrainingHandler = (training) => {
    setSelectedTraining(training)
  }
  const trainingDetails = {
    trainingPostDetails: selectedTraining
  }
  const addApplicationRequestHanlder = () => {
    if (selectedTraining === null) {
      alert("Please Select a Training from Listing!")
    }
    else {
      dispatch(addApplicationRequest(seletedUser, trainingDetails))
    }

  }
  console.log('selectedUser', seletedUser)
  console.log('moundted popu')


  return trigger ? (
    <div className="requestPopUp">
      <div className="requestContainer">
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative", bottom: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
              }}
            >
              <p style={{ fontSize: "18px", fontWeight: "500px" }}>
                About Trainers
              </p>
              <CloseIcon
                sx={{
                  position: "relative",
                  left: "448px",
                  fontSize: "xx-large",
                  color: "#2676c2",
                  cursor: "pointer",
                }}
                onClick={() => props.setTrigger(false)}
              />
            </div>
            <div className="name2">
              <img
                src={image8}
                alt=""
                width={93.53}
                height={109.94}
                style={{ border: "none", outline: "none" }}
              />
              <div className="name-details2">
                <p
                  style={{
                    color: "#2676c2",
                    fontSize: "20px",
                    fontWeight: "500px",
                  }}
                >
                  Kowshik
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "400px",
                    color: "rgba(106, 106, 106, 1)",
                  }}
                >
                  UI UX Developer
                </p>
              </div>
            </div>
            <div className="downbox2">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "400px",
                    color: "rgba(106, 106, 106, 1)",
                  }}
                >
                  {ratingValue}/5
                </p>
                <Rating
                  name="size-large"
                  value={ratingValue}
                  id="rating"
                  sx={{ fontSize: "45px" }}
                  onChange={handleRatingChange}
                />
              </div>
            </div>
          </div>
          <div className="sidebox2">
            <Stack direction={"column"} spacing={2} sx={{ margin: "10px" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "rgba(83, 83, 83, 1)",
                }}
              >
                Skills
              </p>
              <Stack direction={"row"} spacing={2}>
                <img src={rect} alt="" width={30} height={30} />{" "}

                <CustomSlider
                  value={(value / 18) * 100 > 50 ? 100 - ((value / 15) * 100 - 50) * 2 : (value / 15) * 100}
                  valueLabelDisplay="off"
                  step={value > 5 ? 2 : 1}
                  marks={false}
                  min={0}
                  max={20}
                  sx={{
                    width: "333px",
                    height: "7px",
                    color: "#2676C2",
                  }}
                />

              </Stack>
              {/* <Stack direction={"row"} spacing={2}>
                <img src={pythn} alt="" width={30} height={30} />
                <CustomSlider
                  // aria-label="Temperature"
                  defaultValue={34}
                  // getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={5}
                  marks={false}
                  min={10}
                  max={100}
                  sx={{
                    width: "333px",
                    height: "7px",
                    color: "#2676C2",
                  }}
                />
              </Stack>
              
              <Stack direction={"row"} spacing={2}>
                <img src={Fd} alt="" width={30} height={30} />
                <CustomSlider
                  // aria-label="Temperature"
                  defaultValue={80}
                  // getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={5}
                  marks={false}
                  min={10}
                  max={100}
                  sx={{
                    width: "333px",
                    height: "7px",
                    color: "#2676C2",
                  }}
                />
              </Stack> */}
            </Stack>
          </div>{" "}
          <br />
        </div>
        <div className="bottom-boxes2">
          <div className="box12">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "320px",
              }}
            >
              <KeyboardBackspaceIcon
                id="foricon12"
                onClick={handleBackward}
                style={{
                  transitionDelay: "1s",
                  transitionDuration: "3s",
                  cursor: "pointer",
                }}
              />
              <Avatar src="" />
              <KeyboardBackspaceIcon
                id="foricon22"
                onClick={handleForward}
                style={{
                  transitionDelay: "2s",
                  transitionDuration: "3s",
                  cursor: "pointer",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "500px",
                color: "rgba(51, 51, 51, 1)",
              }}
            >
              {currentData.name}
            </p>
            <p
              className="box1-content-down"
              style={{
                fontSize: "12px",
                fontWeight: "500px",
                color: "rgba(83, 83, 83, 1)",
              }}
            >
              {currentData.company}
            </p>
            <div
              className="box1-content-down"
              style={{
                fontSize: "12px",
                color: "rgba(83, 83, 83, 1)",
                fontWeight: "400px",
                textAlign: "center",
              }}
            >
              {currentData.description}
            </div>
            <Rating name="size-medium" defaultValue={2} />
          </div>
          <div className="box22">
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Post requirements{" "}
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "500px",
                  color: "#2676c2",
                }}
              >
                Create Post +
              </p>
            </p>{" "}
            <br />
            <div className="radios2">
              <label htmlFor="">
                <input
                  type="radio"
                  name="slctone"
                  value="UIUX Training"
                  onChange={() => handleRadioChange("UIUX Training")}
                />
                <span
                  style={{
                    color:
                      selectedOption === "UIUX Training"
                        ? "#2676c2"
                        : "inherit",
                  }}
                >
                  UIUX Training
                </span>
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="slctone"
                  value="HR Training"
                  onChange={() => handleRadioChange("HR Training")}
                />
                <span
                  style={{
                    color:
                      selectedOption === "HR Training" ? "#2676c2" : "inherit",
                  }}
                >
                  HR Training
                </span>
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="slctone"
                  value="Product Manager Training"
                  onChange={() => handleRadioChange("Product Manager Training")}
                />
                <span
                  style={{
                    color:
                      selectedOption === "Product Manager Training"
                        ? "#2676c2"
                        : "inherit",
                  }}
                >
                  Product Manager Training
                </span>
              </label>
              {/* </div> */}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button className="buttonn2"> Send request </button>
            </div>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  ) : (
    ""
  );
};

export default EmployerFeedRequestPopUp;
