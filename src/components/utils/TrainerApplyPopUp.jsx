import React, { useEffect, useState } from "react";
import "../styles/TrainerApplyPopup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {trainerAppliedTraining} from '../../redux/action/trainer.action'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'

function TrainerApplyPopup(props) {
const { trigger, setTrigger, selectedPost,trainderId } = props;
// console.log(trigger)

const [isActiveOnline, setActiveOnline] = useState(false);
const [isActiveOffline, setActiveOffline] = useState(true);
const [availableDate1, setAvailableDate1] = useState(null)
const [availableDate2, setAvailableDate2] = useState(null)
const [availableDate3, setAvailableDate3] = useState(null)
const [isFocused1, setIsFocused1] = useState(true);
const [isFocused2, setIsFocused2] = useState(false);
const [isFocused3, setIsFocused3] = useState(false);
const[trainingMode,setTrainingMode]=useState('Offline')
const disptach=useDispatch()
const toggleActiveOnline = () => {
setTrainingMode('Online')
setActiveOnline(!isActiveOnline);
setActiveOffline(false)
};
const toggleActiveOffline = () => {
setTrainingMode('Offline')
setActiveOffline(!isActiveOffline);
setActiveOnline(false)
};
const downloadFileHandler = async () => {
const fileData = selectedPost?.tocFile?.fileData?.data;
const buffer = new Uint8Array(fileData).buffer;
const bufferBlob = new Blob([buffer], { type: "application/octet-stream" });
const fileReader = new FileReader();
fileReader.onload = () => {
const arrayBuffer = fileReader.result;
const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
try {
  const url = window.URL.createObjectURL(blob);
  const link = createDownloadLink(url, selectedPost?.tocFile?.tocFileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
} catch (error) {
  alert("An error occurred while downloading the file. Please try again later.");
}
};
fileReader.readAsArrayBuffer(bufferBlob);
}
const createDownloadLink = (href, downloadName) => {
const a = document.createElement("a");
a.href = href;
a.download = downloadName;
return a;
}
const trainer = useSelector(({ trainerSignUp }) => {
  return trainerSignUp?.trainerAppliedTraining ;
});
// console.log(trainer)


  



const handleAvailableData1 = (data) => {
setAvailableDate1(data)
setIsFocused1(true)
}
const handleAvailableData2 = (data) => {
setAvailableDate2(data)
}
const handleAvailableData3 = (data) => {
setAvailableDate3(data)
}
const trainingDetails={
trainerId:trainderId,
trainingDetails:{
  trainingPostDetails:selectedPost,
}
}
const  applyHandler=async()=>{

  await disptach(trainerAppliedTraining(selectedPost?._id,trainingDetails))
  // toast.success('Applied')
  if(trainer?.success){
    toast.success(trainer.message);
  }
  else{
    toast.error(trainer.message)
  }
  setTrigger(false)

}

return trigger ? (
<>
<div className="TrainerApplyPopup h-screen flex justify-center items-center ">
  <div className=" w-6/12 m-auto h-[80%] bg-white rounded-[20px]">
    <div
      className=" mr-[10px] mt-[10px] "
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <button
        onClick={() => {
          setTrigger(false);
        }}
        className="close font-[400] text-[20px] pr-[10px] "
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="#2676C2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="close">
            <path
              id="Vector"
              d="M8.48542 8.48528L16.9707 16.9706M16.9707 16.9706L25.456 25.4558M16.9707 16.9706L8.48542 25.4558M16.9707 16.9706L25.456 8.48528"
              stroke="#2676C2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </button>
    </div>

    <div className="w-full flex m-[10px] h-auto ">
      <div className="w-4/12 ml-[10px]">
        <div className="box1 pt-[10px] pl-[10px]">
          <div>
            <p>Comapny Name</p>
            <p style={{ color: "#2676c2" }} className="same">
              {selectedPost?.postedByCompanyName}
            </p>
          </div>
          <div>
            <p>Training Program Name </p>
            <p style={{ color: "#2676c2" }} className="same">
              {selectedPost?.trainingName}
            </p>
          </div>
          <div>
            <p>Training Topics & Subjects</p>
            {/* <p className="same">Java, Js, Python, React Native</p> */}
            <div className="flex   gap-2">

              {
                selectedPost?.topics?.slice(0, 5)?.map((topic) => {
                  return (
                    // <p className="flex">{topic}</p>
                    <div className="">
                      <p className="capitalize text-[#535353] text-sm">{topic},</p>
                    </div>
                  )
                })
              }

            </div>
            <div className="flex gap-2">
              {
                selectedPost?.topics?.slice(4, 10)?.map((topic) => {
                  return (
                    // <p className="flex">{topic}</p>
                    <div className="">
                      <p className="capitalize text-[#535353] text-sm">{topic},</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div>
            <p>Type Of Training</p>
            <p className="same">{selectedPost?.typeOfTraining}</p>
          </div>
          <div>
            <p>Duration Of Training</p>
            <p className="same">{selectedPost?.durationCount}</p>
          </div>
          <div className="flex gap-7">
            <div>
              <p>Start Date</p>
              <p className="same">{selectedPost?.startDate}</p>
            </div>
            <div>
              <p>End Date</p>
              {/* <p className="same">{selectedPost?.endDate}</p> */}
              <p className="same">{selectedPost?.endDate}</p>
            </div>
          </div>
 
        </div>
      </div>
      <div className="w-7/12 ml-[10px]">
        <div direction={"column"} spacing={1}>
          <div className="box2 pt-[10px] pl-[10px] flex flex-col gap-1">
            <p>Budget</p>
            <p className="same" style={{ color: "#2676c2" }}>
            <span>{selectedPost?.selectedCountry === 'IND' ? '₹' : '$'}</span> {selectedPost?.minBudget} - <span>{selectedPost?.selectedCountry === 'IND' ? '₹' : '$'}</span> {selectedPost?.maxBudget}
            </p>
            <p>Mode of Training</p>
            <p className="same" style={{ color: "#2676c2" }}>
              {selectedPost?.modeOfTraining}
            </p>
            <p>Description</p>
            <p
              className="scrollparagraph"
              style={{
                border: "1px solid #EEEEEE",
                borderRadius: "5px",
                color: "#888888",
                fontSize: "10px",
                height: "auto",
                overflow: "auto",
                background: "#EEEEEE",
                padding: "5px",
              }}
            >
              {selectedPost?.description}
            </p>
            <div className={`${selectedPost?.tocFile?.tocFileName ? "":"hidden"}`}>

            <p>TOC</p>
            <div className="flex gap-3 items-center">
              <div>
                <p
                  className="same "
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  {selectedPost?.tocFile?.tocFileName}
                </p>
              </div>
              <div className=" cursor-pointer" onClick={downloadFileHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="16"
                  viewBox="0 0 11 16"
                  fill="none"
                >
                  <path
                    d="M1 14.3333H9.88889M5.44444 1V11.3704M5.44444 11.3704L9.14815 7.66667M5.44444 11.3704L1.74074 7.66667"
                    stroke="#2676C2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            </div>
          </div>

          {/* <div className="box3 pt-[10px] pl-[10px] space-y-3">
            <p>Your Available Dates</p>
            <div
              className="mt-[10px] date-picker-container"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                fontSize: "11px",
                gap: "10px",
                color: "#888888",
              }}
            >
              <DatePicker
                className={`border outline-none rounded-full w-[100px] placeholder:text-center ${isFocused1
                  ? "border-[#2676c2] text-[#2676c2] placeholder:text-[#2676c2] text-center"
                  : "border-[#535353] text-[#535353] text-center"
                  }`}
                selected={availableDate1}
                onChange={handleAvailableData1}
                onFocus={() => setIsFocused1(true)}

                dateFormat="dd-MM-yyyy"
                placeholderText="DD/MM/YYYY"
              />
              <DatePicker
                className={`border outline-none rounded-full w-[100px] placeholder:text-center ${isFocused2
                  ? "border-[#2676c2] text-[#2676c2] placeholder:text-[#2676c2] text-center"
                  : "border-[#535353] text-[#535353]"
                  }`}
                selected={availableDate2}
                onChange={handleAvailableData2}
                onFocus={() => setIsFocused2(true)}

                dateFormat="dd-MM-yyyy"
                placeholderText="DD/MM/YYYY"
              />
              <DatePicker
                className={`border outline-none rounded-full w-[100px] placeholder:text-center ${isFocused3
                  ? "border-[#2676c2] text-[#2676c2] placeholder:text-[#2676c2] text-center"
                  : "border-[#535353] text-[#535353]"
                  }`}
                selected={availableDate3}
                onChange={handleAvailableData3}
                onFocus={() => setIsFocused3(true)}

                dateFormat="dd-MM-yyyy"
                placeholderText="DD/MM/YYYY"
              />
            </div>

            <div className="space-y-1">
              <p>Mode of Training</p>
            <p
              style={{
                display: "flex",
                justifyContent: "flex-start",
                fontSize: "11px",
                gap: "5px",
                color: "#888888",
              }}
            >
              <button
                className={isActiveOffline ? 'activebutton' : 'dates1'}
                onClick={toggleActiveOffline}
              >
                Offline
              </button>
              <button
                className={isActiveOnline ? 'activebutton' : 'dates1'}
                onClick={toggleActiveOnline}
              >
                Online
              </button>
            </p>

            </div>
          </div> */}
          
        </div>
    <div
      className="pb-[15px] h-auto mt-[15px] "
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <button
        onClick={applyHandler}
        style={{
          width: "183px",
          height: "38px",
          borderRadius: "8px",
          background: "#2676c2",
          outline: "none",
          border: "none",
          color: "#FFFFFF",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Confirm
      </button>
    </div>
      </div>
    </div>

  </div>
</div>
</>
) : null;
}

export default TrainerApplyPopup;