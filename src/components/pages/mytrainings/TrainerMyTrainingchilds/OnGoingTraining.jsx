import React, { useState } from "react";
import { addTrainingResources } from '../../../../redux/action/trainer.action'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileImage from "../../../utils/ProfileImage";

// Dummy data for ongoing training

const OngoingTraining = ({ ongoing }) => {
  console.log('ongoing', ongoing);
  const dispatach = useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentFileName, setCurrentFileName] = useState("");
  const [fileAttachment, setFileAttachment] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [activeSteps, setActiveSteps] = useState([1, 2]);
  const [fileData, setFileData] = useState([])
  const [seletedTraining, setSeletedTraining] = useState(null)
  const addFile = () => {
    setIsVisible(!isVisible);
  };
  const calculateProgressBarWidth = () => {
    const totalSteps = 3; // Update this based on the total number of steps
    const width = ((activeSteps.length - 1) / (totalSteps - 1)) * 100;
    return `${width}%`;
  };

  const removeFile = (index) => {
    const updatedFileNames = [...fileNames];
    const updatedFileData = [...fileData]
    updatedFileNames.splice(index, 1);
    updatedFileData.splice(index, 1);
    setFileNames(updatedFileNames);
    setFileData(updatedFileData);
  };

  const saveFile = async (trainingDetails) => {
    if (currentFileName && fileAttachment) {
      const newFile = { name: currentFileName, attachment: fileAttachment };
      setFileData([...fileData, newFile]);
      setFileNames([...fileNames, newFile]);
      setCurrentFileName("");
      setFileAttachment(null);
      setIsVisible(true);
      setSeletedTraining(trainingDetails)
      // console.log('fileName', newFile?.attachment?.name)
      console.log("File Uploaded:", newFile);
    }
  };
  console.log('filedata', fileData)

  const addresourcesHandler = () => {
    const formData = new FormData()
    fileData.map(({ name, attachment }) => {
      formData.append('fileName', name)
      formData.append('fileData', attachment)
      formData.append('fileOriginalName', attachment.name)
    })
    dispatach(addTrainingResources(seletedTraining, formData));
    setIsVisible(!isVisible);
  }
  const handleFileInputChange = (e) => {
    setFileAttachment(e.target.files[0]);
  };
  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {
        ongoing?.length > 0 ?
          <>
            {
              ongoing?.map(({ trainingPostDetails, _id }, index) => {
                return <div>
                  <div
                    key={index}
                    className="Training_Programm"
                    style={{ marginTop: "20px" }}
                  >
                    <div className="Trainer_Infoo">
                      <div className="TTTDD">
                        <p className='font-[600]'>Training Program Name</p>
                        <h3 className="Blue_H22">{trainingPostDetails?.trainingName}</h3>
                        <p className='font-[600]'>Company Name</p>
                        <h3 className="Blue_H22">{trainingPostDetails?.postedByCompanyName}</h3>
                        <p className='font-[600]'>Type Of Training</p>
                        <h2>{trainingPostDetails?.typeOfTraining}</h2>
                        <p className='font-[600]'>Duration Of Training</p>
                        <h2>{trainingPostDetails.durationCount} {trainingPostDetails?.durationType}{trainingPostDetails.durationCount > 0 ? "'s" : ""}</h2>
                        <div className="SDEDD">
                          <div className="SDD">
                            <p className='font-[600]'>Start Date</p>
                            <h2>{trainingPostDetails?.startDate}</h2>
                          </div>
                          <div className="EDD">
                            <p className='font-[600]'>End Date</p>
                            <h2>{trainingPostDetails?.endDate}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Program_Info">
                      <div
                        className="Stepper"
                        style={{ height: "2.5rem", marginTop: "1.5rem" }}
                      >
                        <div className="steps">
                          {[1, 2, 3].map((step) => (
                            <span
                              key={step}
                              className={`circle ${activeSteps.includes(step) ? "active" : ""
                                }`}
                            // onClick={() => handleStepClick(step)}
                            >
                              {step}
                            </span>
                          ))}
                          <div className="progress-bar">
                            <span
                              className="indicator"
                              style={{
                                width: calculateProgressBarWidth(), // Adjusted the calculation here
                              }}
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div className="Step2PS">
                        <h4>Program Status</h4>
                        <p>{`Started Date: ${trainingPostDetails?.createdAt?.slice(0, 10)}`}</p>
                      </div>
                      <div className="Program_Status">
                        <div className="Total_Parttt">
                          <h1
                            style={{
                              color: "#333",
                              fontFamily: "Poppins",
                              fontSize: "1.125rem",
                              fontStyle: "normal",
                              fontWeight: "600",
                              lineHeight: "normal",
                              margin: "0",
                            }}
                          >
                            Posted By
                          </h1>
                          <Link to={`/trainerDashboard/mytrainings/ongoing/employerprofilelist/${trainingPostDetails?.postedById}`}>
                            <div className="PBB">
                              {
                                trainingPostDetails?.postedByImg ?
                                  <img
                                    src={trainingPostDetails?.postedByImg}
                                    alt=""
                                    style={{
                                      borderRadius: "100%",
                                      width: "4rem",
                                      height: "4rem",
                                    }}
                                  />

                                  :
                                  <div className="w-[4rem] h-[4rem] rounded-full flex justify-center items-center bg-slate-500">
                                    <span className=" capitalize">
                                      {trainingPostDetails?.postedByName[0]}
                                    </span>
                                  </div>
                              }
                              <span>
                                <h2>{trainingPostDetails?.postedByName}</h2>
                                <p>{trainingPostDetails?.postedByCompanyName}</p>
                              </span>
                            </div>
                          </Link>
                          <p
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "1rem",
                              margin: "0%",
                            }}
                          >
                            Total Participant's
                          </p>
                          <div className="P205">
                            <h1>{trainingPostDetails.participantCount}</h1>
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <p>Mode</p>
                              <h2>{trainingPostDetails?.modeOfTraining}</h2>
                            </div>
                            {
                              trainingPostDetails?.modeOfTraining === 'offline' ?
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <p>Location</p>
                                  <h2>{trainingPostDetails?.location}</h2>
                                </div>
                                :
                                null
                            }
                          </div>
                        </div>
                        <div className="Notess">
                          <div
                            style={{
                              position: "relative",
                              height: "60px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={addFile}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="60"
                              height="60"
                              viewBox="0 0 60 60"
                              fill="none"
                              onClick={addFile}
                            >
                              <circle
                                cx="30"
                                cy="30"
                                r="30"
                                fill="#E8E8E8"
                                onClick={addFile}
                              />
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
                                  type="file"
                                />
                              </svg>
                            </span>
                            <div className="Step2content" onClick={addFile}>
                              <p onClick={addFile}>Click To Add Resources File</p>
                            </div>
                          </div>
                          {isVisible && (
                            <div className="overlay">
                              <div className="modalContainer">
                                <div className="header-modalContainer w-[94%] flex justify-between h-[10%]">
                                  <h3>Add Resource</h3>
                                  <div
                                    className={`svg-container ${isHovered ? "hovered" : ""
                                      }`}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    onClick={addFile}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="25"
                                      viewBox="0 0 34 34"
                                      fill="none"
                                      cursor="pointer"
                                      onClick={togglePopup}
                                    >
                                      <path
                                        d="M8.48347 8.48528L16.9688 16.9706M16.9688 16.9706L25.454 25.4558M16.9688 16.9706L8.48347 25.4558M16.9688 16.9706L25.454 8.48528"
                                        stroke="#2676C2"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                    <svg
                                      className={`background-circle ${isHovered ? "hovered" : ""
                                        }`}
                                      viewBox="0 0 34 34"
                                    >
                                      <circle cx="17" cy="17" r="16" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="addFileContainer">
                                  <div className="Name-AttachContainer">
                                    <div className="Name">
                                      <h1 className="fileNameTitle">Name Of File</h1>
                                      <input
                                        type="text"
                                        placeholder="Enter name of the file"
                                        value={currentFileName}
                                        onChange={(e) =>
                                          setCurrentFileName(e.target.value)
                                        }
                                        className="nameInput"
                                      />
                                      <h1 className="attachmentTitle">Attachment</h1>
                                      <div className="attachmentContainer">
                                        <label
                                          htmlFor="fileInput"
                                          className="attachmentText"
                                        >
                                          {fileAttachment ? (
                                            <div>
                                              <p>{fileAttachment.name} <span className="curzor-pointer text-[#2767C2] font-[poppins]">Replace</span></p>
                                            </div>
                                          ) : (
                                            <>
                                              <div style={{ position: "relative" }}>
                                                {/* Background circle */}
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="40"
                                                  height="40"
                                                  viewBox="0 0 40 40"
                                                  fill="#ffffff"
                                                  style={{ zIndex: 10 }}
                                                >
                                                  <circle cx="20" cy="20" r="20" fill="#E8E8E8" />
                                                </svg>

                                                {/* Plus icon */}
                                                <span
                                                  style={{
                                                    zIndex: 12,
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                  }}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 28 28"
                                                    fill="none"
                                                    style={{ zIndex: 121 }}
                                                  >
                                                    <path
                                                      d="M14 26.7277V13.9999M14 13.9999V1.27197M14 13.9999H26.728M14 13.9999H1.27207"
                                                      stroke="white"
                                                      stroke-width="2"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      type="file"
                                                    />
                                                  </svg>
                                                </span>
                                              </div>

                                              <div className="clickToAddFile">
                                                <h1>Attach file</h1>
                                              </div>
                                            </>
                                          )}
                                          <input
                                            type="file"
                                            id="fileInput"
                                            onChange={handleFileInputChange}
                                            className="attachmentInput"
                                            style={{ display: "none" }}
                                          />
                                        </label>
                                      </div>

                                      <div className="saveButtonContainer">
                                        <button
                                          onClick={() => { saveFile(_id) }}
                                          className="saveButton"
                                          disabled={!currentFileName || !fileAttachment}
                                        >
                                          save
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="fileListContainer">
                                    <div className="fileList">
                                      {fileNames.map(({ name }, index) => (
                                        <div
                                          key={index}
                                          style={{
                                            width: "100%",
                                            height: "25px",
                                            color: "#2676c2",
                                            background: "#2676c233",
                                            padding: "0 10px",
                                            fontFamily: "Poppins",
                                            fontSize: "16px",
                                            fontWeight: "400",
                                            lineHeight: "18px",
                                            letterSpacing: "0em",
                                            textAlign: "left",
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: "10px",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <span>{name}</span>
                                          <button onClick={() => removeFile(index)}>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="20"
                                              height="20"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              style={{ cursor: "pointer" }}
                                              onClick={() => removeFile(index)}
                                            >
                                              <line x1="18" y1="6" x2="6" y2="18" />
                                              <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="uploadButtonContainer">
                                      <button onClick={addresourcesHandler} className="uploadButton">Upload</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </>
          :
          <div className='flex justify-center items-center h-[300px] w-full bg-slate-300 mt-[30px] rounded-md'>
            <h1 className='items-center'>No Ongoing Trainings Avaiable !</h1>
          </div>
      }

    </>

  );
};

export default OngoingTraining;
