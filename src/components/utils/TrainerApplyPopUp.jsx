import React, { useEffect, useState } from "react";
import "../styles/TrainerApplyPopup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { trainerAppliedTraining } from '../../redux/action/trainer.action'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

function TrainerApplyPopup(props) {
  const { trigger, setTrigger, selectedPost, trainderId } = props;
  // console.log(trigger)


  const disptach = useDispatch()

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
    return trainerSignUp?.trainerAppliedTraining;
  });
  console.log("selectedPost", selectedPost)






  const trainingDetails = {
    trainerId: trainderId,
    trainingDetails: {
      trainingPostDetails: selectedPost,
      // _id:selectedPost?.postedById
    }
  }
  const applyHandler = async () => {

    await disptach(trainerAppliedTraining(selectedPost?._id, trainingDetails))
    // toast.success('Applied')
    if (trainer?.success) {
      toast.success(trainer.message);
    }
    else {
      toast.error(trainer.message)
    }
    setTrigger(false)

  }

  return trigger ? (
    <>
      <div className="TrainerApplyPopup h-screen flex justify-center items-center ">
        <div className=" w-[60%] m-auto h-[95vh] bg-white rounded-[20px]">
          <div
            className=" mr-[10px] mt-[10px] h-[40px] "
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

          <div className="w-[97%] flex m-[10px] h-[83vh] gap-2 ">
            <div className="w-[40%] h-auto border pt-[5px] pl-[10px] flex flex-col gap-[9px] rounded-tl-md rounded-bl-md overflow-y-scroll Scroll  ">
              <div>
                <p className="text-[#33333] text-[16px] font-[500] ">
                  Company Name
                </p>
                <p className="text-[#2676c2] text-[14px] ">
                  {selectedPost?.postedByCompanyName}
                </p>
              </div>
              <div>
                <p className="text-[#33333] text-[16px] font-[500] ">
                  Training Name
                </p>
                <p className="text-[#2676c2] text-[14px] ">
                  {selectedPost?.trainingName}
                </p>

              </div>
              <div>
                <p className="text-[#33333] text-[16px] font-[500]">
                  Training Topics & Subjects
                </p>
                <div className="">
                  {
                    selectedPost?.topics?.map((topic) => <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[95%] text-[#535353] text-[14px]">
                      {topic}
                    </p>)
                  }

                </div>
              </div>
              <div>
                <p className="text-[#33333] text-[16px] font-[500]">
                  Type Of Training
                </p>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[95%] text-[#535353] text-[14px]">
                  {selectedPost?.typeOfTraining}
                </p>
              </div>
              <div>
                <p className="text-[#33333] text-[16px] font-[500]">
                  Duration Of Training
                </p>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[95%] text-[#535353] text-[14px]">
                  {selectedPost?.durationCount} <span className=" capitalize">{selectedPost?.durationType}<span className={`${selectedPost?.durationType > 1 ? 'hidden' : ''}`}>'s</span></span>

                </p>
              </div>

              <div className="flex gap-[30px] ">
                <div>
                  <p className="text-[#33333] text-[16px] font-[500]">
                    Start Date
                  </p>
                  <p className=" text-[#535353] text-[14px]">
                    {selectedPost?.startDate}
                  </p>
                </div>
                <div>
                  <p className="text-[#33333] text-[16px] font-[500]">
                    End Date
                  </p>
                  <p className=" text-[#535353] text-[14px]">
                    {selectedPost?.endDate}
                  </p>
                </div>
              </div>


            </div>
            <div className="w-[60%] h-auto border pt-[5px] pl-[10px] flex flex-col gap-[9px] rounded-tr-md rounded-br-md overflow-y-scroll Scroll ">
              <div>
                <p className="text-[16px] font-[500]">
                  Budget
                </p>
                <p className="text-[#2676c2]" >
                  <span>{selectedPost?.selectedCountry === 'IND' ? '₹' : '$'}</span> {selectedPost?.minBudget} - <span>{selectedPost?.selectedCountry === 'IND' ? '₹' : '$'}</span> {selectedPost?.maxBudget}
                </p>
              </div>
              <div>
                <p className="text-[16px] font-[500]">
                  Mode of Training
                </p>
                <p>
                  {selectedPost?.modeOfTraining}
                </p>
                {
                  selectedPost?.modeOfTraining === 'Offline' ?
                    <div>
                      <p>
                        Location
                      </p>
                      <p>
                        {selectedPost?.location}
                      </p>
                    </div>
                    :
                    null
                }

              </div>
              <div>
                <p className="text-[16px] font-[500]">
                  Description
                </p>
                <div className="bg-[#F8F8F8] w-full h-[100px] border rounded-md overflow-y-scroll Scroll">
                  <p className="text-[#888888] text-[12px] p-[5px] text-justify">
                    {selectedPost?.description}
                  </p>
                </div>
              </div>

              <div className={`${selectedPost?.tocFile?.tocFileName ? "" : "hidden"}`}>
                <p>
                  TOC File
                </p>
                <div className="flex gap-2  items-center">
                  <p className="text-[#535353] text-[13px] ">
                    Test file Name
                  </p>
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
              <div className="flex justify-end">
                <button
                  onClick={applyHandler}
                  className="w-[180px] h-[38px] rounded-[8px] outline-none border-none text-[#ffff] bg-[#2676c2]" >
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